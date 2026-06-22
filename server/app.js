const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const bmiRoutes = require('./routes/bmi');
const waterRoutes = require('./routes/water');
const dashboardRoutes = require('./routes/dashboard');
const recommendationRoutes = require('./routes/recommendations');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ============================================
// Middleware
// ============================================

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// ============================================
// API Routes
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/bmi', bmiRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HealthTrack API is running' });
});

// ============================================
// Error Handling
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ============================================
// Start Server
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 HealthTrack server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

module.exports = app;
