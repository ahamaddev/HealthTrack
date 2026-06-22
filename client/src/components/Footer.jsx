import { Link } from 'react-router-dom';
import { FaHeartbeat, FaEnvelope, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

/**
 * Footer component with site info, quick links, and social icons
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <FaHeartbeat className="text-primary me-2" size={28} />
              <h5 className="mb-0 fw-bold">HealthTrack</h5>
            </div>
            <p className="text-secondary small">
              Your personal health companion. Track BMI, monitor water intake,
              and get personalized fitness & nutrition recommendations for a
              healthier lifestyle.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-secondary social-icon" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-secondary social-icon" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="text-secondary social-icon" aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href="#" className="text-secondary social-icon" aria-label="Email">
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none footer-link">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/bmi" className="text-secondary text-decoration-none footer-link">BMI Calculator</Link>
              </li>
              <li className="mb-2">
                <Link to="/water-tracker" className="text-secondary text-decoration-none footer-link">Water Tracker</Link>
              </li>
              <li className="mb-2">
                <Link to="/awareness" className="text-secondary text-decoration-none footer-link">Health Awareness</Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-semibold mb-3">Features</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/fitness" className="text-secondary text-decoration-none footer-link">Fitness Tips</Link>
              </li>
              <li className="mb-2">
                <Link to="/nutrition" className="text-secondary text-decoration-none footer-link">Nutrition Guide</Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-secondary text-decoration-none footer-link">Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-secondary text-decoration-none footer-link">Profile</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-semibold mb-3">About</h6>
            <p className="text-secondary small">
              HealthTrack is a preventive health and wellness application.
              It is NOT a medical diagnosis tool. Always consult with healthcare
              professionals for medical advice.
            </p>
            <p className="text-secondary small mb-0">
              <FaEnvelope className="me-2" />
              support@healthtrack.app
            </p>
          </div>
        </div>

        <hr className="border-secondary mt-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-secondary small mb-0">
              &copy; {currentYear} HealthTrack. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="text-secondary small mb-0">
              Built with ❤️ for better health
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
