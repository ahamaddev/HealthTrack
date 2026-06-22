import { useState, useEffect } from 'react';
import { FaTint, FaPlus, FaGlassWhiskey } from 'react-icons/fa';
import API from '../services/api';

/**
 * WaterTracker component: manages daily water intake
 * Quick-add buttons + custom input + animated progress
 */
const WaterTracker = () => {
  const [waterData, setWaterData] = useState({
    totalIntake: 0,
    target: 3000,
    remaining: 3000,
    percentage: 0,
  });
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch today's water data on mount
  useEffect(() => {
    fetchTodayWater();
  }, []);

  const fetchTodayWater = async () => {
    try {
      const res = await API.get('/water/today');
      setWaterData(res.data.data);
    } catch (err) {
      console.error('Failed to fetch water data:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add water amount
   */
  const addWater = async (amount) => {
    if (amount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    setAdding(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await API.post('/water/add', { amount });
      setWaterData(res.data.data);
      setSuccessMsg(`Added ${amount}ml 💧`);
      setCustomAmount('');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add water');
    } finally {
      setAdding(false);
    }
  };

  const handleCustomAdd = (e) => {
    e.preventDefault();
    const amount = parseInt(customAmount);
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    addWater(amount);
  };

  // Progress circle calculations
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (waterData.percentage / 100) * circumference;

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="water-tracker-container">
      {error && (
        <div className="alert alert-danger fade-in py-2">{error}</div>
      )}
      {successMsg && (
        <div className="alert alert-success fade-in py-2">{successMsg}</div>
      )}

      {/* Circular Progress */}
      <div className="text-center mb-4">
        <div className="water-circle-container mx-auto position-relative" style={{ width: '200px', height: '200px' }}>
          <svg width="200" height="200" viewBox="0 0 200 200" className="water-progress-svg">
            {/* Background circle */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="#e8f4f8" strokeWidth="12" />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 100 100)"
              className="water-progress-circle"
            />
          </svg>
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <FaTint className="text-primary mb-1" size={24} />
            <div className="fw-bold fs-3">{waterData.percentage}%</div>
            <small className="text-muted">of daily goal</small>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-4 text-center">
          <div className="p-3 rounded-3 bg-primary bg-opacity-10">
            <div className="fw-bold fs-5 text-primary">{waterData.totalIntake}</div>
            <small className="text-muted">ml intake</small>
          </div>
        </div>
        <div className="col-4 text-center">
          <div className="p-3 rounded-3 bg-success bg-opacity-10">
            <div className="fw-bold fs-5 text-success">{waterData.target}</div>
            <small className="text-muted">ml target</small>
          </div>
        </div>
        <div className="col-4 text-center">
          <div className="p-3 rounded-3 bg-warning bg-opacity-10">
            <div className="fw-bold fs-5 text-warning">{waterData.remaining}</div>
            <small className="text-muted">ml left</small>
          </div>
        </div>
      </div>

      {/* Linear Progress Bar */}
      <div className="mb-4">
        <div className="d-flex justify-content-between small mb-1">
          <span className="text-muted">Progress</span>
          <span className="fw-medium">{waterData.totalIntake} / {waterData.target} ml</span>
        </div>
        <div className="progress" style={{ height: '12px' }}>
          <div
            className="progress-bar water-progress-bar"
            role="progressbar"
            style={{ width: `${waterData.percentage}%` }}
            aria-valuenow={waterData.percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-3">
          <FaGlassWhiskey className="me-2 text-primary" />
          Quick Add
        </h6>
        <div className="d-flex gap-2 flex-wrap">
          {[250, 500, 750].map((amount) => (
            <button
              key={amount}
              className="btn btn-outline-primary flex-grow-1 py-2"
              onClick={() => addWater(amount)}
              disabled={adding}
              id={`water-add-${amount}-btn`}
            >
              <FaPlus className="me-1" /> {amount}ml
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <form onSubmit={handleCustomAdd}>
        <h6 className="fw-semibold mb-3">Custom Amount</h6>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount in ml"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            min="1"
            id="water-custom-input"
          />
          <button
            className="btn btn-primary px-4"
            type="submit"
            disabled={adding}
            id="water-custom-add-btn"
          >
            {adding ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              <>
                <FaPlus className="me-1" /> Add
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WaterTracker;
