import express from "express";
import { getFeedback } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/feedback", getFeedback);

export default router;