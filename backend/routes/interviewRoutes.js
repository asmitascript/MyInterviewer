import express from "express";
import { getFeedback } from "../controllers/interviewController.js";

const router = express.Router();

// start interview
router.route("/interview")

// submit answer
router.post("/answer");

// terminate the interview
router.post("/end");

export default router;