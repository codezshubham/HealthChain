import express from "express";
import { register, login } from "../controllers/auth.controller";

const router = express.Router();

// Register (Patient / Doctor)
router.post("/register", register);

// Login
router.post("/login", login);

export default router;