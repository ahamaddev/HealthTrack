import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHeartbeat, FaSignOutAlt, FaUser, FaBars } from 'react-icons/fa';
import { useState } from 'react';

/**
 * Navbar component with responsive Bootstrap layout
 * Shows conditional auth links based on login state
 */
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const closeNav = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/" onClick={closeNav}>
          <FaHeartbeat className="text-primary me-2" size={24} />
          <span className="brand-text">HealthTrack</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        {/* Nav links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeNav}>Home</NavLink>
            </li>

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bmi" onClick={closeNav}>BMI</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/water-tracker" onClick={closeNav}>Water Tracker</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/fitness" onClick={closeNav}>Fitness</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/nutrition" onClick={closeNav}>Nutrition</NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink className="nav-link" to="/awareness" onClick={closeNav}>Awareness</NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard" onClick={closeNav}>Dashboard</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link btn btn-link dropdown-toggle d-flex align-items-center"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser className="me-1" />
                    {user?.name?.split(' ')[0]}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                    <li>
                      <Link className="dropdown-item" to="/profile" onClick={closeNav}>
                        <FaUser className="me-2" /> Profile
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <FaSignOutAlt className="me-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={closeNav}>Login</NavLink>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary btn-sm px-3 ms-lg-2" to="/register" onClick={closeNav}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
