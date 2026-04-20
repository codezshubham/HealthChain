import { Request, Response } from "express";
import { ethers } from "ethers";
import MedicalRecord from "../models/MedicalRecord";
import uploadToIPFS from "../services/ipfs.service";
import { addRecordToBlockchain } from "../services/blockchain.service";
import { config } from "../config/env";
import abi from "../services/abi.json";

interface AuthRequest extends Request {
  user?: any;
}

const verifyAddRecordTx = async ({
  txHash,
  patientId,
  ipfsHash,
}: {
  txHash: string;
  patientId: string;
  ipfsHash: string;
}) => {
  const provider = new ethers.JsonRpcProvider(config.rpcUrl);

  const [tx, receipt] = await Promise.all([
    provider.getTransaction(txHash),
    provider.getTransactionReceipt(txHash),
  ]);

  if (!tx || !receipt) {
    throw new Error("Transaction not found or not confirmed yet");
  }

  if (receipt.status !== 1) {
    throw new Error("Blockchain transaction failed");
  }

  const expectedTo = config.contractAddress.toLowerCase();
  const actualTo = (tx.to || "").toLowerCase();
  if (!actualTo || actualTo !== expectedTo) {
    throw new Error(
      `Transaction was not sent to the expected contract (expected ${expectedTo}, got ${actualTo || "<empty>"})`
    );
  }

  const iface = new ethers.Interface(abi as any);
  const decoded = iface.decodeFunctionData("addRecord", tx.data);
  const decodedPatientId = decoded?.[0] as string;
  const decodedIpfsHash = decoded?.[1] as string;

  if (decodedPatientId !== patientId || decodedIpfsHash !== ipfsHash) {
    throw new Error("Transaction data does not match provided record payload");
  }

  return {
    from: (tx.from || "").toLowerCase(),
    blockNumber: receipt.blockNumber,
  };
};

// 1) Upload report to IPFS and return its hash (used by MetaMask client flow)
export const uploadRecordReport = async (req: AuthRequest, res: Response) => {
  try {
    const file = req.file;
    let ipfsHash = "";

    if (file) {
      ipfsHash = await uploadToIPFS(file);
    }

    res.json({ ipfsHash });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload report", error });
  }
};

// 2) Finalize record: verify tx on Sepolia and store in MongoDB
export const finalizeMedicalRecord = async (req: AuthRequest, res: Response) => {
  try {
    const {
      patientId,
      disease,
      symptoms,
      prescription,
      hospitalName,
      ipfsHash,
      blockchainTxHash,
    } = req.body;

    const doctorId = req.user?._id;

    if (!patientId || !disease || !prescription || !hospitalName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!ipfsHash || !blockchainTxHash) {
      return res
        .status(400)
        .json({ message: "Missing ipfsHash or blockchainTxHash" });
    }

    // Verify on-chain tx matches this record (Sepolia via RPC_URL)
    await verifyAddRecordTx({
      txHash: blockchainTxHash,
      patientId,
      ipfsHash,
    });

    const normalizedSymptoms: string[] = Array.isArray(symptoms)
      ? symptoms
      : typeof symptoms === "string" && symptoms.length
        ? JSON.parse(symptoms)
        : [];

    const record = await MedicalRecord.create({
      patientId,
      disease,
      symptoms: normalizedSymptoms,
      prescription,
      hospitalName,
      doctorId,
      ipfsHash,
      blockchainTxHash,
      date: new Date(),
    });

    res.json({ message: "Record saved", record });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to finalize record", error: error?.message || error });
  }
};

// ADD MEDICAL RECORD
export const addMedicalRecord = async (req: AuthRequest, res: Response) => {
  try {
    const {
      patientId,
      disease,
      symptoms,
      prescription,
      hospitalName,
    } = req.body;

    // doctorId comes from authenticated user (protect middleware)
    const doctorId = req.user?._id;

    // 1. Upload report file to IPFS
    const file = req.file; // using multer
    let ipfsHash = "";

    if (file) {
      ipfsHash = await uploadToIPFS(file);
    }

    // 2. Store hash on blockchain
    const txHash = await addRecordToBlockchain({
      patientId,
      ipfsHash,
    });

    // 3. Save in MongoDB
    const record = await MedicalRecord.create({
      patientId,
      disease,
      symptoms,
      prescription,
      hospitalName,
      doctorId,
      ipfsHash,
      blockchainTxHash: txHash,
      date: new Date(),
    });

    res.json({ message: "Record added", record });
  } catch (error) {
    res.status(500).json({ message: "Failed to add record", error });
  }
};