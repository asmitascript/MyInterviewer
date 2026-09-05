import InterviewSession from "../models/interviewSession.js";
export const allFeedback = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("USER ID FROM URL:", userId);

    const interviews = await InterviewSession.find({
      userId: userId,
      status: "Completed",
    });

    console.log("INTERVIEWS FOUND:", interviews.length);
    console.log("INTERVIEWS:", interviews);

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
      overallFinalFeedback: interview.finalFeedback?.overallScore ?? 0,
      date: interview.createdAt,
    }));

    res.json({
      success: true,
      count: feedback.length,
      interviews: feedback,
    });

  } catch (error) {
    console.error("ALL FEEDBACK ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch interview feedback",
    });
  }
};