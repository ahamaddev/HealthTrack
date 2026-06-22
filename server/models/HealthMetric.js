const mongoose = require('mongoose');

/**
 * HealthMetric Model
 * Tracks weight and BMI over time for charting progress
 */
const healthMetricSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    weight: {
      type: Number,
      required: [true, 'Weight is required'],
      min: [1, 'Weight must be positive'],
    },
    bmi: {
      type: Number,
      required: [true, 'BMI is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('HealthMetric', healthMetricSchema);
