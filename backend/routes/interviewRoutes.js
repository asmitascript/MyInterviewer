import express from "express";
import {
  startInterview,
  submitAnswer,
  getFeedback,
} from "../controllers/interviewController.js";
import { authenticate, authorised } from "../middlewares/authMiddleware.js";

import { validate, validateParams } from "../middlewares/validationMiddleware.js";
import { sessionIdSchema } from "../validations/interviewValidation.js";

import {
    startInterviewSchema,
    submitAnswerSchema
} from "../validations/interviewValidation.js";

const router = express.Router();


// Start Interview
router.post("/start", 
  authenticate, 
  validate(startInterviewSchema),
  startInterview,
);

// Submit Answer
router.post("/:sessionId/answer", 
  authenticate,  
  validateParams(sessionIdSchema),
  authorised,
  validate(submitAnswerSchema),
  submitAnswer
);

// Terminate the interview


// Get Feedback
// Redirect after an interview complete
router.get("/:sessionId/feedback", 
  authenticate,
  validateParams(sessionIdSchema),
  authorised,
  getFeedback);

export default router;