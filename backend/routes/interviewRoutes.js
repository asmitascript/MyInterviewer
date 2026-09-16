import express from "express";
import InterviewSession from "../models/interviewSession.js";
import {
  startInterview,
  submitAnswer,
  getFeedback,
  getInterview
} from "../controllers/interviewController.js";
import { authenticate, authorised } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get Interview 
// To have a details of each interview
router.get("/:sessionId", authenticate, authorised, getInterview);

// Setup Interview

// router.get("/setup");
// Start Interview
router.post("/start", authenticate, startInterview);

// Submit Answer
router.post("/:sessionId/answer", authenticate, authorised, submitAnswer);

// Terminate the interview


// Get Feedback
// Redirect after an interview complete
router.get("/:sessionId/feedback", authenticate, authorised, getFeedback);

export default router;