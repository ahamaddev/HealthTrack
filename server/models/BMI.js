const mongoose = require('mongoose');

/**
 * BMI Model
 * Stores individual BMI calculations linked to a user
 */
const bmiSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    height: {
      type: Number,
      required: [true, 'Height is required'],
      min: [1, 'Height must be positive'],
    },
    weight: {
      type: Number,
      required: [true, 'Weight is required'],
      min: [1, 'Weight must be positive'],
    },
    bmi: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Underweight', 'Normal', 'Overweight', 'Obese'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('BMI', bmiSchema);
