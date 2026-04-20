export interface MedicalRecord {
  _id: string;

  patientId: string;
  doctorId: string;

  disease: string;
  symptoms: string[];
  prescription: string;

  hospitalName: string;
  hospitalAddress?: string;

  ipfsHash: string;
  blockchainTxHash: string;

  date: string;
  createdAt: string;
  updatedAt: string;
}