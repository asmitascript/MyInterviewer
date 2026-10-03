import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isNewUser = dashboardData?.totalInterviews === 0;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/dashboard`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setDashboardData(data.dashboard);
        } else {
          setError(data.message || "Unable to load dashboard.");
        }
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);

        if (error.name === "TypeError") {
          setError("Unable to connect to the server. Please try again.");
        } else {
          setError(error.message || "Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>Unable to load dashboard</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isNewUser) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h3>
            <small>WELCOME BACK</small>, {dashboardData?.firstName}
          </h3>

          <p>
            You haven't completed any interviews yet. Complete your first
            interview to see your performance statistics.
          </p>
        </div>
      </div>
    );
  }

  const performance = dashboardData?.performance?.slice(-10) || [];

  const maxScore = 10;

  // Latest completed interview
  const latestInterview = dashboardData?.latestInterview || null;

  // Interview counts by type
  const interviewTypes = dashboardData?.interviewTypes || {};

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h3>
            <small>WELCOME BACK</small>, {dashboardData?.firstName}
          </h3>

          <p>
            Track your interview performance and keep improving.
          </p>
        </div>
      </div>


      {/* Statistics */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <p>Total Interviews</p>
          <h2>{dashboardData?.totalInterviews}</h2>
          <span>Completed interviews</span>
        </div>

        <div className="stat-card">
          <p>Average Score</p>
          <strong>{dashboardData?.averageScore}</strong>
          <small className="out-of">/10</small>
          <br />
          <span>Across all interviews</span>
        </div>

        <div className="stat-card">
          <p>Best Score</p>
          <strong>{dashboardData?.bestScore}</strong>
          <small className="out-of">/10</small>
          <br />
          <span>Your highest score</span>
        </div>

        <div className="stat-card">
          <p>Latest Score</p>
          <strong>{dashboardData?.latestScore}</strong>
          <small className="out-of">/10</small>
          <br />
          <span>Most recent interview</span>
        </div>

      </div>


      {/* Performance */}
      <div className="dashboard-section performance-section">

        <div className="section-header">
          <div>
            <h2>PERFORMANCE OVERVIEW</h2>
            <p>See how your interview scores are progressing.</p>
          </div>

          <span className="performance-period">
            Last {performance.length} Interviews
          </span>
        </div>


        {/* Score Trend */}
        <div className="score-trend">

          <div className="trend-y-axis">
            <span>10</span>
            <span>8</span>
            <span>6</span>
            <span>4</span>
            <span>2</span>
            <span>0</span>
          </div>

          <div className="trend-chart">

            <div className="trend-grid">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <svg
              className="trend-line"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {performance.length > 1 && (
                <polyline
                  points={performance
                    .map((item, index) => {
                      const x =
                        performance.length === 1
                          ? 50
                          : (index / (performance.length - 1)) * 100;

                      const y = 100 - (item.score / maxScore) * 100;

                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              )}
            </svg>

            <div className="trend-points">
              {performance.map((item, index) => {
                const left =
                  performance.length === 1
                    ? 50
                    : (index / (performance.length - 1)) * 100;

                const bottom = (item.score / maxScore) * 100;

                return (
                  <div
                    className="trend-point-wrapper"
                    key={index}
                    style={{
                      left: `${left}%`,
                      bottom: `${bottom}%`,
                    }}
                  >
                    <div className="trend-point">
                      <span>{item.score}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="trend-labels">
              {performance.map((_, index) => (
                <span key={index}>{index + 1}</span>
              ))}
            </div>

          </div>

        </div>

      </div>


      {/* Performance Breakdown */}
      {dashboardData?.categoryScores && (
        <div className="dashboard-section breakdown-section">

          <div className="section-header">
            <div>
              <h2>PERFORMANCE BREAKDOWN</h2>
              <p>Your average performance by category.</p>
            </div>
          </div>

          <div className="breakdown-list">

            {[
              ["Technical", dashboardData.categoryScores.technical],
              ["Communication", dashboardData.categoryScores.communication],
              ["Grammar", dashboardData.categoryScores.grammar],
            ].map(([label, score]) => (

              <div className="breakdown-item" key={label}>

                <div className="breakdown-info">
                  <span>{label}</span>
                  <strong>{score}/10</strong>
                </div>

                <div className="breakdown-bar">
                  <div
                    className="breakdown-progress"
                    style={{
                      width: `${(score / 10) * 100}%`,
                    }}
                  ></div>
                </div>

              </div>

            ))}

          </div>

        </div>
      )}


      {/* Latest Interview + Interview Activity */}
      <div className="dashboard-analytics">

        {/* Latest Interview */}
        {latestInterview && (
          <div className="dashboard-section latest-interview">

            <div className="section-header">
              <div>
                <h2>LATEST INTERVIEW</h2>
                <p>Your most recent completed interview.</p>
              </div>
            </div>

            <div className="latest-interview-content">

              <div className="latest-interview-info">

                <h3>{latestInterview.role}</h3>

                <div className="latest-interview-meta">
                  <span>{latestInterview.interviewType}</span>
                  <span>{latestInterview.difficulty}</span>
                  <span>{latestInterview.experience}</span>
                </div>

                {latestInterview.date && (
                  <p className="latest-interview-date">
                    {new Date(
                      latestInterview.date
                    ).toLocaleDateString()}
                  </p>
                )}

              </div>

              <div className="latest-score">
                <strong>{latestInterview.score}</strong>
                <span>/10</span>
              </div>

            </div>

          </div>
        )}


        {/* Interview Activity */}
        {Object.keys(interviewTypes).length > 0 && (
          <div className="dashboard-section type-section">

            <div className="section-header">
              <div>
                <h2>INTERVIEW ACTIVITY</h2>
                <p>Your interviews by type.</p>
              </div>
            </div>

            <div className="type-list">

              {Object.entries(interviewTypes).map(([type, count]) => {

                const maxCount = Math.max(
                  ...Object.values(interviewTypes)
                );

                return (
                  <div className="type-item" key={type}>

                    <div className="type-info">
                      <span>{type}</span>
                      <strong>{count}</strong>
                    </div>

                    <div className="type-bar">
                      <div
                        className="type-progress"
                        style={{
                          width:
                            maxCount > 0
                              ? `${(count / maxCount) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}

      </div>


      {/* Insights */}
      <div className="dashboard-bottom">

        {/* Strengths */}
        <div className="dashboard-section insight-card">

          <div className="section-header">

            <div className="section-icon success">
              ✓
            </div>

            <div>
              <h2>Strengths</h2>
              <p>What you performed well in</p>
            </div>

          </div>

          <div className="insight-list">

            {dashboardData?.strengths?.slice(0, 3).map(
              (strength, index) => (
                <div className="insight-item" key={index}>

                  <div className="insight-icon success">
                    ✓
                  </div>

                  <p>{strength}</p>

                </div>
              )
            )}

          </div>

        </div>


        {/* Areas for Improvement */}
        <div className="dashboard-section insight-card">

          <div className="section-header">

            <div className="section-icon warning">
              ↗
            </div>

            <div>
              <h2>Areas for Improvement</h2>
              <p>Where you can improve</p>
            </div>

          </div>

          <div className="insight-list">

            {dashboardData?.improvements?.slice(0, 3).map(
              (improvement, index) => (
                <div className="insight-item" key={index}>

                  <div className="insight-icon warning">
                    →
                  </div>

                  <p>{improvement}</p>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;