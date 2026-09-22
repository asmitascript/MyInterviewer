import InterviewSession from "../models/interviewSession.js";

import generateQuestion from "../utils/generateQuestions.js";
import generateAnalysis from "../utils/analyseAnswers.js";
import generateFollowupQuestion from "../utils/generateFollowups.js";
import generateFinalFeedback from "../utils/generateFinalFeedback.js";



// START INTERVIEW
export const startInterview = async (req, res) => {
  try {
    const {
      role,
      experience,
      difficulty,
      interviewType,
    } = req.body;

    // Validation
    if (
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
      previousAnalysis: [],
    });

    // Create interview session
    const interview = await InterviewSession.create({
      userId: req.user._id,
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
    });

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



// SUBMIT ANSWER
export const submitAnswer = async (req, res) => {
  try {

    console.log("🔥 SUBMIT ANSWER ROUTE HIT");
    console.log("params:", req.params);
    console.log("body:", req.body);

    const { sessionId } = req.params;
    const { answer } = req.body;

    // Validation
    if (!sessionId || !answer) {
      return res.status(400).json({
        success: false,
        message: "Session ID and answer are required.",
      });
    }

    // Find interview session
    const interview = await InterviewSession.findOne({
      _id: sessionId,
      userId: req.user._id,
    });

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
    if (interview.currentQuestionNumber >= 3) {

      // Save latest answer and analysis before generating final feedback
      await interview.save();

      const finalFeedback = await generateFinalFeedback(interview);

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


    let nextQuestion;
    let nextQuestionType = "Normal";


    // Decide whether a follow-up is appropriate
    // Only allow one follow-up for the same topic.
    if (
      currentResponse.questionType === "Normal" &&
      analysis.needsFollowUp &&
      analysis.missingPoints &&
      analysis.missingPoints.length > 0
    ) {

      nextQuestion = await generateFollowupQuestion({
        question: currentResponse.question,
        answer: currentResponse.answer,
        missingPoints: analysis.missingPoints,
      });

      nextQuestionType = "Followup";

    } else {

      // Generate a new interview question
      nextQuestion = await generateQuestion({
        role: interview.role,
        experience: interview.experience,
        difficulty: interview.difficulty,
        interviewType: interview.interviewType,
        previousQuestions: interview.responses.map(
          (response) => response.question
        ),
        previousAnalysis: interview.responses
          .filter((response) => response.analysis)
          .map((response) => response.analysis),
      });
    }


    // Increment Question Number
    interview.currentQuestionNumber++;


    // Push next question to DB
    interview.responses.push({
      order: interview.currentQuestionNumber,
      question: nextQuestion.question,
      answer: "",
      questionType: nextQuestionType,
      analysis: null,
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



// GET INTERVIEW
export const getInterview = async (req, res) => {
  const { sessionId } = req.params;

  const interview = await InterviewSession.findById(sessionId);

  // Validations
  if (!interview) {
    return res.status(404).json({
      success: false,
      message: "Interview Not Found",
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
    })),

    overallFinalFeedback: {
      technicalScore: interview.finalFeedback.technicalScore,
      communicationScore: interview.finalFeedback.communicationScore,
      grammarScore: interview.finalFeedback.grammarScore,
      strengths: interview.finalFeedback.strengths,
      improvements: interview.finalFeedback.improvements,
      summary: interview.finalFeedback.summary,
      suggestedPreparation: interview.finalFeedback.suggestedPreparation,
    },
  });
};



// GET FINAL FEEDBACK
export const getFeedback = async (req, res) => {
  try {
    console.log("🔥 GET FEEDBACK ROUTE HIT");
    console.log("params:", req.params);

    const { sessionId } = req.params;

    // Validation
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required.",
      });
    }

    // Find interview session
    const interview = await InterviewSession.findOne({
      _id: sessionId,
      userId: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found.",
      });
    }

    // Check if interview is completed
    if (interview.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Interview is not completed yet.",
      });
    }

    // Check if final feedback exists
    if (!interview.finalFeedback) {
      return res.status(404).json({
        success: false,
        message: "Final feedback not found.",
      });
    }

    return res.status(200).json({
      success: true,
      sessionId: interview._id,
      finalFeedback: interview.finalFeedback,
    });

  } catch (err) {
    console.error("Get Feedback Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to get final feedback.",
      error: err.message,
    });
  }
};
