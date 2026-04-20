import express from "express";
import {
  getPatientProfile,
  getPatientHistory,
  getPatientDiseaseGuidance,
} from "../controllers/patient.controller";

import { protect } from "../middleware/auth.middleware";
import {
  requireRole,
  isPatientOwner,
} from "../middleware/role.middleware";

const router = express.Router();

// Get patient profile
router.get(
  "/:patientId",
  protect,
  requireRole("PATIENT"),
  getPatientProfile
);

// Get patient history
router.get(
  "/:patientId/history",
  protect,
  requireRole("PATIENT"),
  getPatientHistory
);

// Chatbot: disease guidance for patient
router.post(
  "/:patientId/chatbot/guidance",
  protect,
  requireRole("PATIENT"),
  isPatientOwner(),
  getPatientDiseaseGuidance
);

export default router;