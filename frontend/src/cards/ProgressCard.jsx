import "./ProgressCard.css";

function ProgressCard({ order, title, description }) {
  return (
    <>
      <div className="progress-card">
        <h2 className="order">
          {order}
        </h2>

        <h3 className="title">
          {title}
        </h3>
        <p>
          {description}
        </p>
      </div>
      <div className="arrow">
        arrow

      </div>
    </>
  );
}

export default ProgressCard;

