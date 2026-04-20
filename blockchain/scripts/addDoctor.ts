import hardhat from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const { ethers } = hardhat;

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS as string;

  if (!contractAddress) {
    throw new Error("Contract address missing in .env");
  }

  const doctorAddress = "0xDOCTOR_WALLET_ADDRESS"; // replace

  const contract = await ethers.getContractAt(
    "MedicalRecord",
    contractAddress
  );

  console.log("👨‍⚕️ Adding doctor:", doctorAddress);

  const tx = await contract.addDoctor(doctorAddress);
  await tx.wait();

  console.log("✅ Doctor added successfully");
}

main().catch((error) => {
  console.error("❌ Error adding doctor:", error);
  process.exitCode = 1;
});