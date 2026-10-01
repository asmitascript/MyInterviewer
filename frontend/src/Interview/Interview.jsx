import "./Interview.css";

import { MyContext } from "../context/MyContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Interview() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const {
    question,
    setQuestion,
    answer,
    setAnswer,
  } = useContext(MyContext);

  // Restore current unanswered question from session 
  useEffect(() => {
    if (interview?.responses?.length > 0) {
      const currentResponse = interview.responses.find(
        (response) => response.answer === ""
      );

      if (currentResponse) {
        setQuestion(currentResponse.question);
      }
    }
  }, [interview, setQuestion]);


  // Fetch interview details
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/interview/${sessionId}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch interview");
        }

        console.log("Interview data:", data);
        setInterview(data);

      } catch (err) {
        console.error("Failed to fetch interview:", err);
      }
    };

    fetchInterview();
  }, [sessionId]);

  // Submit answer
  const handleAnswer = async () => {
    if (!answer.trim()) {
      setError("Please enter an answer before submitting.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/interview/${sessionId}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            answer: answer,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit answer");
      }


      // Interview completed
      if (data.interviewCompleted) {
        navigate(`/feedback/${sessionId}`);
        return;
      }

      // Clear previous error
      setError("");

      // Backend generated next question
      setQuestion(data.question);

      // Clear textarea
      setAnswer("");

    } catch (err) {
      console.error("Failed to submit answer:", err);
      setError("Unable to submit your answer. Please try again or pause the interview.");
    }finally {
      setLoading(false);
    }
  };

  const handlePause = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/interview/${sessionId}/pause`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to pause interview");
      }

      navigate("/user/interviews");

    } catch (err) {
      console.log("Failed to pause the interview:", err.message);
    }
  };

  return (
    
    <>
      <div className="interview-header">
        <div className="role">
          {interview?.role}
        </div>

        <div className="timer-exit">
          <div className="timer">
            3:00
          </div>

          <button className="exit"
          onClick={handlePause}>
            Pause
          </button>
        </div>
      </div>

      <div className="sidebar">

        <div className="AI">
          <span className="material-symbols-outlined">
            for_you
          </span>
        </div>

        <p className="interviewer">
        </p>

        <p className="description">
          AI Interviewer
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
          {question}
        </div>

        <div className="answer">
          <textarea
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError("");
            }}
          />
        </div>
        {error && <p className="error-message">{error}</p>}

        <div className="submit-area">
          <button
            className="submit"
            onClick={handleAnswer}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Answer"}
          </button>
        </div>

      </div>
    </>
  );
}

export default Interview;