export interface BlockchainRecordInput {
  patientId: string;
  ipfsHash: string;
}

export interface BlockchainRecord {
  patientId: string;
  ipfsHash: string;
  timestamp: number;
  doctor: string;
}