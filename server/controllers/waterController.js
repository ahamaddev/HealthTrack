const { validationResult, body } = require('express-validator');
const WaterLog = require('../models/WaterLog');

/**
 * Get today's date as YYYY-MM-DD string
 */
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Validation rules for adding water
 */
const waterValidation = [
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Water amount must be a positive number (in ml)'),
];

/**
 * @desc    Add water intake for today
 * @route   POST /api/water/add
 * @access  Private
 */
const addWater = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { amount } = req.body;
    const today = getTodayDate();

    // Upsert: create or increment today's water log
    const waterLog = await WaterLog.findOneAndUpdate(
      { userId: req.user._id, date: today },
      { $inc: { amount: amount } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const target = 3000; // Daily target in ml
    const percentage = Math.min(
      parseFloat(((waterLog.amount / target) * 100).toFixed(1)),
      100
    );

    res.json({
      success: true,
      message: `Added ${amount}ml of water`,
      data: {
        totalIntake: waterLog.amount,
        target,
        remaining: Math.max(target - waterLog.amount, 0),
        percentage,
        date: today,
      },
    });
  } catch (error) {
    console.error('Add water error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding water intake',
    });
  }
};

/**
 * @desc    Get today's water intake
 * @route   GET /api/water/today
 * @access  Private
 */
const getTodayWater = async (req, res) => {
  try {
    const today = getTodayDate();

    const waterLog = await WaterLog.findOne({
      userId: req.user._id,
      date: today,
    });

    const totalIntake = waterLog ? waterLog.amount : 0;
    const target = 3000;
    const percentage = Math.min(
      parseFloat(((totalIntake / target) * 100).toFixed(1)),
      100
    );

    res.json({
      success: true,
      data: {
        totalIntake,
        target,
        remaining: Math.max(target - totalIntake, 0),
        percentage,
        date: today,
      },
    });
  } catch (error) {
    console.error('Get today water error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching water intake',
    });
  }
};

module.exports = { addWater, getTodayWater, waterValidation };
