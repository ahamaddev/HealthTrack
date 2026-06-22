import { FaDrumstickBite, FaAppleAlt, FaLeaf, FaEgg, FaSeedling, FaCheese, FaBreadSlice, FaStar } from 'react-icons/fa';
import { GiMilkCarton, GiOat, GiSugarCane, GiMeal } from 'react-icons/gi';

/**
 * NutritionCard component: displays a nutrition recommendation
 * Props: title, description, icon, category, index
 */

const iconMap = {
  meat: FaDrumstickBite,
  milk: GiMilkCarton,
  egg: FaEgg,
  calories: FaStar,
  balanced: GiMeal,
  fruit: FaAppleAlt,
  vegetable: FaLeaf,
  grain: FaBreadSlice,
  fiber: GiOat,
  salad: FaSeedling,
  nosugar: GiSugarCane,
  cheese: FaCheese,
};

const categoryColors = {
  Protein: '#e74c3c',
  Dairy: '#3498db',
  Vitamins: '#f39c12',
  Fiber: '#27ae60',
  Carbs: '#9b59b6',
  Vegetables: '#2ecc71',
  Lifestyle: '#1abc9c',
  'Diet Plan': '#e67e22',
};

const NutritionCard = ({ title, description, icon, category, index = 0 }) => {
  const IconComponent = iconMap[icon] || FaStar;
  const catColor = categoryColors[category] || '#3b82f6';

  return (
    <div
      className="card h-100 border-0 shadow-sm hover-card fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
          <div
            className="icon-circle p-3 rounded-circle me-3"
            style={{ backgroundColor: `${catColor}15` }}
          >
            <IconComponent style={{ color: catColor }} size={24} />
          </div>
          <div>
            <h5 className="card-title mb-1 fw-semibold">{title}</h5>
            <span
              className="badge small px-2 py-1 rounded-pill"
              style={{ backgroundColor: `${catColor}20`, color: catColor }}
            >
              {category}
            </span>
          </div>
        </div>
        <p className="card-text text-muted">{description}</p>
      </div>
    </div>
  );
};

export default NutritionCard;
