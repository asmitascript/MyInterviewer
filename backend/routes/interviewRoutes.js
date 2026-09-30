import express from "express";
import {
  startInterview,
  submitAnswer,
  getFeedback,
  getInterview,
  pauseInterview,
  resumeInterview
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

router.get(
  "/:sessionId",
  authenticate,
  validateParams(sessionIdSchema),
  authorised,
  getInterview
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
  getFeedback
);


// Pause Interview
router.patch("/:sessionId/pause",
  authenticate,
  validateParams(sessionIdSchema),
  authorised,
  pauseInterview
);

// Resume Interview
router.patch("/:sessionId/resume",
  authenticate,
  validateParams(sessionIdSchema),
  authorised,
  resumeInterview
);

export default router;