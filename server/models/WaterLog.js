const mongoose = require('mongoose');

/**
 * WaterLog Model
 * Stores daily water intake amounts per user
 * One document per user per day (upserted on add)
 */
const waterLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Water amount is required'],
      min: [0, 'Amount cannot be negative'],
      default: 0,
    },
    date: {
      type: String, // YYYY-MM-DD format for easy daily grouping
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient user+date queries
waterLogSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('WaterLog', waterLogSchema);
