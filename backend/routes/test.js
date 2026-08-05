import express from "express";
import InterviewSession from "../models/interviewSession.js";

const router = express.Router();

router.post("/test", async (req, res) => {
    try {
        const interview = new InterviewSession({
            status: "Terminated",
            currentQuestionIndex: 4,
        });

        const response = await interview.save();

        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save" });
    }
});

export default router;