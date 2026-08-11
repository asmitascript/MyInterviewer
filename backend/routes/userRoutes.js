import express, { response } from "express";
import InterviewSession from "../models/interviewSession.js";
import { allFeedback } from "../controllers/userController.js";

const router = express.Router();

// feedback Route
router.get("/:userId/allfeedback", allFeedback);

export default router;