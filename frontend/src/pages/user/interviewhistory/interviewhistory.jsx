import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./interviewHistory.css";

function InterviewHistory() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterviewHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/allfeedback",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch interview history"
          );
        }

        setInterviews(data.interviews);
      } catch (error) {
        console.error("Interview history error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewHistory();
  }, []);

  // // Loading state
  // if (loading) {
  //   return (
  //     <div className="history-page">
  //       <h2>Loading interview history...</h2>
  //     </div>
  //   );
  // }

  // Error state
  if (error) {
    return (
      <div className="history-page">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="history-page">

      {/* Header */}
      <div className="history-header">

        <div>
          <h1>Interview History</h1>

          <p>
            View and review your previous interview sessions.
          </p>
        </div>

        <div className="history-total">
          <span>{interviews.length}</span>

          <p>Total Interviews</p>
        </div>

      </div>


      {/* Filters */}
      <div className="history-toolbar">

        <div className="history-search">
          🔍

          <input
            type="text"
            placeholder="Search interviews..."
          />
        </div>

        <select className="history-select">
          <option>All Interviews</option>
          <option>Technical</option>
          <option>Behavioral</option>
        </select>

        <select className="history-select">
          <option>All Status</option>
          <option>Completed</option>
          <option>Ongoing</option>
        </select>

      </div>


      {/* Interview History */}
      <div className="history-card">

        {/* Table Header */}
        <div className="history-table-header">

          <span>Interview</span>
          <span>Type</span>
          <span>Difficulty</span>
          <span>Score</span>
          <span>Status</span>
          <span>Date</span>
          <span></span>

        </div>


        {/* Dynamic Rows */}
        {interviews.map((interview) => (

          <div
            className="history-row"
            key={interview.sessionId}
          >

            {/* Interview */}
            <div className="history-interview">

              <div className="history-icon">
                🎤
              </div>

              <div>

                <h3>
                  {interview.role}
                </h3>

                <p>
                  {interview.experience}
                </p>

              </div>

            </div>


            {/* Type */}
            <span className="history-type">
              {interview.interviewType}
            </span>


            {/* Difficulty */}
            <span
              className={`difficulty ${interview.difficulty}`}
            >
              {interview.difficulty}
            </span>


            {/* Score */}
            <span className="history-score">
              {interview.overallFinalFeedback}/10
            </span>


            {/* Status */}
            <span
              className={`status ${interview.status.toLowerCase()}`}
            >
              {interview.status}
            </span>


            {/* Date */}
            <span className="history-date">

              {new Date(
                interview.date
              ).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
              )}

            </span>


            {/* View */}
            <button
              className="view-button"
              onClick={() =>
                navigate(
                  `/user/interview-history/${interview.sessionId}`
                )
              }
            >
              View
            </button>

          </div>

        ))}


        {/* Empty State */}
        {interviews.length === 0 && (
          <div className="history-empty">
            <h3>No interviews found</h3>

            <p>
              Complete an interview to see it here.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default InterviewHistory;