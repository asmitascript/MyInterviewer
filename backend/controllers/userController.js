import InterviewSession from "../models/interviewSession.js";

export const allFeedback = async (req, res) =>{
   try {
    const { userId } = req.params;

    const interviews = await InterviewSession.find({
      userId,
      status: "Completed",
    });

    if (interviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No completed interviews found",
      });
    }

    const feedback = interviews.map((interview) => ({
      sessionId: interview._id,

      role: interview.role,
      experience: interview.experience,
      difficulty: interview.difficulty,
      interviewType: interview.interviewType,
      status: interview.status,

      totalQuestions: interview.currentQuestionNumber,

      responses: (interview.responses || []).map((response) => ({
        order: response.order,
        question: response.question,
        answer: response.answer,
        overallScore: response.analysis?.score,
      })),

      overallFinalFeedback: interview.finalFeedback || {},
    }));

    res.json({
      success: true,
      count: feedback.length,
      interviews: feedback,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch interview feedback",
    });
  }
};