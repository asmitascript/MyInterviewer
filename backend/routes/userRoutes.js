import express, { response } from "express";
import InterviewSession from "../models/interviewSession.js";
import { allFeedback } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// feedback Route
router.get("/:userId/allfeedback", authenticate, allFeedback);

export default router;