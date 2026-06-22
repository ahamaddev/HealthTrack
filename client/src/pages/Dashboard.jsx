import { useState, useEffect } from 'react';
import ProgressChart from '../components/ProgressChart';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  FaChartLine, FaWeight, FaTint, FaDumbbell, FaAppleAlt,
  FaCalculator, FaArrowRight
} from 'react-icons/fa';

/**
 * Dashboard page: aggregated health data with charts
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [dashData, setDashData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, recRes] = await Promise.all([
          API.get('/dashboard'),
          API.get('/recommendations'),
        ]);
        setDashData(dashRes.data.data);
        setRecommendations(recRes.data.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const bmiCategoryColors = {
    Underweight: '#f59e0b',
    Normal: '#10b981',
    Overweight: '#f97316',
    Obese: '#ef4444',
  };

  return (
    <div className="page-container py-5">
      <div className="container">
        {/* Welcome Header */}
        <div className="mb-5 fade-in">
          <h1 className="display-5 fw-bold">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-muted lead">Here's your health overview for today.</p>
        </div>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          {/* BMI Card */}
          <div className="col-md-6 col-lg-3 fade-in" style={{ animationDelay: '0s' }}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="icon-box bg-primary bg-opacity-10 p-2 rounded-3">
                    <FaCalculator className="text-primary" size={20} />
                  </div>
                  {dashData?.latestBMI && (
                    <span
                      className="badge rounded-pill px-2 py-1"
                      style={{
                        backgroundColor: `${bmiCategoryColors[dashData.latestBMI.category]}15`,
                        color: bmiCategoryColors[dashData.latestBMI.category],
                      }}
                    >
                      {dashData.latestBMI.category}
                    </span>
                  )}
                </div>
                <h3 className="fw-bold mb-1">
                  {dashData?.latestBMI ? dashData.latestBMI.bmi : '—'}
                </h3>
                <p className="text-muted mb-0 small">Current BMI</p>
              </div>
            </div>
          </div>

          {/* Weight Card */}
          <div className="col-md-6 col-lg-3 fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="icon-box bg-success bg-opacity-10 p-2 rounded-3">
                    <FaWeight className="text-success" size={20} />
                  </div>
                </div>
                <h3 className="fw-bold mb-1">
                  {dashData?.latestBMI ? `${dashData.latestBMI.weight} kg` : '—'}
                </h3>
                <p className="text-muted mb-0 small">Latest Weight</p>
              </div>
            </div>
          </div>

          {/* Water Card */}
          <div className="col-md-6 col-lg-3 fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="icon-box bg-info bg-opacity-10 p-2 rounded-3">
                    <FaTint className="text-info" size={20} />
                  </div>
                  <span className="badge bg-info bg-opacity-10 text-info rounded-pill px-2 py-1 small">
                    {dashData?.todayWater?.percentage || 0}%
                  </span>
                </div>
                <h3 className="fw-bold mb-1">
                  {dashData?.todayWater?.totalIntake || 0} ml
                </h3>
                <p className="text-muted mb-0 small">Today's Water Intake</p>
                <div className="progress mt-2" style={{ height: '6px' }}>
                  <div
                    className="progress-bar bg-info"
                    style={{ width: `${dashData?.todayWater?.percentage || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fitness Status Card */}
          <div className="col-md-6 col-lg-3 fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="icon-box bg-purple bg-opacity-10 p-2 rounded-3">
                    <FaDumbbell className="text-purple" size={20} />
                  </div>
                </div>
                <h3 className="fw-bold mb-1">
                  {recommendations?.category || 'N/A'}
                </h3>
                <p className="text-muted mb-0 small">Fitness Category</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row g-4 mb-5">
          {/* Weight & BMI History Line Chart */}
          <div className="col-lg-8 fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-semibold mb-4">
                  <FaChartLine className="me-2 text-primary" />
                  Weight & BMI History
                </h5>
                {dashData?.healthHistory?.length > 0 ? (
                  <ProgressChart
                    type="line"
                    labels={dashData.healthHistory.map((h) =>
                      new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    )}
                    datasets={[
                      {
                        label: 'Weight (kg)',
                        data: dashData.healthHistory.map((h) => h.weight),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      },
                      {
                        label: 'BMI',
                        data: dashData.healthHistory.map((h) => h.bmi),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      },
                    ]}
                    height={300}
                  />
                ) : (
                  <div className="text-center text-muted py-5">
                    <FaChartLine size={40} className="mb-3 opacity-25" />
                    <p>No history data yet. Calculate your BMI to start tracking!</p>
                    <Link to="/bmi" className="btn btn-primary btn-sm">
                      Calculate BMI <FaArrowRight className="ms-1" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Daily Water Intake Bar Chart */}
          <div className="col-lg-4 fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-semibold mb-4">
                  <FaTint className="me-2 text-info" />
                  Water Intake (7 Days)
                </h5>
                {dashData?.waterChartData?.some((d) => d.amount > 0) ? (
                  <ProgressChart
                    type="bar"
                    labels={dashData.waterChartData.map((d) => {
                      const date = new Date(d.date);
                      return date.toLocaleDateString('en-US', { weekday: 'short' });
                    })}
                    datasets={[
                      {
                        label: 'Water (ml)',
                        data: dashData.waterChartData.map((d) => d.amount),
                        borderColor: '#0ea5e9',
                        backgroundColor: 'rgba(14, 165, 233, 0.6)',
                      },
                    ]}
                    height={300}
                  />
                ) : (
                  <div className="text-center text-muted py-5">
                    <FaTint size={40} className="mb-3 opacity-25" />
                    <p>No water data yet.</p>
                    <Link to="/water-tracker" className="btn btn-primary btn-sm">
                      Track Water <FaArrowRight className="ms-1" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Preview */}
        <div className="row g-4">
          {/* Fitness Recommendations */}
          <div className="col-md-6 fade-in">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-semibold mb-0">
                    <FaDumbbell className="me-2 text-purple" />
                    Fitness Tips
                  </h5>
                  <Link to="/fitness" className="btn btn-sm btn-outline-primary">
                    View All <FaArrowRight className="ms-1" />
                  </Link>
                </div>
                {recommendations?.fitness?.slice(0, 3).map((rec, index) => (
                  <div key={index} className="d-flex align-items-center p-2 rounded-3 mb-2 bg-light">
                    <span className="badge bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-3">
                      {index + 1}
                    </span>
                    <div>
                      <div className="fw-medium small">{rec.title}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{rec.difficulty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nutrition Recommendations */}
          <div className="col-md-6 fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-semibold mb-0">
                    <FaAppleAlt className="me-2 text-success" />
                    Nutrition Tips
                  </h5>
                  <Link to="/nutrition" className="btn btn-sm btn-outline-primary">
                    View All <FaArrowRight className="ms-1" />
                  </Link>
                </div>
                {recommendations?.nutrition?.slice(0, 3).map((rec, index) => (
                  <div key={index} className="d-flex align-items-center p-2 rounded-3 mb-2 bg-light">
                    <span className="badge bg-success bg-opacity-10 text-success rounded-circle p-2 me-3">
                      {index + 1}
                    </span>
                    <div>
                      <div className="fw-medium small">{rec.title}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{rec.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
