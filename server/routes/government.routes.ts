import express from "express";
import { getAnalytics } from "../controllers/government.controller";

import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = express.Router();

// Get anonymized analytics
router.get(
  "/analytics",
  protect,
  requireRole("GOVERNMENT"),
  getAnalytics
);

export default router;