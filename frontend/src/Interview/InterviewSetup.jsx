import "./InterviewSetup.css";

function InterviewSetup() {
  return (
    <div className="setup-page">

      <div className="setup-card">

        <div className="setup-header">
          <span className="setup-badge">
            AI INTERVIEW
          </span>

          <h1>
            Let's set up your
            <span> interview</span>
          </h1>

          <p>
            Tell us a little about yourself so we can
            personalize your interview experience.
          </p>
        </div>


        <div className="setup-form">

          {/* Role */}

          <div className="form-group">
            <label>What role are you applying for?</label>

            <input
              type="text"
              placeholder="e.g. Frontend Developer"
            />
          </div>


          {/* Experience */}

          <div className="form-group">
            <label>Experience Level</label>

            <select>
              <option value="">Select experience level</option>
              <option value="fresher">Fresher</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>


          {/* Difficulty */}

          <div className="form-group">
            <label>Interview Difficulty</label>

            <div className="option-grid">

              <button type="button">
                Easy
              </button>

              <button
                type="button"
                className="selected"
              >
                Medium
              </button>

              <button type="button">
                Hard
              </button>

            </div>
          </div>


          {/* Interview Type */}

          <div className="form-group">
            <label>Interview Type</label>

            <div className="option-grid">

              <button
                type="button"
                className="selected"
              >
                Technical
              </button>

              <button type="button">
                HR
              </button>

              <button type="button">
                Behavioral
              </button>

            </div>
          </div>


          <button className="start-interview">
            Start Interview
            <span>→</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default InterviewSetup;