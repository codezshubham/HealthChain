import dotenv from "dotenv";

dotenv.config();

export const IPFS_CONFIG = {
  PINATA_API_KEY: process.env.PINATA_API_KEY as string,
  PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY as string,

  PINATA_BASE_URL: "https://api.pinata.cloud",
  GATEWAY_URL: "https://gateway.pinata.cloud/ipfs/",
};