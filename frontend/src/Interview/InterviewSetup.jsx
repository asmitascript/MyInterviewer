import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import "./InterviewSetup.css";

function InterviewSetup() {
  const navigate = useNavigate();
  const { setAnswer, setQuestion } = useContext(MyContext);

  // Store user inputs
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [interviewType, setInterviewType] = useState("Technical");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    if (!role.trim()) {
      setError("Please enter the role.");
      return;
    }

    if (!experience) {
      setError("Please select your experience level.");
      return;
    }
    try {
      if (loading) return;

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/interview/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            role,
            experience,
            difficulty,
            interviewType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to start interview");
      }
      
      setAnswer("");
      setQuestion(data.question);

      // Redirect to Interview page
      navigate(`/interview/${data.sessionId}`, {
        state: {
          question: data.question,
          questionNumber: data.questionNumber,
        },
      });    
    } catch (error) {
      console.error("Error starting interview:", error);

      if (error.name === "TypeError") {
        setError(
          "Something went wrong while processing your request. Please try again."
        );
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setError("");
              }}
            />
          </div>


          {/* Experience */}

          <div className="form-group">
            <label>Experience Level</label>

            <select
              value={experience}
              onChange={(e) => {
                setExperience(e.target.value);
                setError("");
              }}
            >
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

              <button
                type="button"
                className={difficulty === "easy" ? "selected" : ""}
                onClick={() => setDifficulty("easy")}
              >
                Easy
              </button>

              <button
                type="button"
                className={difficulty === "medium" ? "selected" : ""}
                onClick={() => setDifficulty("medium")}
              >
                Medium
              </button>

              <button
                type="button"
                className={difficulty === "hard" ? "selected" : ""}
                onClick={() => setDifficulty("hard")}
              >
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
                className={interviewType === "Technical" ? "selected" : ""}
                onClick={() => setInterviewType("Technical")}
              >
                Technical
              </button>

              <button
                type="button"
                className={interviewType === "HR" ? "selected" : ""}
                onClick={() => setInterviewType("HR")}
              >
                HR
              </button>

              <button
                type="button"
                className={interviewType === "Behavioral" ? "selected" : ""}
                onClick={() => setInterviewType("Behavioral")}
              >
                Behavioral
              </button>

            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button
            className="start-interview"
            onClick={handleStartInterview}
            disabled={loading}
          >
            {loading ? "Starting..." : "Start Interview"}
            {!loading && <span>→</span>}
          </button>

        </div>

      </div>
    </div>
  );
}

export default InterviewSetup;