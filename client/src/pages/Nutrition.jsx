import { useState, useEffect } from 'react';
import NutritionCard from '../components/NutritionCard';
import API from '../services/api';
import { FaAppleAlt, FaInfoCircle } from 'react-icons/fa';

/**
 * Nutrition page: shows personalized nutrition guidance
 */
const Nutrition = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [category, setCategory] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await API.get('/recommendations');
        setRecommendations(res.data.data.nutrition || []);
        setCategory(res.data.data.category);
        setBmi(res.data.data.bmi);
        setMessage(res.data.data.message || '');
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="page-container py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5 fade-in">
          <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3">
            <FaAppleAlt className="me-1" /> Nutrition
          </span>
          <h1 className="display-5 fw-bold">Nutrition Guidance</h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
            Personalized dietary recommendations to complement your fitness goals and improve overall health.
          </p>
        </div>

        {/* BMI Status Banner */}
        {category && (
          <div className="alert alert-info border-0 rounded-4 d-flex align-items-center mb-4 fade-in" role="alert">
            <FaInfoCircle className="me-3 flex-shrink-0" size={20} />
            <div>
              Your current BMI is <strong>{bmi}</strong> ({category}).
              These nutrition recommendations are customized for you.
            </div>
          </div>
        )}

        {message && (
          <div className="alert alert-warning border-0 rounded-4 mb-4 fade-in" role="alert">
            {message}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <NutritionCard
                  title={rec.title}
                  description={rec.description}
                  icon={rec.icon}
                  category={rec.category}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}

        {/* Daily Meal Plan Suggestion */}
        <div className="card border-0 shadow-sm rounded-4 mt-5 fade-in">
          <div className="card-body p-4 p-md-5">
            <h4 className="fw-semibold mb-4">🍽️ Balanced Daily Meal Plan</h4>
            <div className="row g-3">
              {[
                { meal: 'Breakfast', time: '7:00 – 8:00 AM', items: 'Oats, fruits, eggs, milk or smoothie', icon: '🌅' },
                { meal: 'Mid-Morning', time: '10:00 – 10:30 AM', items: 'Nuts, yogurt, or a piece of fruit', icon: '🥜' },
                { meal: 'Lunch', time: '12:30 – 1:30 PM', items: 'Rice/roti, vegetables, dal, salad', icon: '🍛' },
                { meal: 'Evening Snack', time: '4:00 – 4:30 PM', items: 'Green tea, sprouts, or a light snack', icon: '🍵' },
                { meal: 'Dinner', time: '7:00 – 8:00 PM', items: 'Light meal — soup, grilled veggies, roti', icon: '🥗' },
                { meal: 'Before Bed', time: '9:30 PM', items: 'Warm milk or chamomile tea', icon: '🌙' },
              ].map((item, index) => (
                <div key={index} className="col-md-6">
                  <div className="d-flex align-items-start p-3 bg-light rounded-3">
                    <span className="fs-3 me-3">{item.icon}</span>
                    <div>
                      <h6 className="fw-semibold mb-0">{item.meal}</h6>
                      <small className="text-primary">{item.time}</small>
                      <p className="text-muted small mb-0 mt-1">{item.items}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
