import mongoose, { Schema, Document } from "mongoose";

export interface IMedicalRecord extends Document {
  patientId: string;
  doctorId: mongoose.Types.ObjectId;

  disease: string;
  symptoms: string[];
  prescription: string;

  hospitalName: string;
  hospitalAddress?: string;

  ipfsHash: string;
  blockchainTxHash: string;

  date: Date;
  createdAt: Date;
}

const MedicalRecordSchema: Schema = new Schema(
  {
    patientId: {
      type: String,
      required: true,
      index: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    disease: {
      type: String,
      required: true,
      index: true,
    },

    symptoms: [
      {
        type: String,
      },
    ],

    prescription: {
      type: String,
      required: true,
    },

    hospitalName: {
      type: String,
      required: true,
      index: true,
    },

    hospitalAddress: {
      type: String,
    },

    // 🔗 IPFS hash (actual report storage)
    ipfsHash: {
      type: String,
      required: true,
    },

    // ⛓️ Blockchain transaction reference
    blockchainTxHash: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMedicalRecord>(
  "MedicalRecord",
  MedicalRecordSchema
);