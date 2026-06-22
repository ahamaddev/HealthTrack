import { FaDumbbell, FaWalking, FaRunning, FaBiking, FaSwimmer, FaFire, FaHeart, FaStar } from 'react-icons/fa';
import { GiMeditation, GiMuscleUp } from 'react-icons/gi';

/**
 * FitnessCard component: displays a fitness recommendation
 * Props: title, description, icon, difficulty, index
 */

const iconMap = {
  dumbbell: FaDumbbell,
  band: GiMuscleUp,
  fire: FaFire,
  yoga: GiMeditation,
  walking: FaWalking,
  running: FaRunning,
  cycling: FaBiking,
  stretch: GiMuscleUp,
  heart: FaHeart,
  swimming: FaSwimmer,
};

const difficultyColors = {
  Beginner: 'success',
  Moderate: 'warning',
  Advanced: 'danger',
};

const FitnessCard = ({ title, description, icon, difficulty, index = 0 }) => {
  const IconComponent = iconMap[icon] || FaStar;
  const diffColor = difficultyColors[difficulty] || 'primary';

  return (
    <div
      className="card h-100 border-0 shadow-sm hover-card fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
          <div className="icon-circle bg-primary bg-opacity-10 p-3 rounded-circle me-3">
            <IconComponent className="text-primary" size={24} />
          </div>
          <div>
            <h5 className="card-title mb-1 fw-semibold">{title}</h5>
            <span className={`badge bg-${diffColor} bg-opacity-10 text-${diffColor} small`}>
              {difficulty}
            </span>
          </div>
        </div>
        <p className="card-text text-muted">{description}</p>
      </div>
    </div>
  );
};

export default FitnessCard;
