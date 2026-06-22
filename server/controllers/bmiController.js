const { validationResult, body } = require('express-validator');
const BMI = require('../models/BMI');
const HealthMetric = require('../models/HealthMetric');

/**
 * Determine BMI category based on value
 */
const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

/**
 * Validation rules for BMI save
 */
const bmiValidation = [
  body('height')
    .isFloat({ min: 1 })
    .withMessage('Height must be a positive number (in cm)'),
  body('weight')
    .isFloat({ min: 1 })
    .withMessage('Weight must be a positive number (in kg)'),
];

/**
 * @desc    Calculate and save BMI
 * @route   POST /api/bmi/save
 * @access  Private
 */
const saveBMI = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { height, weight } = req.body;

    // Calculate BMI: weight(kg) / height(m)²
    const heightInMeters = height / 100;
    const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
    const category = getBMICategory(bmi);

    // Save BMI record
    const bmiRecord = await BMI.create({
      userId: req.user._id,
      height,
      weight,
      bmi,
      category,
    });

    // Also save to HealthMetric for tracking history
    await HealthMetric.create({
      userId: req.user._id,
      weight,
      bmi,
    });

    res.status(201).json({
      success: true,
      message: 'BMI saved successfully',
      data: bmiRecord,
    });
  } catch (error) {
    console.error('Save BMI error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error saving BMI',
    });
  }
};

/**
 * @desc    Get user's BMI history
 * @route   GET /api/bmi/history
 * @access  Private
 */
const getBMIHistory = async (req, res) => {
  try {
    const history = await BMI.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error('Get BMI history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching BMI history',
    });
  }
};

module.exports = { saveBMI, getBMIHistory, bmiValidation };
