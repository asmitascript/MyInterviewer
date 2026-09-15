import express from "express";
import InterviewSession from "../models/interviewSession.js";
import {
  startInterview,
  submitAnswer,
  getFeedback
} from "../controllers/interviewController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get Interview 
// To have a details of each interview
router.get("/:sessionId", authenticate, async(req, res) =>{
  const { sessionId } = req.params;
  const interview = await InterviewSession.findById(sessionId);
  
  // validations
  if(!interview){
    return res.status(404).json({
      success: false,
      message: "Interview Not Found"
    });
  }

  res.send({
    role: interview.role,
    experience: interview.experience,
    difficulty: interview.difficulty,
    interviewType: interview.interviewType,
    status: interview.status,
    totalQuestions: interview.currentQuestionNumber,
    responses: interview.responses.map((response) => ({
      order: response.order,
      question: response.question,
      answer: response.answer,
      // overallScore: response.overallScore,
    })),
    overallFinalFeedback: {
    // overallScore: interview.finalFeedback.overallScore,
    technicalScore: interview.finalFeedback.technicalScore,
    communicationScore: interview.finalFeedback.communicationScore,
    grammarScore: interview.finalFeedback.grammarScore,
    strengths: interview.finalFeedback.strengths,
    improvements: interview.finalFeedback.improvements,
    summary: interview.finalFeedback.summary,
    suggestedPreparation: interview.finalFeedback.suggestedPreparation,
  },
  });
})

// Setup Interview

// router.get("/setup");
// Start Interview
router.post("/start", authenticate, startInterview);

// Submit Answer
router.post("/:sessionId/answer", authenticate, submitAnswer);

// Terminate the interview


// Get Feedback
// Redirect after an interview complete
router.get("/:sessionId/feedback", authenticate, getFeedback);

export default router;