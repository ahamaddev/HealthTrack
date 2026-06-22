import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaHeartbeat, FaBirthdayCake, FaVenusMars } from 'react-icons/fa';

/**
 * Register page with full registration form
 */
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.gender) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!/\d/.test(formData.password)) {
      setError('Password must contain at least one number.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const age = parseInt(formData.age);
    if (age < 1 || age > 150) {
      setError('Please enter a valid age.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age,
        gender: formData.gender,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center align-items-center py-5">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden fade-in">
              {/* Header */}
              <div className="card-header bg-primary text-white text-center py-4 border-0">
                <FaHeartbeat size={40} className="mb-2" />
                <h3 className="mb-1 fw-bold">Create Account</h3>
                <p className="mb-0 opacity-75">Start your health journey today</p>
              </div>

              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger py-2 fade-in" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label htmlFor="register-name" className="form-label fw-medium">
                      <FaUser className="me-2 text-primary" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="register-name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="register-email" className="form-label fw-medium">
                      <FaEnvelope className="me-2 text-primary" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="register-email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Age & Gender Row */}
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label htmlFor="register-age" className="form-label fw-medium">
                        <FaBirthdayCake className="me-2 text-primary" />
                        Age
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        id="register-age"
                        name="age"
                        placeholder="25"
                        value={formData.age}
                        onChange={handleChange}
                        min="1"
                        max="150"
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="register-gender" className="form-label fw-medium">
                        <FaVenusMars className="me-2 text-primary" />
                        Gender
                      </label>
                      <select
                        className="form-select form-select-lg"
                        id="register-gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="register-password" className="form-label fw-medium">
                      <FaLock className="me-2 text-primary" />
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="register-password"
                      name="password"
                      placeholder="Min 6 chars with a number"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label htmlFor="register-confirm-password" className="form-label fw-medium">
                      <FaLock className="me-2 text-primary" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="register-confirm-password"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={loading}
                    id="register-submit-btn"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <FaUserPlus className="me-2" />
                        Create Account
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-muted mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary fw-medium text-decoration-none">
                    Sign In
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

export default Register;
