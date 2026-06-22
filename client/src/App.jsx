import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BMICalculator from './pages/BMICalculator';
import WaterTrackerPage from './pages/WaterTrackerPage';
import Fitness from './pages/Fitness';
import Nutrition from './pages/Nutrition';
import Awareness from './pages/Awareness';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

/**
 * App component: root layout with router and auth provider
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-wrapper d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/awareness" element={<Awareness />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
              } />
              <Route path="/bmi" element={
                <ProtectedRoute><BMICalculator /></ProtectedRoute>
              } />
              <Route path="/water-tracker" element={
                <ProtectedRoute><WaterTrackerPage /></ProtectedRoute>
              } />
              <Route path="/fitness" element={
                <ProtectedRoute><Fitness /></ProtectedRoute>
              } />
              <Route path="/nutrition" element={
                <ProtectedRoute><Nutrition /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><Profile /></ProtectedRoute>
              } />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
