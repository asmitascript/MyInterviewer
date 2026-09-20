import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import interviewRoutes from "./routes/interviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
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

  app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on port ${PORT}`);
  });