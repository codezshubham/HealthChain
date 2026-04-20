import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import MedicalRecord from "../models/MedicalRecord";
import { isValidPhone } from "../utils/validators";

interface AuthRequest extends Request {
  user?: any;
}

// SEARCH PATIENT BY ID
export const searchPatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.query;

    const patient = await User.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};

// REQUEST PATIENT ACCESS VIA OTP (FOR DOCTOR)
export const requestPatientAccess = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return res.status(400).json({ message: "patientId is required" });
    }

    const patient = (await User.findOne({ patientId })) as IUser | null;
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (!patient.phone) {
      return res
        .status(400)
        .json({ message: "Patient does not have a phone number" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    patient.accessOtpCode = otp;
    patient.accessOtpExpiresAt = expiresAt;
    patient.accessOtpDoctorId = req.user?._id;
    await patient.save();

    // TODO: Integrate real SMS provider (e.g., Twilio).
    // For now, log OTP on server for development/testing.
    console.log(
      `Patient access OTP for ${patient.phone} (patientId=${patientId}): ${otp}`
    );

    return res.json({
      message:
        "OTP has been sent to the patient's registered phone number.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to request access", error });
  }
};

// VERIFY PATIENT ACCESS OTP (FOR DOCTOR) AND RETURN BASIC PROFILE
export const verifyPatientAccessOtp = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { patientId, otp } = req.body;

    if (!patientId || !otp) {
      return res
        .status(400)
        .json({ message: "patientId and otp are required" });
    }

    const patient = (await User.findOne({ patientId })) as IUser | null;
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (!patient.accessOtpCode || !patient.accessOtpExpiresAt) {
      return res
        .status(400)
        .json({ message: "No active OTP request for this patient" });
    }

    // Check expiration
    if (patient.accessOtpExpiresAt.getTime() < Date.now()) {
      // Clear expired OTP
      patient.accessOtpCode = undefined;
      patient.accessOtpExpiresAt = undefined;
      patient.accessOtpDoctorId = undefined;
      await patient.save();

      return res.status(400).json({ message: "OTP has expired. Please retry" });
    }

    // Optional: ensure same doctor who requested is verifying
    if (
      patient.accessOtpDoctorId &&
      req.user &&
      patient.accessOtpDoctorId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "This OTP was not issued for the current doctor",
      });
    }

    if (patient.accessOtpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid – clear it and return basic profile
    patient.accessOtpCode = undefined;
    patient.accessOtpExpiresAt = undefined;
    patient.accessOtpDoctorId = undefined;
    await patient.save();

    return res.json({ patient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to verify OTP", error });
  }
};

// GET FULL PATIENT PROFILE (FOR DOCTOR)
export const getPatientProfileForDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const { patientId } = req.params;

    const patient = await User.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient profile", error });
  }
};

// GET PATIENT MEDICAL HISTORY (FOR DOCTOR)
export const getPatientHistoryForDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const { patientId } = req.params;

    const records = await MedicalRecord.find({ patientId }).sort({
      createdAt: -1,
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient history", error });
  }
};