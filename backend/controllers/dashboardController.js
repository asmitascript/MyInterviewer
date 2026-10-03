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

    // No completed interviews
    if (interviews.length === 0) {
      return res.status(200).json({
        success: true,
        dashboard: {
          firstName: req.user.firstName,
          lastName: req.user.lastName,

          totalInterviews: 0,
          averageScore: null,
          bestScore: null,
          latestScore: null,

          performance: [],
          strengths: [],
          improvements: [],

          interviewTypes: {},
          latestInterview: null,
        },
      });
    }

    // Scores
    const scores = interviews.map(
      (interview) => interview.finalFeedback?.overallScore ?? 0
    );

    const totalInterviews = interviews.length;

    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / totalInterviews;

    const bestScore = Math.max(...scores);

    const latestScore = scores[scores.length - 1];

    // Performance history
    const performance = interviews.map((interview, index) => ({
      interview: index + 1,
      score: interview.finalFeedback?.overallScore ?? 0,
      date: interview.createdAt,
    }));

    // Strengths
    const strengths = interviews.flatMap(
      (interview) => interview.finalFeedback?.strengths || []
    );

    // Areas for improvement
    const improvements = interviews.flatMap(
      (interview) => interview.finalFeedback?.improvements || []
    );

    // Interview type distribution
    const interviewTypes = {};

    interviews.forEach((interview) => {
      const type = interview.interviewType;

      if (type) {
        interviewTypes[type] = (interviewTypes[type] || 0) + 1;
      }
    });

    // Latest interview
    const latestInterview = interviews[interviews.length - 1];

    const latestInterviewData = {
      role: latestInterview.role,
      interviewType: latestInterview.interviewType,
      difficulty: latestInterview.difficulty,
      experience: latestInterview.experience,
      score: latestInterview.finalFeedback?.overallScore ?? 0,
      date: latestInterview.createdAt,
    };

    // Send dashboard data
    res.status(200).json({
      success: true,
      dashboard: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,

        totalInterviews,
        averageScore: Number(averageScore.toFixed(1)),
        bestScore,
        latestScore,

        performance,
        strengths,
        improvements,

        interviewTypes,
        latestInterview: latestInterviewData,
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