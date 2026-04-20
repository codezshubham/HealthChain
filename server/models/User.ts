import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  role: "PATIENT" | "DOCTOR" | "GOVERNMENT";
  age?: number;
  gender?: string;
  address?: string;
  patientId?: string;
  walletAddress?: string;
  accessOtpCode?: string;
  accessOtpExpiresAt?: Date;
  accessOtpDoctorId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["PATIENT", "DOCTOR", "GOVERNMENT"],
      required: true,
    },

    // Patient fields
    age: Number,
    gender: String,
    address: String,

    // Only for PATIENT
    patientId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Blockchain wallet (for doctors mainly)
    walletAddress: {
      type: String,
    },

    // Temporary doctor access OTP (for patient data consent)
    accessOtpCode: {
      type: String,
    },
    accessOtpExpiresAt: {
      type: Date,
    },
    accessOtpDoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);