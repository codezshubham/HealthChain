import hardhat from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const { ethers } = hardhat;

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS as string;

  const contract = await ethers.getContractAt(
    "MedicalRecord",
    contractAddress
  );

  const patientId = "PAT123456";
  const ipfsHash = "QmDummyHash123";

  console.log("🌱 Seeding test medical record...");

  const tx = await contract.addRecord(patientId, ipfsHash);
  await tx.wait();

  console.log("✅ Record added to blockchain");
}

main().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exitCode = 1;
});