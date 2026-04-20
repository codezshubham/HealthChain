import hardhat from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const { ethers } = hardhat;

async function main() {
  console.log("🚀 Deploying MedicalRecord contract...");

  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const bal = await deployer.provider.getBalance(deployerAddress);
  console.log("🧾 Deployer:", deployerAddress);
  console.log("💰 Deployer balance:", ethers.formatEther(bal));

  const MedicalRecord = await ethers.getContractFactory("MedicalRecord");

  const contract = await MedicalRecord.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("✅ Contract deployed at:", address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});