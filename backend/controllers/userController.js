import InterviewSession from "../models/interviewSession.js";


export const allInterviews = async (req, res) => {
  try {

    console.log("===== ALL FEEDBACK =====");
    console.log("User:", req.user._id);
    console.log("Status query: Completed");

    const interviews = await InterviewSession.find({
      userId: req.user._id,
      status: "Completed",
    });

    console.log("Count:", interviews.length);
    console.log(
      "IDs:",
      interviews.map((i) => i._id.toString())
    );

    // const interviews = await InterviewSession.find({
    //   userId,
    //   status: "Completed",
    // }).sort({ createdAt: -1});

    // console.log("INTERVIEWS FOUND:", interviews.length);
    // console.log("INTERVIEWS:", interviews);

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