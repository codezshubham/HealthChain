"use client";

import { useState } from "react";
import { ethers } from "ethers";
import {
  User,
  Activity,
  FileText,
  Hospital,
  Upload,
} from "lucide-react";

const SEPOLIA_CHAIN_ID_DEC = 11155111;
const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";

const MEDICAL_RECORD_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_patientId", type: "string" },
      { internalType: "string", name: "_ipfsHash", type: "string" },
    ],
    name: "addRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function AddRecordForm() {
  const [form, setForm] = useState({
    patientId: "",
    disease: "",
    symptoms: "",
    prescription: "",
    hospitalName: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const connectWallet = async (): Promise<string | null> => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected. Please install MetaMask.");
        return null;
      }

      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (Number(network.chainId) !== SEPOLIA_CHAIN_ID_DEC) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }],
          });
        } catch (switchErr: any) {
          // 4902 = chain not added in wallet
          if (switchErr?.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: SEPOLIA_CHAIN_ID_HEX,
                  chainName: "Sepolia",
                  nativeCurrency: {
                    name: "SepoliaETH",
                    symbol: "SEP",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc.sepolia.org"],
                  blockExplorerUrls: ["https://sepolia.etherscan.io"],
                },
              ],
            });
          } else {
            throw switchErr;
          }
        }
      }

      const nextAddress = accounts?.[0] || null;
      setWalletAddress(nextAddress);
      return nextAddress;
    } catch (err: any) {
      // User rejection (MetaMask): 4001
      if (err?.code === 4001) {
        alert("Wallet connection was cancelled.");
        return null;
      }

      console.error(err);
      alert("Failed to connect to MetaMask.");
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
        alert(
          "Missing NEXT_PUBLIC_CONTRACT_ADDRESS. Configure it to your Sepolia deployed contract address."
        );
        return;
      }

      if (!window.ethereum) {
        alert("MetaMask not detected. Please install MetaMask.");
        return;
      }

      if (!walletAddress) {
        const addr = await connectWallet();
        if (!addr) return;
      }

      // Step 1: upload report to backend (Pinata/IPFS)
      const uploadForm = new FormData();
      if (file) uploadForm.append("report", file);

      const uploadRes = await fetch(
        "http://localhost:5000/api/records/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: uploadForm,
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploadData?.message || "Upload failed");
      }

      const ipfsHash = uploadData.ipfsHash as string;

      // Step 2: call contract via MetaMask on Sepolia
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        MEDICAL_RECORD_ABI,
        signer
      );

      const tx = await contract.addRecord(form.patientId, ipfsHash);
      const receipt = await tx.wait();

      // Step 3: finalize record in backend (MongoDB) with tx hash
      const finalizeRes = await fetch(
        "http://localhost:5000/api/records/finalize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            patientId: form.patientId,
            disease: form.disease,
            symptoms: form.symptoms
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
            prescription: form.prescription,
            hospitalName: form.hospitalName,
            ipfsHash,
            blockchainTxHash: receipt.hash,
          }),
        }
      );

      const finalizeData = await finalizeRes.json();
      if (!finalizeRes.ok) {
        const extraError =
          typeof finalizeData?.error === "string"
            ? `: ${finalizeData.error}`
            : "";
        throw new Error(
          (finalizeData?.message || "Finalize failed") + extraError
        );
      }
      alert("Record added successfully 🚀");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to add record"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Section: Patient Info */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">
          Patient Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Patient ID */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="patientId"
              placeholder="Patient ID"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Hospital */}
          <div className="relative">
            <Hospital className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="hospitalName"
              placeholder="Hospital Name"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Section: Medical Details */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">
          Medical Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Disease */}
          <div className="relative">
            <Activity className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="disease"
              placeholder="Disease"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Symptoms */}
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="symptoms"
              placeholder="Symptoms (comma separated)"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Prescription (Full Width) */}
        <div className="relative mt-4">
          <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <textarea
            name="prescription"
            placeholder="Prescription"
            onChange={handleChange}
            rows={3}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* File Upload */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">
          Upload Report
        </h3>

        <label className="flex items-center justify-center gap-2 border border-dashed border-white/20 rounded-xl p-4 cursor-pointer hover:bg-white/5 transition">
          <Upload className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm">
            {file ? file.name : "Click to upload report"}
          </span>

          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={walletAddress ? handleSubmit : connectWallet}
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-linear-to-r from-indigo-500 to-sky-500 text-white font-medium shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading
          ? "Submitting..."
          : walletAddress
            ? "Submit Record"
            : "Connect MetaMask"}
      </button>
    </div>
  );
}