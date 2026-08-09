import "./Feedback.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Feedback() {
  const { sessionId } = useParams();

  const [finalFeedback, setFinalFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/interview/${sessionId}/feedback`
        );

        const data = await response.json();

        console.log("FEEDBACK RESPONSE:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to get feedback");
        }

        setFinalFeedback(data.finalFeedback);
      } catch (err) {
        console.error("Get Feedback Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [sessionId]);

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  if (error) {
    return <p>Failed to load feedback: {error}</p>;
  }

  if (!finalFeedback) {
    return <p>No feedback available.</p>;
  }

  return (
    <div className="feedback-page">
      <h1>Interview Feedback</h1>

      <h2>Overall Score: {finalFeedback.overallScore}</h2>

      <p>Technical Score: {finalFeedback.technicalScore}</p>
      <p>Communication Score: {finalFeedback.communicationScore}</p>
      <p>Grammar Score: {finalFeedback.grammarScore}</p>

      <h3>Strengths</h3>
      <ul>
        {finalFeedback.strengths?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Areas for Improvement</h3>
      <ul>
        {finalFeedback.improvements?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Summary</h3>
      <p>{finalFeedback.summary}</p>

      <h3>Suggested Preparation</h3>
      <ul>
        {finalFeedback.suggestedPreparation?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Feedback;
