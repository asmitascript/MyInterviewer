import "./interviewHistory.css";

function InterviewHistory() {
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
          <span>12</span>
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


        {/* Interview Row */}
        <div className="history-row">

          <div className="history-interview">
            <div className="history-icon">
              🎤
            </div>

            <div>
              <h3>Software Engineer</h3>
              <p>Technical Interview</p>
            </div>
          </div>


          <span className="history-type">
            Technical
          </span>


          <span className="difficulty medium">
            Medium
          </span>


          <span className="history-score">
            82%
          </span>


          <span className="status completed">
            Completed
          </span>


          <span className="history-date">
            Aug 10, 2026
          </span>


          <button className="view-button">
            View
          </button>

        </div>


        {/* Second Row */}
        <div className="history-row">

          <div className="history-interview">
            <div className="history-icon">
              🎤
            </div>

            <div>
              <h3>Frontend Developer</h3>
              <p>Technical Interview</p>
            </div>
          </div>


          <span className="history-type">
            Technical
          </span>


          <span className="difficulty easy">
            Easy
          </span>


          <span className="history-score">
            76%
          </span>


          <span className="status completed">
            Completed
          </span>


          <span className="history-date">
            Aug 07, 2026
          </span>


          <button className="view-button">
            View
          </button>

        </div>


        {/* Third Row */}
        <div className="history-row">

          <div className="history-interview">
            <div className="history-icon">
              🎤
            </div>

            <div>
              <h3>Backend Developer</h3>
              <p>Technical Interview</p>
            </div>
          </div>


          <span className="history-type">
            Technical
          </span>


          <span className="difficulty hard">
            Hard
          </span>


          <span className="history-score">
            68%
          </span>


          <span className="status completed">
            Completed
          </span>


          <span className="history-date">
            Jul 30, 2026
          </span>


          <button className="view-button">
            View
          </button>

        </div>


      </div>

    </div>
  );
}

export default InterviewHistory;
