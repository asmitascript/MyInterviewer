import "./Feedback.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Feedback() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Stores which question is currently expanded
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/interview/${sessionId}/feedback`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log("FEEDBACK RESPONSE:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to get feedback");
        }

        setFeedbackData(data);
      } catch (err) {
        console.error("Get Feedback Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [sessionId]);

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  if (error) {
    return <p>Failed to load feedback: {error}</p>;
  }

  if (!feedbackData || !feedbackData.finalFeedback) {
    return <p>No feedback available.</p>;
  }

  const { finalFeedback, responses = [], interview } = feedbackData;

  return (
    <div className="feedback-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="feedback-header">

        <div>
          <span className="feedback-eyebrow">
            INTERVIEW ASSESSMENT
          </span>

          <h1>Interview Feedback</h1>

          <p>
            Here's a detailed breakdown of your interview performance.
          </p>
        </div>

        <div className="feedback-status">
          <span className="status-dot"></span>
          Completed
        </div>

      </div>


      {/* =========================
          OVERALL SCORE
      ========================= */}

      <div className="overall-card">

        <div className="overall-content">

          <span className="card-label">
            OVERALL PERFORMANCE
          </span>

          <div className="overall-score">
            {finalFeedback.overallScore}
            <span>/10</span>
          </div>

          <p>
            Your overall performance across the interview.
          </p>

        </div>


        {/* Dynamic Score Ring */}

        <div
          className="score-ring"
          style={{
            "--score": `${finalFeedback.overallScore * 10}%`,
          }}
        >
          <div className="score-ring-inner">
            <strong>{finalFeedback.overallScore}</strong>
            <span>Score</span>
          </div>
        </div>

      </div>


      {/* =========================
          SCORE BREAKDOWN
      ========================= */}

      <section className="feedback-section">

        <div className="section-heading">

          <div>
            <span className="feedback-eyebrow">
              PERFORMANCE
            </span>

            <h2>Score Breakdown</h2>
          </div>

        </div>


        <div className="score-grid">

          {/* Technical */}

          <div className="score-card">

            <div className="score-card-top">
              <span>Technical</span>
              <span className="score-icon">⌘</span>
            </div>

            <strong>
              {finalFeedback.technicalScore}
              <small>/10</small>
            </strong>

            <div className="score-bar">
              <div
                style={{
                  width: `${finalFeedback.technicalScore * 10}%`,
                }}
              ></div>
            </div>

          </div>


          {/* Communication */}

          <div className="score-card">

            <div className="score-card-top">
              <span>Communication</span>
              <span className="score-icon">◈</span>
            </div>

            <strong>
              {finalFeedback.communicationScore}
              <small>/10</small>
            </strong>

            <div className="score-bar">
              <div
                style={{
                  width: `${finalFeedback.communicationScore * 10}%`,
                }}
              ></div>
            </div>

          </div>


          {/* Grammar */}

          <div className="score-card">

            <div className="score-card-top">
              <span>Grammar</span>
              <span className="score-icon">A</span>
            </div>

            <strong>
              {finalFeedback.grammarScore}
              <small>/10</small>
            </strong>

            <div className="score-bar">
              <div
                style={{
                  width: `${finalFeedback.grammarScore * 10}%`,
                }}
              ></div>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          STRENGTHS + IMPROVEMENTS
      ========================= */}

      <div className="feedback-columns">

        {/* Strengths */}

        <section className="feedback-box strengths-box">

          <div className="box-header">

            <div className="box-icon">
              ✓
            </div>

            <div>
              <h2>Strengths</h2>

              <p>
                What you performed well in
              </p>
            </div>

          </div>


          <ul>
            {finalFeedback.strengths?.map((item, index) => (
              <li key={index}>
                <span>✓</span>
                {item}
              </li>
            ))}
          </ul>

        </section>


        {/* Improvements */}

        <section className="feedback-box improvement-box">

          <div className="box-header">

            <div className="box-icon">
              ↗
            </div>

            <div>
              <h2>Areas for Improvement</h2>

              <p>
                Where you can improve
              </p>
            </div>

          </div>


          <ul>
            {finalFeedback.improvements?.map((item, index) => (
              <li key={index}>
                <span>→</span>
                {item}
              </li>
            ))}
          </ul>

        </section>

      </div>


      {/* =========================
          AI SUMMARY
      ========================= */}

      <section className="summary-card">

        <div className="section-heading">

          <div>
            <span className="feedback-eyebrow">
              AI ANALYSIS
            </span>

            <h2>Interview Summary</h2>
          </div>

        </div>

        <p>
          {finalFeedback.summary}
        </p>

      </section>


      {/* =========================
          QUESTION-WISE REVIEW
      ========================= */}

      <section className="feedback-section question-review-section">

        <div className="section-heading">

          <div>
            <span className="feedback-eyebrow">
              DETAILED REVIEW
            </span>

            <h2>Question-wise Analysis</h2>

            <p>
              Review your answers and the AI analysis for each question.
            </p>
          </div>

        </div>


        <div className="question-review-list">

          {responses.map((response, index) => {

            const analysis = response.analysis || {};
            const isExpanded = expandedQuestions[index];

            return (
              <div
                className={`question-review-card ${
                  isExpanded ? "expanded" : ""
                }`}
                key={index}
              >

                {/* Question Header */}

                <button
                  type="button"
                  className="question-review-header"
                  onClick={() => toggleQuestion(index)}
                >

                  <div className="question-review-title">

                    <span className="question-number">
                      {String(response.order).padStart(2, "0")}
                    </span>

                    <div>
                      <span className="question-label">
                        QUESTION {String(response.order).padStart(2, "0")}
                      </span>

                      <h3>
                        {response.question}
                      </h3>
                    </div>

                  </div>


                  <span
                    className={`question-arrow ${
                      isExpanded ? "rotated" : ""
                    }`}
                  >
                    ↓
                  </span>

                </button>


                {/* Expanded Details */}

                {isExpanded && (

                  <div className="question-review-details">

                    {/* User Answer */}

                    <div className="answer-block">

                      <span className="detail-label">
                        YOUR ANSWER
                      </span>

                      <p className="user-answer">
                        {response.answer || "No answer provided."}
                      </p>

                    </div>


                    {/* Answer Scores */}

                    <div className="answer-analysis">

                      <span className="detail-label">
                        ANSWER ANALYSIS
                      </span>


                      <div className="answer-score-grid">

                        <div className="answer-score-item">
                          <span>Overall</span>
                          <strong>
                            {analysis.overallScore ?? 0}
                            <small>/10</small>
                          </strong>
                        </div>

                        <div className="answer-score-item">
                          <span>Technical</span>
                          <strong>
                            {analysis.technicalScore ?? 0}
                            <small>/10</small>
                          </strong>
                        </div>

                        <div className="answer-score-item">
                          <span>Communication</span>
                          <strong>
                            {analysis.communicationScore ?? 0}
                            <small>/10</small>
                          </strong>
                        </div>

                        <div className="answer-score-item">
                          <span>Grammar</span>
                          <strong>
                            {analysis.grammarScore ?? 0}
                            <small>/10</small>
                          </strong>
                        </div>

                        <div className="answer-score-item">
                          <span>Clarity</span>
                          <strong>
                            {analysis.clarityScore ?? 0}
                            <small>/10</small>
                          </strong>
                        </div>

                        <div className="answer-score-item">
                          <span>Relevance</span>
                          <strong className="relevance-value">
                            {analysis.relevance || "N/A"}
                          </strong>
                        </div>

                      </div>

                    </div>


                    {/* Strengths */}

                    {analysis.strengths?.length > 0 && (

                      <div className="answer-detail-block">

                        <h4>Strengths</h4>

                        <ul>
                          {analysis.strengths.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <span>✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>

                      </div>

                    )}


                    {/* Weaknesses */}

                    {analysis.weaknesses?.length > 0 && (

                      <div className="answer-detail-block">

                        <h4>Areas to Improve</h4>

                        <ul>
                          {analysis.weaknesses.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <span>→</span>
                              {item}
                            </li>
                          ))}
                        </ul>

                      </div>

                    )}


                    {/* Missing Points */}

                    {analysis.missingPoints?.length > 0 && (

                      <div className="answer-detail-block">

                        <h4>Missing Points</h4>

                        <ul>
                          {analysis.missingPoints.map(
                            (item, itemIndex) => (
                              <li key={itemIndex}>
                                <span>•</span>
                                {item}
                              </li>
                            )
                          )}
                        </ul>

                      </div>

                    )}


                    {/* Analysis Summary */}

                    {analysis.analysisSummary && (

                      <div className="answer-summary">

                        <span className="detail-label">
                          AI ANALYSIS
                        </span>

                        <p>
                          {analysis.analysisSummary}
                        </p>

                      </div>

                    )}


                    {/* Follow-up */}

                    {analysis.needsFollowUp &&
                      analysis.followUpTopic && (

                        <div className="follow-up-block">

                          <span className="detail-label">
                            FOLLOW-UP TOPIC
                          </span>

                          <p>
                            {analysis.followUpTopic}
                          </p>

                        </div>

                      )}

                  </div>

                )}

              </div>
            );
          })}

        </div>

      </section>


      {/* =========================
          SUGGESTED PREPARATION
      ========================= */}

      <section className="preparation-card">

        <div className="preparation-header">

          <div className="preparation-icon">
            ✦
          </div>

          <div>

            <span className="feedback-eyebrow">
              NEXT STEPS
            </span>

            <h2>Suggested Preparation</h2>

            <p>
              Focus on these areas before your next interview.
            </p>

          </div>

        </div>


        <ul>
          {finalFeedback.suggestedPreparation?.map(
            (item, index) => (
              <li key={index}>

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                {item}

              </li>
            )
          )}
        </ul>

      </section>


      {/* =========================
          BACK TO HISTORY
      ========================= */}

      <button
        className="back-history-btn"
        onClick={() => navigate("/user/interviews")}
      >
        ← Back to Interview History
      </button>

    </div>
  );
}

export default Feedback;