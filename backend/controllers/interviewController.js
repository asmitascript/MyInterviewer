import InterviewSession from "../models/interviewSession.js";

import generateQuestion from "../utils/generateQuestions.js";
import generateAnalysis from "../utils/analyseAnswers.js";
import generateFinalFeedback from "../utils/generateFinalFeedback.js"



// START INTERVIEW
export const startInterview = async (req, res) => {
  try {
    const {
      userId,
      role,
      experience,
      difficulty,
      interviewType,
    } = req.body;

    // Validation
    if (
      !userId ||
      !role ||
      !experience ||
      !difficulty ||
      !interviewType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Generate first interview question
    const question = await generateQuestion({
      role,
      experience,
      difficulty,
      interviewType,
      previousQuestions: [],
    });

    // Create interview session
    const interview = await InterviewSession.create({
      userId,
      role,
      experience,
      difficulty,
      interviewType,

      responses: [
        {
          order: 1,
          question: question.question,
          answer: "",
          questionType: "Normal",
          analysis: null,
        },
      ],
    });

    console.log({
      sessionId: interview._id,
      questionNumber: 1,
      question: question.question,
    })

    return res.status(201).json({
      success: true,
      message: "Interview started successfully.",
      sessionId: interview._id,
      questionNumber: 1,
      question: question.question,
    });
  } catch (err) {
    console.error("Start Interview Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to start interview.",
    });
  }
};

// Submit Answer
export const submitAnswer = async (req, res) => {
  try {
    const { sessionId, answer } = req.body;

    // Validation
    if (!sessionId || !answer) {
      return res.status(400).json({
        success: false,
        message: "Session ID and answer are required.",
      });
    }

    // Find interview session
    const interview = await InterviewSession.findById(sessionId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found.",
      });
    }

    // Find current unanswered question
    const currentResponse = interview.responses.find(
      (response) => response.answer === ""
    );

    if (!currentResponse) {
      return res.status(400).json({
        success: false,
        message: "No pending question found.",
      });
    }

    // Save user's answer
    currentResponse.answer = answer;

    // Generate AI analysis
    const analysis = await generateAnalysis({
      question: currentResponse.question,
      answer,
    });

    // Save analysis
    currentResponse.analysis = analysis;

    // Check Limit 
    // interview.maxQuestions
    if(interview.currentQuestionNumber >= 3){
      const finalFeedback = await generateFinalFeedback({
        role: interview.role,
        experience: interview.experience,
        difficulty: interview.difficulty,
        interviewType: interview.interviewType,
        responses: interview.responses
      });

      interview.finalFeedback = finalFeedback;
      interview.status = "Completed";
      interview.endedAt = new Date();

      await interview.save();

      return res.status(200).json({
        success: true,
        interviewCompleted: true,
        finalFeedback,
      });

    }

    // Generate Next Question
    const nextQuestion = await generateQuestion({
      role: interview.role,
      experience: interview.experience,
      difficulty: interview.difficulty,
      interviewType: interview.interviewType,
      previousQuestions: interview.responses.map(r => r.question),
    });
    
    // Increament Question Number 
    interview.currentQuestionNumber++;

    // Push to DB
    interview.responses.push({
      order: interview.currentQuestionNumber,
      question: nextQuestion.question,
      answer: "",
      questionType: "Normal",
      analysis: null
    });

    // Save interview session
    await interview.save();

    return res.status(200).json({
      success: true,
      interviewCompleted: false,
      questionNumber: interview.currentQuestionNumber,
      question: nextQuestion.question,
    });    

  } catch (err) {
    console.error("Submit Answer Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to submit answer.",
      error: err.message,
    });
  }
};


// Get Interview


// Get Final Feedback
