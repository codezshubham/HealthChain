import { Request, Response } from "express";
import User from "../models/User";
import generatePatientId from "../utils/generatePatientId";
import jwt from "jsonwebtoken";
import { isValidPhone } from "../utils/validators";

// REGISTER (Patient / Doctor)
export const register = async (req: Request, res: Response) => {
  try {
    const { name, phone, role, age, gender, address } = req.body;

    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    let patientId: string | undefined = undefined;

    if (role === "PATIENT") {
      patientId = generatePatientId();
    }

    user = await User.create({
      name,
      phone,
      role,
      age,
      gender,
      address,
      patientId,
    } as any);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// LOGIN (OTP/Phone simplified)
export const login = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};