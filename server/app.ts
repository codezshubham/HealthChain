import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import patientRoutes from "./routes/patient.routes";
import doctorRoutes from "./routes/doctor.routes";
import recordRoutes from "./routes/record.routes";
import governmentRoutes from "./routes/government.routes";

const app = express();

// 🔧 Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 🩺 Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running successfully 🚀" });
});

// 🔗 Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/government", governmentRoutes);

// ❌ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;