import { useState, useEffect } from 'react';
import FitnessCard from '../components/FitnessCard';
import API from '../services/api';
import { FaDumbbell, FaInfoCircle } from 'react-icons/fa';

/**
 * Fitness page: shows personalized exercise recommendations
 */
const Fitness = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [category, setCategory] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await API.get('/recommendations');
        setRecommendations(res.data.data.fitness || []);
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
          <span className="badge bg-purple bg-opacity-10 text-purple px-3 py-2 rounded-pill mb-3">
            <FaDumbbell className="me-1" /> Fitness
          </span>
          <h1 className="display-5 fw-bold">Fitness Recommendations</h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
            Personalized exercise suggestions based on your BMI profile to help you achieve optimal health.
          </p>
        </div>

        {/* BMI Status Banner */}
        {category && (
          <div className="alert alert-info border-0 rounded-4 d-flex align-items-center mb-4 fade-in" role="alert">
            <FaInfoCircle className="me-3 flex-shrink-0" size={20} />
            <div>
              Your current BMI is <strong>{bmi}</strong> ({category}).
              These recommendations are tailored for your profile.
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
                <FitnessCard
                  title={rec.title}
                  description={rec.description}
                  icon={rec.icon}
                  difficulty={rec.difficulty}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}

        {/* General Tips */}
        <div className="card border-0 shadow-sm rounded-4 mt-5 fade-in">
          <div className="card-body p-4 p-md-5">
            <h4 className="fw-semibold mb-4">💡 General Fitness Tips</h4>
            <div className="row g-3">
              {[
                { tip: 'Start slowly and gradually increase intensity', icon: '🏃' },
                { tip: 'Stay consistent — aim for 30 minutes daily', icon: '⏰' },
                { tip: 'Warm up before and cool down after workouts', icon: '🔥' },
                { tip: 'Listen to your body and rest when needed', icon: '😴' },
                { tip: 'Combine cardio with strength training', icon: '💪' },
                { tip: 'Stay hydrated during exercise', icon: '💧' },
              ].map((item, index) => (
                <div key={index} className="col-md-6">
                  <div className="d-flex align-items-center p-3 bg-light rounded-3">
                    <span className="fs-4 me-3">{item.icon}</span>
                    <span>{item.tip}</span>
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

export default Fitness;
