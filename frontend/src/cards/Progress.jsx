import ProgressCard from "./ProgressCard";
import "./Progress.css";

function Progress() {
  const progress = [
    {
      order: "01",
      title: "Create Your Profile",
      description: "Sign in to the platform",
    },
    {
      order: "02",
      title: "Start AI Powered Mock Interview",
      description: "MyInterviewer ask realistic questions in real time.",
    },
    {
      order: "03",
      title: "Get Instant Feedback",
      description: "Recieve detailed scores, analysis and tips right after each session.",
    },
    {
      order: "04",
      title: "Track & Improve",
      description: "Review your progress & refine each areas.",
    },
  ];

  return (
    <div>
      <div className="progress-grid">
        {progress.map((item, index) => (
          <ProgressCard
            key={index}
            order={item.order}
            title={item.title}
            description={item.description}

          />
        ))}
      </div>
    </div>
  );
}

export default Progress;

