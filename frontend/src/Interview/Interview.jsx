import "./Interview.css";

import { MyContext } from "../context/MyContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function Interview() {
  const location = useLocation();

  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    question,
    setQuestion,
    answer,
    setAnswer,
  } = useContext(MyContext);


  // Set first question received from /start
  useEffect(() => {
    if (location.state?.question) {
      setQuestion(location.state.question);
    }
  }, [location.state, setQuestion]);


  // Submit answer
  const handleAnswer = async () => {

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

      // Backend generated next question
      setQuestion(data.question);

      // Clear textarea
      setAnswer("");

    } catch (err) {
      console.error("Failed to submit answer:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    
    <>
      <div className="interview-header">
        <div className="role">
            ROLE
        </div>
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
          {question}
        </div>

        <div className="answer">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

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