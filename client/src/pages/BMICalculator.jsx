import { useState, useEffect } from 'react';
import BMIForm from '../components/BMIForm';
import API from '../services/api';
import { FaHistory, FaCalculator, FaInfoCircle } from 'react-icons/fa';

/**
 * BMI Calculator page with form and history table
 */
const BMICalculator = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get('/bmi/history');
      setHistory(res.data.data);
    } catch (err) {
      console.error('Failed to fetch BMI history:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadge = (category) => {
    const colors = {
      Underweight: 'warning',
      Normal: 'success',
      Overweight: 'warning',
      Obese: 'danger',
    };
    return `bg-${colors[category] || 'secondary'}`;
  };

  return (
    <div className="page-container py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5 fade-in">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">
            <FaCalculator className="me-1" /> Health Tool
          </span>
          <h1 className="display-5 fw-bold">BMI Calculator</h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
            Calculate your Body Mass Index to understand your weight category and track changes over time.
          </p>
        </div>

        <div className="row g-4">
          {/* BMI Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <h4 className="fw-semibold mb-4">
                  <FaCalculator className="me-2 text-primary" />
                  Calculate Your BMI
                </h4>
                <BMIForm onSave={fetchHistory} />
              </div>
            </div>

            {/* BMI Info Card */}
            <div className="card border-0 shadow-sm rounded-4 mt-4">
              <div className="card-body p-4">
                <h5 className="fw-semibold mb-3">
                  <FaInfoCircle className="me-2 text-primary" />
                  Understanding BMI
                </h5>
                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <thead>
                      <tr>
                        <th className="text-muted">BMI Range</th>
                        <th className="text-muted">Category</th>
                        <th className="text-muted">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>&lt; 18.5</td>
                        <td>Underweight</td>
                        <td><span className="badge bg-warning text-dark">⚠️ Below Normal</span></td>
                      </tr>
                      <tr>
                        <td>18.5 – 24.9</td>
                        <td>Normal</td>
                        <td><span className="badge bg-success">✅ Healthy</span></td>
                      </tr>
                      <tr>
                        <td>25 – 29.9</td>
                        <td>Overweight</td>
                        <td><span className="badge bg-warning text-dark">⚡ Above Normal</span></td>
                      </tr>
                      <tr>
                        <td>≥ 30</td>
                        <td>Obese</td>
                        <td><span className="badge bg-danger">🔴 High Risk</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* BMI History */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h4 className="fw-semibold mb-4">
                  <FaHistory className="me-2 text-primary" />
                  Your BMI History
                </h4>

                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <FaCalculator size={40} className="mb-3 opacity-25" />
                    <p className="mb-0">No BMI records yet.</p>
                    <small>Calculate and save your first BMI!</small>
                  </div>
                ) : (
                  <div className="bmi-history-list">
                    {history.map((record, index) => (
                      <div
                        key={record._id}
                        className="d-flex justify-content-between align-items-center p-3 rounded-3 mb-2 bg-light fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div>
                          <div className="fw-semibold">BMI: {record.bmi}</div>
                          <small className="text-muted">
                            {record.height}cm / {record.weight}kg
                          </small>
                        </div>
                        <div className="text-end">
                          <span className={`badge ${getCategoryBadge(record.category)} rounded-pill`}>
                            {record.category}
                          </span>
                          <div className="small text-muted mt-1">
                            {new Date(record.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
