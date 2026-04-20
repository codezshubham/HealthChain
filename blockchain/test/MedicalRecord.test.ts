import { expect } from "chai";
import { ethers } from "hardhat";

describe("MedicalRecord Contract", function () {
  let contract: any;
  let owner: any;
  let doctor: any;
  let nonDoctor: any;

  const patientId = "PAT123456";
  const ipfsHash = "QmTestHash123";

  beforeEach(async () => {
    // Get accounts
    [owner, doctor, nonDoctor] = await ethers.getSigners();

    // Deploy contract
    const MedicalRecord = await ethers.getContractFactory("MedicalRecord");
    contract = await MedicalRecord.deploy();
    await contract.waitForDeployment();
  });

  // ✅ Deployment test
  it("Should set the correct owner", async () => {
    expect(await contract.owner()).to.equal(owner.address);
  });

  // 👨‍⚕️ Add doctor
  it("Owner should add doctor successfully", async () => {
    await contract.addDoctor(doctor.address);

    const isDoctor = await contract.doctors(doctor.address);
    expect(isDoctor).to.equal(true);
  });

  // ❌ Non-owner cannot add doctor
  it("Should fail if non-owner adds doctor", async () => {
    await expect(
      contract.connect(nonDoctor).addDoctor(doctor.address)
    ).to.be.revertedWith("Not owner");
  });

  // 🧾 Doctor adds record
  it("Doctor should add medical record", async () => {
    await contract.addDoctor(doctor.address);

    await contract
      .connect(doctor)
      .addRecord(patientId, ipfsHash);

    const count = await contract.getRecordCount(patientId);
    expect(count).to.equal(1);
  });

  // ❌ Non-doctor cannot add record
  it("Should fail if non-doctor adds record", async () => {
    await expect(
      contract.addRecord(patientId, ipfsHash)
    ).to.be.revertedWith("Not authorized doctor");
  });

  // 📄 Fetch record
  it("Should fetch correct record data", async () => {
    await contract.addDoctor(doctor.address);

    await contract
      .connect(doctor)
      .addRecord(patientId, ipfsHash);

    const record = await contract.getRecord(patientId, 0);

    expect(record[0]).to.equal(patientId);
    expect(record[1]).to.equal(ipfsHash);
    expect(record[3]).to.equal(doctor.address);
  });

  // 📊 Multiple records
  it("Should handle multiple records", async () => {
    await contract.addDoctor(doctor.address);

    await contract.connect(doctor).addRecord(patientId, "Hash1");
    await contract.connect(doctor).addRecord(patientId, "Hash2");

    const count = await contract.getRecordCount(patientId);
    expect(count).to.equal(2);
  });

  // ❌ Invalid index
  it("Should revert on invalid record index", async () => {
    await contract.addDoctor(doctor.address);

    await contract
      .connect(doctor)
      .addRecord(patientId, ipfsHash);

    await expect(
      contract.getRecord(patientId, 5)
    ).to.be.revertedWith("Invalid index");
  });
});