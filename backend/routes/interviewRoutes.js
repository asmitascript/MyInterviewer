import express from "express";
import {
  startInterview,
  submitAnswer,
} from "../controllers/interviewController.js";

const router = express.Router();

// Start Interview
router.post("/start", startInterview);

// Submit Answer
router.post("/answer", submitAnswer);

// Terminate the interview


export default router;