import "./Landpage.css";
import Features from "../cards/Features";
import Progress from "../cards/Progress";

function Landpage() {
  return (
   <> 
    <section className="landing-page">

        <div className="capsule">
            AI Integrated Interview Platfrom
        </div>

      <div className="mainHeader">
        AI-Powered Interview Practice
      </div>

      <div className="header2">
        Practice realistic mock interviews with MyInterviewer.
        Get instant, personalized feedback and land your dream job faster.
      </div>

      <button className="start-free-interview">
        Start Free Interview
      </button>


      <section className="features-section">
          <Features />
      </section>

        <section className="progress-section">
          <Progress/>
        </section>
    </section>
  </>
  );
}

export default Landpage;