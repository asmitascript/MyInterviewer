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


  if (isNewUser || error) {
    return (
      <div className="dashboard-page">

        <div className="dashboard-header">

          <div>
            <h1>
              Welcome back, {dashboardData?.firstName} 👋
            </h1>

            <p>
              You haven't completed any interviews yet.
              Complete your first interview to see your performance statistics.
            </p>
          </div>

          <button className="start-interview-btn">
            + Start New Interview
          </button>

        </div>

      </div>
    );
  }

   return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-header">

        <div>
          <h1>Welcome back, {dashboardData?.firstName} 👋</h1>

          <p>
            Track your interview performance and keep improving.
          </p>
        </div>

        <button className="start-interview-btn">
          + Start New Interview
        </button>

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
          <h2>{dashboardData?.averageScore}/10</h2>
          <span>Across all interviews</span>
        </div>

        <div className="stat-card">
          <p>Best Score</p>
          <h2>{dashboardData?.bestScore}/10</h2>
          <span>Your highest score</span>
        </div>

        <div className="stat-card">
          <p>Latest Score</p>
          <h2>{dashboardData?.latestScore}/10</h2>
          <span>Most recent interview</span>
        </div>

      </div>


      {/* Performance Overview */}
      <div className="dashboard-section performance-section">

        <div className="section-header">
          <div>
            <h2>Performance Overview</h2>

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
            <div>
              <h2>Your Strengths</h2>

              <p>
                Areas where you are performing well.
              </p>
            </div>
          </div>

          <div className="insight-list">

          {dashboardData?.strengths?.slice(0, 3).map((strength, index) => (
            <div className="insight-item" key={index}>
              <div className="insight-icon success">
                ✓
              </div>

              <div>
                <h3>{strength}</h3>
                <p>
                  Identified as a strength from your interview performance.
                </p>
              </div>
            </div>
          ))}

        </div>

        </div>


        {/* Areas to Improve */}
        <div className="dashboard-section insight-card">

          <div className="section-header">
            <div>
              <h2>Areas to Improve</h2>

              <p>
                Focus on these areas for better performance.
              </p>
            </div>
          </div>

          <div className="insight-list">

        {dashboardData?.improvements?.slice(0, 3).map((improvement, index) => (
          <div className="insight-item" key={index}>
            <div className="insight-icon warning">
              !
            </div>

            <div>
              <h3>{improvement}</h3>
              <p>
                Focus on improving this area in your upcoming interviews.
              </p>
            </div>
          </div>
        ))}

      </div>

          {/* <div className="insight-list">

            <div className="insight-item">
              <div className="insight-icon warning">
                !
              </div>

              <div>
                <h3>Communication</h3>
                <p>
                  Try to explain your answers more clearly.
                </p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-icon warning">
                !
              </div>

              <div>
                <h3>Answer Structure</h3>
                <p>
                  Organize your responses before answering.
                </p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-icon warning">
                !
              </div>

              <div>
                <h3>Filler Words</h3>
                <p>
                  Reduce unnecessary words such as "um" and "uh".
                </p>
              </div>
            </div>

          </div> */}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;