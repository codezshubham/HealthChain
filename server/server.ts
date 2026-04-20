import app from "./app";
import connectDB from "./config/db";
import { config } from "./config/env";

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Start Server
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();