import axios from "axios";
import FormData from "form-data";
import { IPFS_CONFIG } from "./config";

export const uploadFileToIPFS = async (
  file: Express.Multer.File
): Promise<string> => {
  try {
    const formData = new FormData();

    formData.append("file", file.buffer, {
      filename: file.originalname,
    });

    const response = await axios.post(
      `${IPFS_CONFIG.PINATA_BASE_URL}/pinning/pinFileToIPFS`,
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: IPFS_CONFIG.PINATA_API_KEY,
          pinata_secret_api_key:
            IPFS_CONFIG.PINATA_SECRET_API_KEY,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("IPFS Upload Error:", error);
    throw new Error("Failed to upload file to IPFS");
  }
};