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
          "http://localhost:8080/user/dashboard",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setDashboardData(data.dashboard);
        } else {
          setError(data.message);
        }

      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
        setError("Unable to load dashboard data.");

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
            You haven't completed any interviews yet.
            Complete your first interview to see your performance statistics.
          </p>
        </div>
      </div>
    );
  }

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
          <strong>{dashboardData?.averageScore}</strong><small className="out-of">/10</small>
          <br />
          <span>Across all interviews</span>
        </div>

        <div className="stat-card">
          <p>Best Score</p>
          <strong>{dashboardData?.bestScore}</strong><small className="out-of">/10</small>
          <br />
          <span>Your highest score</span>
        </div>

        <div className="stat-card">
          <p>Latest Score</p>
          <strong>{dashboardData?.latestScore}</strong><small className="out-of">/10</small>
          <br />
          <span>Most recent interview</span>
        </div>

      </div>


      {/* Performance Overview */}
      <div className="dashboard-section performance-section">

        <div className="section-header">
          <div>
            <h2>PERFORMANCE OVERVIEW</h2>

            <p>
              See how your interview scores are progressing.
            </p>
          </div>

          <span className="performance-period">
            Last 10 Interviews
          </span>
        </div>


        {/* Static Chart */}
        <div className="performance-chart">

          <div className="chart-y-axis">
            <span>10</span>
            <span>8</span>
            <span>6</span>
            <span>4</span>
            <span>2</span>
            <span>0</span>
          </div>

          <div className="chart-area">

            <div className="chart-grid">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="chart-bars">

              {dashboardData?.performance?.slice(-10).map((item, index) => (
                <div className="chart-bar-wrapper" key={index}>
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(item.score / 10) * 100}%`,
                    }}
                  ></div>

                  <span>{index + 1}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
      {/* Bottom Sections */}
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
            {dashboardData?.strengths?.slice(0, 3).map((strength, index) => (
              <div className="insight-item" key={index}>
                <div className="insight-icon success">
                  ✓
                </div>

                <p>{strength}</p>
              </div>
            ))}
          </div>

        </div>


        {/* Areas to Improve */}
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
            {dashboardData?.improvements?.slice(0, 3).map((improvement, index) => (
              <div className="insight-item" key={index}>
                <div className="insight-icon warning">
                  →
                </div>

                <p>{improvement}</p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;