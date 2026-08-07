import "./Features.css";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Questions",
    description:
      "Adaptive questions tailored to your role, experience level, and target company culture.",
  },
  {
    icon: "🎯",
    title: "Real-time Feedback",
    description:
      "Instant analysis of your answers with actionable suggestions to improve clarity and impact.",
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    description:
      "Detailed scoring on communication, technical depth, and behavioral competencies.",
  },
  {
    icon: "🎓",
    title: "Personalized Preparation",
    description:
      "Practice with questions designed specifically around your skills and interview goals.",
  },
  {
    icon: "🔄",
    title: "Adaptive Interviews",
    description:
      "Questions dynamically adjust based on your previous answers and performance.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description:
      "Track your improvement over time and identify areas that need more practice.",
  },
];

function Features() {
  return (
    <div className="features-container">

      <div className="features-heading">
        <h2>
          Built for <span>Interview Success</span>
        </h2>

        <p>
          Everything you need to prepare, practice, and perform at your
          peak on interview day.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

    </div>
  );
}

export default Features;