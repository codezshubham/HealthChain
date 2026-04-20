import express from "express";
import {
  searchPatient,
  getPatientProfileForDoctor,
  getPatientHistoryForDoctor,
  requestPatientAccess,
  verifyPatientAccessOtp,
} from "../controllers/doctor.controller";

import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = express.Router();

// Search patient by ID
router.get(
  "/search",
  protect,
  requireRole("DOCTOR"),
  searchPatient
);

// Request OTP-based access to a patient's data
router.post(
  "/request-access",
  protect,
  requireRole("DOCTOR"),
  requestPatientAccess
);

// Verify OTP and get consented access to basic patient info
router.post(
  "/verify-access",
  protect,
  requireRole("DOCTOR"),
  verifyPatientAccessOtp
);

// Get full patient profile by ID
router.get(
  "/patient/:patientId",
  protect,
  requireRole("DOCTOR"),
  getPatientProfileForDoctor
);

// Get patient medical history by ID
router.get(
  "/patient/:patientId/history",
  protect,
  requireRole("DOCTOR"),
  getPatientHistoryForDoctor
);

export default router;