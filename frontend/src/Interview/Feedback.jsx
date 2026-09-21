import "./Feedback.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Feedback() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [finalFeedback, setFinalFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        setFinalFeedback(data.finalFeedback);
      } catch (err) {
        console.error("Get Feedback Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [sessionId]);

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  if (error) {
    return <p>Failed to load feedback: {error}</p>;
  }

  if (!finalFeedback) {
    return <p>No feedback available.</p>;
  }

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
        onClick={() => navigate("/user/interview-history")}
      >
        ← Back to Interview History
      </button>

    </div>
  );
}

export default Feedback;