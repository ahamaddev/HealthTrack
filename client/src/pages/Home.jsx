import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaHeartbeat, FaCalculator, FaTint, FaDumbbell, FaAppleAlt,
  FaBookMedical, FaChartLine, FaShieldAlt, FaMobileAlt, FaUsers,
  FaStar, FaArrowRight, FaCheckCircle
} from 'react-icons/fa';
import { useEffect, useRef } from 'react';

/**
 * Home page: beautiful landing page with hero, features, stats, testimonials
 */
const Home = () => {
  const { isAuthenticated } = useAuth();
  const observerRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const features = [
    {
      icon: FaCalculator,
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index instantly and track changes over time.',
      color: '#3b82f6',
      link: '/bmi',
    },
    {
      icon: FaTint,
      title: 'Water Tracker',
      description: 'Monitor your daily water intake with beautiful progress visualization.',
      color: '#0ea5e9',
      link: '/water-tracker',
    },
    {
      icon: FaDumbbell,
      title: 'Fitness Guidance',
      description: 'Get personalized exercise recommendations based on your BMI profile.',
      color: '#8b5cf6',
      link: '/fitness',
    },
    {
      icon: FaAppleAlt,
      title: 'Nutrition Plans',
      description: 'Receive tailored nutrition advice for your specific health category.',
      color: '#10b981',
      link: '/nutrition',
    },
    {
      icon: FaBookMedical,
      title: 'Health Awareness',
      description: 'Learn about common health issues like obesity, dehydration, and more.',
      color: '#f59e0b',
      link: '/awareness',
    },
    {
      icon: FaChartLine,
      title: 'Progress Dashboard',
      description: 'Visualize your health journey with interactive charts and analytics.',
      color: '#ef4444',
      link: '/dashboard',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Users', icon: FaUsers },
    { value: '50K+', label: 'BMI Calculated', icon: FaCalculator },
    { value: '1M+', label: 'Glasses Tracked', icon: FaTint },
    { value: '99%', label: 'User Satisfaction', icon: FaStar },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Fitness Enthusiast',
      content: 'HealthTrack transformed my wellness routine. The BMI tracking and personalized recommendations are incredibly helpful!',
      rating: 5,
    },
    {
      name: 'Rahul Mehta',
      role: 'Software Engineer',
      content: 'The water tracker reminder feature helps me stay hydrated throughout my busy workday. Simple and effective!',
      rating: 5,
    },
    {
      name: 'Ananya Gupta',
      role: 'Yoga Instructor',
      content: 'I recommend HealthTrack to all my students. The awareness articles are well-researched and truly educational.',
      rating: 5,
    },
  ];

  return (
    <div className="home-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="fade-in">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3 fs-6">
                  🏥 Your Health Companion
                </span>
                <h1 className="display-4 fw-bold mb-4 hero-title">
                  Take Control of Your{' '}
                  <span className="text-gradient">Physical Health</span>
                </h1>
                <p className="lead text-muted mb-4 pe-lg-5">
                  Track your BMI, monitor water intake, get personalized fitness
                  and nutrition recommendations, and improve your overall health
                  awareness — all in one place.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  {isAuthenticated ? (
                    <Link to="/dashboard" className="btn btn-primary btn-lg px-4 shadow-sm">
                      Go to Dashboard <FaArrowRight className="ms-2" />
                    </Link>
                  ) : (
                    <>
                      <Link to="/register" className="btn btn-primary btn-lg px-4 shadow-sm">
                        Get Started Free <FaArrowRight className="ms-2" />
                      </Link>
                      <Link to="/login" className="btn btn-outline-primary btn-lg px-4">
                        Sign In
                      </Link>
                    </>
                  )}
                </div>

                {/* Trust indicators */}
                <div className="d-flex align-items-center gap-4 mt-4 pt-2">
                  <div className="d-flex align-items-center text-muted small">
                    <FaCheckCircle className="text-success me-1" /> Free to use
                  </div>
                  <div className="d-flex align-items-center text-muted small">
                    <FaShieldAlt className="text-success me-1" /> Secure & Private
                  </div>
                  <div className="d-flex align-items-center text-muted small">
                    <FaMobileAlt className="text-success me-1" /> Mobile Friendly
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <div className="hero-illustration fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="hero-card-stack">
                  {/* Floating health cards */}
                  <div className="hero-float-card card-1">
                    <FaHeartbeat className="text-danger" size={20} />
                    <span>BMI: 22.5</span>
                    <span className="badge bg-success small">Normal</span>
                  </div>
                  <div className="hero-float-card card-2">
                    <FaTint className="text-primary" size={20} />
                    <span>Water: 2.1L</span>
                    <span className="text-muted small">/ 3L</span>
                  </div>
                  <div className="hero-float-card card-3">
                    <FaDumbbell className="text-purple" size={20} />
                    <span>Daily Exercise</span>
                    <FaCheckCircle className="text-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features-section py-5 bg-light" id="features">
        <div className="container py-5">
          <div className="text-center mb-5 animate-on-scroll">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">
              Features
            </span>
            <h2 className="display-6 fw-bold">Everything You Need for Better Health</h2>
            <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
              Comprehensive tools to monitor, improve, and maintain your physical wellness
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-4 animate-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
                <Link to={isAuthenticated ? feature.link : '/register'} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm hover-card rounded-4 p-2">
                    <div className="card-body p-4">
                      <div
                        className="feature-icon-box mb-3"
                        style={{ backgroundColor: `${feature.color}12` }}
                      >
                        <feature.icon style={{ color: feature.color }} size={28} />
                      </div>
                      <h5 className="fw-semibold text-dark">{feature.title}</h5>
                      <p className="text-muted mb-0">{feature.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="stats-section py-5">
        <div className="container py-4">
          <div className="row g-4 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3 animate-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="p-4">
                  <stat.icon className="text-primary mb-3" size={32} />
                  <h3 className="fw-bold display-6 mb-1">{stat.value}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-it-works py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5 animate-on-scroll">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">
              How It Works
            </span>
            <h2 className="display-6 fw-bold">Get Started in 3 Simple Steps</h2>
          </div>

          <div className="row g-4">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free in less than a minute with your basic details.' },
              { step: '02', title: 'Track Health', desc: 'Calculate BMI, log water intake, and explore fitness recommendations.' },
              { step: '03', title: 'Stay Healthy', desc: 'Monitor your progress with charts and get daily health insights.' },
            ].map((item, index) => (
              <div key={index} className="col-md-4 animate-on-scroll" style={{ transitionDelay: `${index * 0.15}s` }}>
                <div className="text-center p-4">
                  <div className="step-number mb-3">{item.step}</div>
                  <h5 className="fw-semibold">{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section py-5">
        <div className="container py-5">
          <div className="text-center mb-5 animate-on-scroll">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">
              Testimonials
            </span>
            <h2 className="display-6 fw-bold">What Our Users Say</h2>
          </div>

          <div className="row g-4">
            {testimonials.map((t, index) => (
              <div key={index} className="col-md-4 animate-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                    <div className="d-flex gap-1 mb-3">
                      {Array.from({ length: t.rating }, (_, i) => (
                        <FaStar key={i} className="text-warning" size={16} />
                      ))}
                    </div>
                    <p className="text-muted mb-4">"{t.content}"</p>
                    <div className="d-flex align-items-center">
                      <div className="avatar-circle me-3">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h6 className="mb-0 fw-semibold">{t.name}</h6>
                        <small className="text-muted">{t.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      {!isAuthenticated && (
        <section className="cta-section py-5">
          <div className="container py-4">
            <div className="cta-card rounded-4 p-5 text-center text-white">
              <h2 className="display-6 fw-bold mb-3">Ready to Start Your Health Journey?</h2>
              <p className="lead mb-4 opacity-75">
                Join thousands of users who are already improving their health with HealthTrack
              </p>
              <Link to="/register" className="btn btn-light btn-lg px-5 shadow">
                Get Started Free <FaArrowRight className="ms-2" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
