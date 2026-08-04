import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/interview", interviewRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MyAIInterviewer Backend is Running 🚀",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});