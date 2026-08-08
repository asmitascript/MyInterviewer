import "./Interview.css";

function Interview() {
  return (
    <>
      <div className="interview-header">
        <h2>Interview Role</h2>

        <div className="timer-exit">
            <div className="timer">
                3:00
            </div>

            <button className="exit">
                Exit
            </button>
        </div>
      </div>


      <div className="sidebar">

        <div className="AI">
        </div>

        <p className="interviewer">
        </p>

        <p className="description">
          Your AI Interviewer
        </p>

        <div className="tips">

          <p className="head">
            Tips
          </p>

          <p className="tip">
            Be Specific with Example
          </p>

          <p className="tip">
            Keep answers under 2 min
          </p>

        </div>

      </div>

      <div className="main-content">
        <div className="question">
            Tell me about yourself!
        </div>
        <div className="answer">
            <textarea name="" id=""></textarea>
        </div>
        <div className="submit-area">
            <button className="submit">
                Submit Answer
            </button>
        </div>
      </div>
    </>
  );
}

export default Interview;