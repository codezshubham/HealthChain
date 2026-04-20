import axios from "axios";
import FormData from "form-data";

const PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

const uploadToIPFS = async (file: Express.Multer.File): Promise<string> => {
  try {
    const formData = new FormData();

    formData.append("file", file.buffer, {
      filename: file.originalname,
    });

    const res = await axios.post(PINATA_URL, formData, {
      maxBodyLength: Infinity,
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY as string,
        pinata_secret_api_key:
          process.env.PINATA_SECRET_API_KEY as string,
      },
    });

    return res.data.IpfsHash;
  } catch (error) {
    console.error("IPFS Upload Error:", error);
    throw new Error("Failed to upload to IPFS");
  }
};

export default uploadToIPFS;