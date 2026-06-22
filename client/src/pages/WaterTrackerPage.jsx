import WaterTracker from '../components/WaterTracker';
import { FaTint, FaInfoCircle, FaLightbulb } from 'react-icons/fa';

/**
 * Water Tracker page with the tracker component and hydration tips
 */
const WaterTrackerPage = () => {
  const tips = [
    'Start your day with a glass of water before breakfast.',
    'Keep a water bottle at your desk for easy access.',
    'Set hourly reminders to take a water break.',
    'Eat water-rich foods like cucumbers and watermelon.',
    'Drink a glass of water before each meal.',
    'Track your intake daily to build a healthy habit.',
  ];

  return (
    <div className="page-container py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5 fade-in">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">
            <FaTint className="me-1" /> Hydration
          </span>
          <h1 className="display-5 fw-bold">Water Tracker</h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
            Stay hydrated throughout the day. Track your water intake and reach your daily goal of 3 liters.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Water Tracker */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <h4 className="fw-semibold mb-4">
                  <FaTint className="me-2 text-primary" />
                  Today's Intake
                </h4>
                <WaterTracker />
              </div>
            </div>
          </div>

          {/* Tips & Info */}
          <div className="col-lg-5">
            {/* Hydration Tips */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-semibold mb-3">
                  <FaLightbulb className="me-2 text-warning" />
                  Hydration Tips
                </h5>
                <ul className="list-unstyled mb-0">
                  {tips.map((tip, index) => (
                    <li key={index} className="d-flex align-items-start mb-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-3 mt-1" style={{ minWidth: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {index + 1}
                      </span>
                      <span className="text-muted">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Why Hydration Matters */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-semibold mb-3">
                  <FaInfoCircle className="me-2 text-primary" />
                  Why Hydration Matters
                </h5>
                <div className="row g-3">
                  {[
                    { emoji: '🧠', label: 'Brain Function', desc: 'Improves focus and concentration' },
                    { emoji: '💪', label: 'Energy', desc: 'Reduces fatigue and boosts energy' },
                    { emoji: '🫀', label: 'Heart Health', desc: 'Supports cardiovascular function' },
                    { emoji: '✨', label: 'Skin Health', desc: 'Keeps skin hydrated and glowing' },
                  ].map((item, index) => (
                    <div key={index} className="col-6">
                      <div className="p-3 rounded-3 bg-light text-center">
                        <div className="fs-3 mb-1">{item.emoji}</div>
                        <div className="fw-medium small">{item.label}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTrackerPage;
