import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import interviewRoutes from "./routes/interviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Interview Routes
app.use("/api/interview", interviewRoutes);

// User Routes
app.use("/user", userRoutes);

// authentication
app.use("/auth", authRoutes);


// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MyAIInterviewer Backend is Running 🚀",
  });
});

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected with DB");
  } catch (err) {
    console.error("Failed to connect with DB", err);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err);
  }
};

startServer();