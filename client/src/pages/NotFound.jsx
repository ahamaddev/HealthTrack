import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

/**
 * 404 Not Found page
 */
const NotFound = () => {
  return (
    <div className="page-container d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <div className="text-center fade-in">
        <FaExclamationTriangle className="text-warning mb-4" size={64} />
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h3 className="fw-semibold mb-3">Page Not Found</h3>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg px-4">
          <FaHome className="me-2" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
