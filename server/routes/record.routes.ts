import express from "express";
import multer from "multer";
import {
  addMedicalRecord,
  finalizeMedicalRecord,
  uploadRecordReport,
} from "../controllers/record.controller";

import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = express.Router();

// File upload config (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add medical record (Doctor only)
router.post(
  "/add",
  protect,
  requireRole("DOCTOR"),
  upload.single("report"),
  addMedicalRecord
);

// MetaMask flow: upload report file to IPFS, return ipfsHash
router.post(
  "/upload",
  protect,
  requireRole("DOCTOR"),
  upload.single("report"),
  uploadRecordReport
);

// MetaMask flow: client submits blockchainTxHash + ipfsHash to finalize
router.post(
  "/finalize",
  protect,
  requireRole("DOCTOR"),
  finalizeMedicalRecord
);

export default router;