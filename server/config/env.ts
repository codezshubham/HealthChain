import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const requiredEnvVars = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "PINATA_API_KEY",
  "PINATA_SECRET_API_KEY",
  "RPC_URL",
  "CONTRACT_ADDRESS",
  "GOOGLE_API_KEY",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,

  pinataApiKey: process.env.PINATA_API_KEY as string,
  pinataSecret: process.env.PINATA_SECRET_API_KEY as string,

  rpcUrl: (process.env.RPC_URL || "").trim() as string,
  // Optional: only required if you use server-signed blockchain transactions.
  privateKey: (process.env.PRIVATE_KEY || "").trim() as string,
  contractAddress: (process.env.CONTRACT_ADDRESS || "").trim() as string,

  googleApiKey: process.env.GOOGLE_API_KEY as string,
  googleLlmModel: process.env.GOOGLE_LLM_MODEL || "gemini-2.5-flash",
};