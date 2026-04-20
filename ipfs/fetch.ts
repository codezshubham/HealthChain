import axios from "axios";
import { IPFS_CONFIG } from "./config";

// Get file URL (recommended way)
export const getIPFSUrl = (hash: string): string => {
  return `${IPFS_CONFIG.GATEWAY_URL}${hash}`;
};

// Fetch file data (optional)
export const fetchFromIPFS = async (hash: string) => {
  try {
    const url = getIPFSUrl(hash);

    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    return response.data;
  } catch (error) {
    console.error("IPFS Fetch Error:", error);
    throw new Error("Failed to fetch file from IPFS");
  }
};