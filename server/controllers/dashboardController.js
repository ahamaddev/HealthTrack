const BMI = require('../models/BMI');
const WaterLog = require('../models/WaterLog');
const HealthMetric = require('../models/HealthMetric');

/**
 * @desc    Get dashboard data (latest BMI, water, charts data)
 * @route   GET /api/dashboard
 * @access  Private
 */
const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get latest BMI record
    const latestBMI = await BMI.findOne({ userId }).sort({ createdAt: -1 });

    // Get today's water intake
    const today = new Date().toISOString().split('T')[0];
    const todayWater = await WaterLog.findOne({ userId, date: today });

    // Get weight/BMI history for line charts (last 30 records)
    const healthHistory = await HealthMetric.find({ userId })
      .sort({ createdAt: -1 })
      .limit(30);

    // Get water intake history for bar chart (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

    const waterHistory = await WaterLog.find({
      userId,
      date: { $gte: sevenDaysAgoStr },
    }).sort({ date: 1 });

    // Fill in missing days with 0
    const waterChartData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const log = waterHistory.find((w) => w.date === dateStr);
      waterChartData.push({
        date: dateStr,
        amount: log ? log.amount : 0,
      });
    }

    res.json({
      success: true,
      data: {
        latestBMI: latestBMI
          ? {
              bmi: latestBMI.bmi,
              category: latestBMI.category,
              weight: latestBMI.weight,
              height: latestBMI.height,
              date: latestBMI.createdAt,
            }
          : null,
        todayWater: {
          totalIntake: todayWater ? todayWater.amount : 0,
          target: 3000,
          percentage: todayWater
            ? Math.min(
                parseFloat(((todayWater.amount / 3000) * 100).toFixed(1)),
                100
              )
            : 0,
        },
        healthHistory: healthHistory.reverse().map((h) => ({
          weight: h.weight,
          bmi: h.bmi,
          date: h.createdAt,
        })),
        waterChartData,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard data',
    });
  }
};

module.exports = { getDashboard };
