const BMI = require('../models/BMI');

/**
 * Fitness recommendations based on BMI category
 */
const fitnessRecommendations = {
  Underweight: [
    {
      title: 'Strength Training',
      description: 'Focus on compound exercises like squats, deadlifts, and bench press to build muscle mass.',
      icon: 'dumbbell',
      difficulty: 'Moderate',
    },
    {
      title: 'Resistance Exercises',
      description: 'Use resistance bands or weights to progressively overload your muscles.',
      icon: 'band',
      difficulty: 'Beginner',
    },
    {
      title: 'High-Calorie Muscle Gain Workouts',
      description: 'Combine weight training with proper calorie surplus for healthy weight gain.',
      icon: 'fire',
      difficulty: 'Advanced',
    },
    {
      title: 'Yoga & Flexibility',
      description: 'Improve flexibility and body awareness with regular yoga sessions.',
      icon: 'yoga',
      difficulty: 'Beginner',
    },
  ],
  Normal: [
    {
      title: 'Walking',
      description: 'Maintain your fitness with 30 minutes of brisk walking daily.',
      icon: 'walking',
      difficulty: 'Beginner',
    },
    {
      title: 'Jogging',
      description: 'Light to moderate jogging 3-4 times per week to maintain cardiovascular health.',
      icon: 'running',
      difficulty: 'Moderate',
    },
    {
      title: 'Cycling',
      description: 'Enjoy cycling for cardio fitness and leg strength.',
      icon: 'cycling',
      difficulty: 'Moderate',
    },
    {
      title: 'Stretching',
      description: 'Daily stretching routine to maintain flexibility and prevent injury.',
      icon: 'stretch',
      difficulty: 'Beginner',
    },
  ],
  Overweight: [
    {
      title: 'Brisk Walking',
      description: 'Start with 45-minute brisk walks daily to burn calories safely.',
      icon: 'walking',
      difficulty: 'Beginner',
    },
    {
      title: 'Cardio Workouts',
      description: 'Low-impact cardio like elliptical, stair climbing, or dance workouts.',
      icon: 'heart',
      difficulty: 'Moderate',
    },
    {
      title: 'Swimming',
      description: 'Full-body workout that is gentle on joints while burning significant calories.',
      icon: 'swimming',
      difficulty: 'Moderate',
    },
    {
      title: 'Fat-Loss Workouts',
      description: 'HIIT circuits and metabolic conditioning for maximum calorie burn.',
      icon: 'fire',
      difficulty: 'Advanced',
    },
  ],
  Obese: [
    {
      title: 'Brisk Walking',
      description: 'Begin with 20-30 minute walks and gradually increase duration.',
      icon: 'walking',
      difficulty: 'Beginner',
    },
    {
      title: 'Cardio Workouts',
      description: 'Low-impact cardio like elliptical or stationary cycling.',
      icon: 'heart',
      difficulty: 'Moderate',
    },
    {
      title: 'Swimming',
      description: 'Excellent low-impact exercise for all fitness levels.',
      icon: 'swimming',
      difficulty: 'Moderate',
    },
    {
      title: 'Fat-Loss Workouts',
      description: 'Structured workout plans focusing on sustainable fat loss.',
      icon: 'fire',
      difficulty: 'Advanced',
    },
  ],
};

/**
 * Nutrition recommendations based on BMI category
 */
const nutritionRecommendations = {
  Underweight: [
    {
      title: 'Protein Rich Foods',
      description: 'Chicken, fish, tofu, legumes, and lean meats for muscle building.',
      icon: 'meat',
      category: 'Protein',
    },
    {
      title: 'Dairy & Milk Products',
      description: 'Full-fat milk, cheese, yogurt for healthy calories and calcium.',
      icon: 'milk',
      category: 'Dairy',
    },
    {
      title: 'Eggs & Nuts',
      description: 'Eggs, almonds, walnuts, and peanut butter for healthy fats.',
      icon: 'egg',
      category: 'Protein',
    },
    {
      title: 'Healthy Calorie Surplus',
      description: 'Eat 300-500 calories above maintenance with whole foods.',
      icon: 'calories',
      category: 'Diet Plan',
    },
  ],
  Normal: [
    {
      title: 'Balanced Meals',
      description: 'Maintain a well-proportioned diet with all macronutrients.',
      icon: 'balanced',
      category: 'Diet Plan',
    },
    {
      title: 'Fresh Fruits',
      description: 'Apples, bananas, berries, and seasonal fruits for vitamins.',
      icon: 'fruit',
      category: 'Vitamins',
    },
    {
      title: 'Vegetables',
      description: 'Leafy greens, broccoli, carrots, and colorful vegetables.',
      icon: 'vegetable',
      category: 'Fiber',
    },
    {
      title: 'Whole Grains',
      description: 'Brown rice, oats, whole wheat bread for sustained energy.',
      icon: 'grain',
      category: 'Carbs',
    },
  ],
  Overweight: [
    {
      title: 'High Fiber Foods',
      description: 'Oats, beans, lentils, and vegetables for satiety.',
      icon: 'fiber',
      category: 'Fiber',
    },
    {
      title: 'Salads & Greens',
      description: 'Large salads with lean protein and light dressing.',
      icon: 'salad',
      category: 'Vegetables',
    },
    {
      title: 'Reduce Sugar',
      description: 'Cut out added sugars, sugary drinks, and processed sweets.',
      icon: 'nosugar',
      category: 'Lifestyle',
    },
    {
      title: 'Moderate Calorie Deficit',
      description: 'Eat 300-500 calories below maintenance for safe weight loss.',
      icon: 'calories',
      category: 'Diet Plan',
    },
  ],
  Obese: [
    {
      title: 'High Fiber Foods',
      description: 'Oats, beans, lentils, and vegetables for satiety and digestion.',
      icon: 'fiber',
      category: 'Fiber',
    },
    {
      title: 'Salads & Greens',
      description: 'Prioritize vegetables and lean proteins in every meal.',
      icon: 'salad',
      category: 'Vegetables',
    },
    {
      title: 'Reduce Sugar & Processed Foods',
      description: 'Eliminate sugary drinks, fast food, and processed snacks.',
      icon: 'nosugar',
      category: 'Lifestyle',
    },
    {
      title: 'Structured Calorie Deficit',
      description: 'Work with a plan to safely reduce calorie intake.',
      icon: 'calories',
      category: 'Diet Plan',
    },
  ],
};

/**
 * @desc    Get personalized recommendations based on latest BMI
 * @route   GET /api/recommendations
 * @access  Private
 */
const getRecommendations = async (req, res) => {
  try {
    const latestBMI = await BMI.findOne({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    if (!latestBMI) {
      return res.json({
        success: true,
        data: {
          fitness: fitnessRecommendations['Normal'],
          nutrition: nutritionRecommendations['Normal'],
          category: null,
          message: 'No BMI recorded yet. Showing default recommendations. Calculate your BMI for personalized suggestions.',
        },
      });
    }

    const category = latestBMI.category;

    res.json({
      success: true,
      data: {
        fitness: fitnessRecommendations[category] || fitnessRecommendations['Normal'],
        nutrition: nutritionRecommendations[category] || nutritionRecommendations['Normal'],
        category,
        bmi: latestBMI.bmi,
      },
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching recommendations',
    });
  }
};

module.exports = { getRecommendations };
