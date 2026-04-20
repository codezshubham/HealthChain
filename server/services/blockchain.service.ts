import { ethers } from "ethers";
import abi from "./abi.json";
import { config } from "../config/env";

const provider = new ethers.JsonRpcProvider(config.rpcUrl);

const getContract = () => {
  if (!config.privateKey?.trim()) {
    throw new Error(
      "Missing PRIVATE_KEY. Configure it for server-signed transactions, or use the MetaMask flow (client-signed) which doesn't require a server private key."
    );
  }

  const wallet = new ethers.Wallet(config.privateKey.trim(), provider);

  return new ethers.Contract(
    config.contractAddress,
    abi,
    wallet
  );
};

// ADD RECORD TO BLOCKCHAIN
export const addRecordToBlockchain = async ({
  patientId,
  ipfsHash,
}: {
  patientId: string;
  ipfsHash: string;
}): Promise<string> => {
  try {
    const contract = getContract();
    const tx = await contract.addRecord(patientId, ipfsHash);

    const receipt = await tx.wait();

    return receipt.hash; // transaction hash
  } catch (error) {
    console.error("Blockchain Error:", error);
    throw new Error("Blockchain transaction failed");
  }
};