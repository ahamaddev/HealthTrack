import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt, FaHeartbeat } from 'react-icons/fa';

/**
 * Login page with email/password form
 */
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-80">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden fade-in">
              {/* Header */}
              <div className="card-header bg-primary text-white text-center py-4 border-0">
                <FaHeartbeat size={40} className="mb-2" />
                <h3 className="mb-1 fw-bold">Welcome Back</h3>
                <p className="mb-0 opacity-75">Sign in to your HealthTrack account</p>
              </div>

              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger py-2 fade-in" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="login-email" className="form-label fw-medium">
                      <FaEnvelope className="me-2 text-primary" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="login-email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="login-password" className="form-label fw-medium">
                      <FaLock className="me-2 text-primary" />
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="login-password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={loading}
                    id="login-submit-btn"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-muted mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary fw-medium text-decoration-none">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
