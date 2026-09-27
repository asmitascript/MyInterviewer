import { useEffect, useState } from "react";
import "./InterviewDemoCard.css";

function InterviewDemoCard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="demo-card">
      <div className="demo-header">
        <span className="demo-dot"></span>
        <span><span style={{ color: '#a59ee0' }}>My</span>Interviewer</span>
        <span className="demo-status">● LIVE</span>
      </div>

      <div className="demo-content">

        <div className="demo-label">AI INTERVIEWER</div>

        <div className="question-box">
          <span className="material-symbols-outlined">INTERVIEWER</span>
          <p>
            What are the standard HTTP methods (GET, POST, PUT, DELETE), and what do their status codes mean (e.g., 200, 400, 401, 404, 500)?
          </p>
        </div>

        <div className="demo-label candidate-label">
          USER
        </div>

        <div className="answer-box">
          <span className="material-symbols-outlined">CANDIDATE</span>
          <p>
            HTTP methods tell the server what action to take—like GET to fetch data, POST to create it, PUT to update it, and DELETE to...
          </p>
        </div>

        {step === 2 && (
          <div className="analyzing">
            <span className="material-symbols-outlined"></span>
            Analyzing response...
          </div>
        )}

        {step === 3 && (
          <div className="analysis-box">
            <div className="analysis-title">
              <span className="material-symbols-outlined"></span>
              AI ANALYSIS
            </div>

            <div className="scores">
              <div>
                <span>Technical</span>
                <strong>8.5</strong><small>/10</small>
              </div>

              <div>
                <span>Clarity</span>
                <strong>8.2</strong><small>/10</small>
              </div>

              <div>
                <span>Communication</span>
                <strong>8.7</strong><small>/10</small>
              </div>
            </div>

            <div className="analysis-success">
              ✓ Strong practical explanation
            </div>
          </div>
        )}

      </div>

      <div className="demo-footer">
        <span>AI-POWERED INTERVIEW</span>
        <span>REAL-TIME ANALYSIS</span>
      </div>
    </div>
  );
}

export default InterviewDemoCard;