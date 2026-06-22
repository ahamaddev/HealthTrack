import { useState } from 'react';
import { FaCalculator, FaSave, FaRulerVertical, FaWeight } from 'react-icons/fa';
import API from '../services/api';

/**
 * BMIForm component: handles BMI calculation and saving
 * Props: onSave - callback after successful save
 */
const BMIForm = ({ onSave }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  /**
   * Calculate BMI locally (for instant feedback)
   */
  const calculateBMI = (e) => {
    e.preventDefault();
    setError('');
    setSaveSuccess(false);

    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      setError('Please enter valid positive values for height and weight.');
      return;
    }

    if (h < 50 || h > 300) {
      setError('Height should be between 50 and 300 cm.');
      return;
    }

    if (w < 10 || w > 500) {
      setError('Weight should be between 10 and 500 kg.');
      return;
    }

    const heightInMeters = h / 100;
    const bmi = parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));

    let category, color, emoji;
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'warning';
      emoji = '⚠️';
    } else if (bmi < 25) {
      category = 'Normal';
      color = 'success';
      emoji = '✅';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'orange-badge';
      emoji = '⚡';
    } else {
      category = 'Obese';
      color = 'danger';
      emoji = '🔴';
    }

    setResult({ bmi, category, color, emoji });
  };

  /**
   * Save BMI to profile via API
   */
  const handleSave = async () => {
    if (!result) return;
    setSaving(true);
    setError('');
    setSaveSuccess(false);

    try {
      await API.post('/bmi/save', {
        height: parseFloat(height),
        weight: parseFloat(weight),
      });
      setSaveSuccess(true);
      if (onSave) onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save BMI');
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setResult(null);
    setError('');
    setSaveSuccess(false);
  };

  return (
    <div className="bmi-form-container">
      <form onSubmit={calculateBMI}>
        {error && (
          <div className="alert alert-danger fade-in py-2" role="alert">
            {error}
          </div>
        )}
        {saveSuccess && (
          <div className="alert alert-success fade-in py-2" role="alert">
            ✅ BMI saved to your profile successfully!
          </div>
        )}

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-medium">
              <FaRulerVertical className="me-2 text-primary" />
              Height (cm)
            </label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="1"
              step="0.1"
              required
              id="bmi-height-input"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">
              <FaWeight className="me-2 text-primary" />
              Weight (kg)
            </label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
              step="0.1"
              required
              id="bmi-weight-input"
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary btn-lg flex-grow-1" id="calculate-bmi-btn">
            <FaCalculator className="me-2" />
            Calculate BMI
          </button>
          {result && (
            <button type="button" className="btn btn-outline-secondary btn-lg" onClick={reset}>
              Reset
            </button>
          )}
        </div>
      </form>

      {/* BMI Result Display */}
      {result && (
        <div className="bmi-result fade-in mt-4">
          <div className="text-center p-4 rounded-4 bg-light">
            <div className="bmi-value display-4 fw-bold mb-2">{result.bmi}</div>
            <span className={`badge bg-${result.color === 'orange-badge' ? 'warning text-dark' : result.color} fs-6 px-3 py-2 rounded-pill`}>
              {result.emoji} {result.category}
            </span>

            {/* BMI Scale */}
            <div className="bmi-scale mt-4">
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar bg-warning" style={{ width: '25%' }}></div>
                <div className="progress-bar bg-success" style={{ width: '25%' }}></div>
                <div className="progress-bar" style={{ width: '25%', backgroundColor: '#fd7e14' }}></div>
                <div className="progress-bar bg-danger" style={{ width: '25%' }}></div>
              </div>
              <div
                className="bmi-indicator"
                style={{
                  left: `${Math.min(Math.max((result.bmi / 40) * 100, 2), 98)}%`,
                }}
              >
                ▲
              </div>
            </div>

            <button
              className="btn btn-success btn-lg mt-4 px-4"
              onClick={handleSave}
              disabled={saving}
              id="save-bmi-btn"
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="me-2" />
                  Save to Profile
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMIForm;
