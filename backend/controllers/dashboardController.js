import InterviewSession from "../models/interviewSession.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("Dashboard User ID:", userId);

    const interviews = await InterviewSession.find({
      userId,
      status: "Completed",
    }).sort({ createdAt: 1 });

    console.log("Dashboard Interviews:", interviews.length);

    if (interviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No completed interviews found",
      });
    }

    // -------------------------
    // Statistics
    // -------------------------

    const scores = interviews.map(
      (interview) => interview.finalFeedback?.overallScore ?? 0
    );

    const totalInterviews = interviews.length;

    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / totalInterviews;

    const bestScore = Math.max(...scores);

    const latestScore = scores[scores.length - 1];

    // -------------------------
    // Performance Chart
    // -------------------------

    const performance = interviews.map((interview, index) => ({
      interview: index + 1,
      score: interview.finalFeedback?.overallScore ?? 0,
      date: interview.createdAt,
    }));

    // -------------------------
    // Strengths
    // -------------------------

    const strengths = interviews.flatMap(
      (interview) => interview.finalFeedback?.strengths || []
    );

    // -------------------------
    // Improvements
    // -------------------------

    const improvements = interviews.flatMap(
      (interview) => interview.finalFeedback?.improvements || []
    );

    res.json({
      success: true,

      dashboard: {
        totalInterviews,

        averageScore: Number(averageScore.toFixed(1)),

        bestScore,

        latestScore,

        performance,

        strengths,

        improvements,
      },
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};