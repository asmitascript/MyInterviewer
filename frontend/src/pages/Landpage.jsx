import "./Landpage.css";
import Features from "../cards/Features";
import Progress from "../cards/Progress";
import InterviewDemoCard from "../cards/InterviewDemoCard";

import { useNavigate } from "react-router-dom";

function Landpage() {

  const navigate = useNavigate();

  return (
    <>
      <section className="landing-page">
        <div className="capsule">
          AI-Powered Interview Platform
        </div>

        <section className="hero-section">

          <div className="demo-section">
            <InterviewDemoCard />
          </div>

          <div className="hero-content">

            <div className="mainHeader">
              AI-Powered Interview Practice
            </div>

            <div className="header2">
              Practice realistic mock interviews with MyInterviewer.
              Get instant, personalized feedback and land your dream job faster.
            </div>

            <button
              type="button"
              className="start-free-interview"
              onClick={() => navigate("/interview/setup")}
            >
              Start Free Interview
            </button>

          </div>

        </section>

        <section className="features-section">
          <Features />
        </section>

        <section className="progress-section">
          <Progress />
        </section>

      </section>
    </>
  );
}

export default Landpage;