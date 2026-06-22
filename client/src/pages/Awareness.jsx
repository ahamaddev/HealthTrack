import { useState } from 'react';
import { FaBookMedical, FaChevronDown, FaChevronUp, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaListUl, FaShieldAlt } from 'react-icons/fa';

/**
 * Health Awareness page with expandable articles
 */
const awarenessArticles = [
  {
    id: 'obesity',
    title: 'Obesity',
    emoji: '⚖️',
    color: '#e74c3c',
    overview: 'Obesity is a complex medical condition involving an excessive amount of body fat. It increases your risk of heart disease, diabetes, high blood pressure, and other serious health issues.',
    causes: [
      'Consuming more calories than the body burns',
      'Sedentary lifestyle and lack of physical activity',
      'Genetic factors and family history',
      'Hormonal imbalances (thyroid, PCOS)',
      'Stress, poor sleep, and emotional eating',
      'Medications like steroids and antidepressants',
    ],
    symptoms: [
      'BMI of 30 or higher',
      'Excessive body fat accumulation',
      'Breathlessness during normal activities',
      'Joint pain and back pain',
      'Excessive sweating and fatigue',
      'Low self-esteem and psychological issues',
    ],
    prevention: [
      'Maintain a balanced, calorie-conscious diet',
      'Exercise regularly — at least 150 minutes per week',
      'Monitor your weight and BMI periodically',
      'Get adequate sleep (7-9 hours)',
      'Manage stress through meditation or hobbies',
      'Limit sugary drinks and processed foods',
    ],
    tips: [
      'Start with small, sustainable changes',
      'Eat slowly and mindfully',
      'Keep a food diary to track eating habits',
      'Find physical activities you enjoy',
      'Seek support from family, friends, or professionals',
    ],
  },
  {
    id: 'weakness',
    title: 'Physical Weakness',
    emoji: '💪',
    color: '#f39c12',
    overview: 'Physical weakness refers to a lack of muscle strength, making it difficult to perform normal daily activities. It can be a symptom of underlying health conditions or lifestyle factors.',
    causes: [
      'Nutritional deficiencies (iron, vitamin B12, vitamin D)',
      'Lack of regular exercise and muscle disuse',
      'Chronic dehydration',
      'Poor sleep quality and insomnia',
      'Chronic stress and mental fatigue',
      'Underlying medical conditions (anemia, thyroid issues)',
    ],
    symptoms: [
      'Difficulty lifting or carrying objects',
      'Fatigue and tiredness throughout the day',
      'Muscle cramps and body aches',
      'Slow recovery from physical activities',
      'Reduced endurance and stamina',
      'Dizziness or lightheadedness',
    ],
    prevention: [
      'Eat a protein-rich, balanced diet',
      'Exercise regularly with strength training',
      'Stay hydrated — drink at least 2-3 liters of water daily',
      'Get 7-9 hours of quality sleep',
      'Manage stress through relaxation techniques',
      'Get regular health check-ups',
    ],
    tips: [
      'Start with gentle exercises and gradually increase',
      'Include iron-rich foods like spinach and legumes',
      'Take breaks during prolonged sitting',
      'Spend time in sunlight for vitamin D',
      'Limit caffeine and alcohol consumption',
    ],
  },
  {
    id: 'dehydration',
    title: 'Dehydration',
    emoji: '💧',
    color: '#3498db',
    overview: 'Dehydration occurs when your body loses more fluids than it takes in. Even mild dehydration can affect physical and mental performance, making it crucial to stay properly hydrated.',
    causes: [
      'Not drinking enough water daily',
      'Excessive sweating from exercise or heat',
      'Diarrhea, vomiting, or fever',
      'Excessive caffeine or alcohol consumption',
      'High temperatures and humid conditions',
      'Certain medications (diuretics)',
    ],
    symptoms: [
      'Thirst and dry mouth',
      'Dark yellow urine and reduced urination',
      'Headache and dizziness',
      'Fatigue and confusion',
      'Dry skin and lips',
      'Rapid heartbeat and low blood pressure',
    ],
    prevention: [
      'Drink at least 2.5-3 liters of water daily',
      'Carry a water bottle at all times',
      'Eat water-rich fruits and vegetables',
      'Drink water before, during, and after exercise',
      'Avoid excessive caffeine and sugary beverages',
      'Monitor urine color — aim for light yellow',
    ],
    tips: [
      'Use a water tracking app to build the habit',
      'Set reminders to drink water every hour',
      'Add lemon or cucumber for flavor variety',
      'Drink a glass of water first thing in the morning',
      'Increase intake during hot weather and exercise',
    ],
  },
  {
    id: 'heat-exhaustion',
    title: 'Heat Exhaustion',
    emoji: '🌡️',
    color: '#e67e22',
    overview: 'Heat exhaustion is a heat-related illness that occurs when the body overheats due to prolonged exposure to high temperatures, especially combined with physical exertion and dehydration.',
    causes: [
      'Prolonged exposure to high temperatures',
      'Strenuous physical activity in hot weather',
      'Insufficient fluid intake during heat',
      'Wearing excessive or tight clothing',
      'Working or exercising without breaks',
      'Not acclimatized to hot conditions',
    ],
    symptoms: [
      'Heavy sweating and cold, clammy skin',
      'Nausea, vomiting, and headache',
      'Dizziness, weakness, and fatigue',
      'Rapid, weak pulse',
      'Muscle cramps',
      'Fainting or feeling faint',
    ],
    prevention: [
      'Stay hydrated in hot weather',
      'Wear lightweight, loose-fitting, light-colored clothing',
      'Avoid strenuous activity during peak heat (10 AM–4 PM)',
      'Take frequent breaks in shade or air conditioning',
      'Use sunscreen with SPF 30+',
      'Gradually acclimatize to hot environments',
    ],
    tips: [
      'If symptoms occur, move to a cool place immediately',
      'Apply cool, wet cloths to the body',
      'Sip water slowly — avoid gulping',
      'Fan the body to promote evaporation',
      'Seek medical attention if symptoms persist',
    ],
  },
  {
    id: 'sunstroke',
    title: 'Sunstroke (Heatstroke)',
    emoji: '☀️',
    color: '#c0392b',
    overview: 'Sunstroke (heatstroke) is the most severe form of heat-related illness. It occurs when the body\'s temperature regulation fails, causing core temperature to rise above 40°C (104°F). It is a medical emergency.',
    causes: [
      'Prolonged exposure to extreme heat and sun',
      'Untreated heat exhaustion progression',
      'Intense physical exertion in high temperatures',
      'Dehydration combined with heat exposure',
      'Certain medications affecting thermoregulation',
      'Being in a parked car in the sun',
    ],
    symptoms: [
      'Core body temperature above 40°C (104°F)',
      'Hot, dry, red skin (sweating may stop)',
      'Severe headache and confusion',
      'Rapid, strong pulse',
      'Loss of consciousness or seizures',
      'Nausea, vomiting, and organ damage risk',
    ],
    prevention: [
      'Stay hydrated — drink water consistently',
      'Avoid prolonged direct sun exposure',
      'Wear hats, sunglasses, and sunscreen',
      'Take cool showers on very hot days',
      'Monitor vulnerable people (elderly, children)',
      'Never leave anyone in a parked car',
    ],
    tips: [
      'Call emergency services immediately if suspected',
      'Move the person to a cool area at once',
      'Cool the body with ice packs, cold water immersion',
      'Do NOT give fluids if the person is unconscious',
      'This is a life-threatening emergency — act fast',
    ],
  },
];

const Awareness = () => {
  const [openArticle, setOpenArticle] = useState(null);

  const toggleArticle = (id) => {
    setOpenArticle(openArticle === id ? null : id);
  };

  return (
    <div className="page-container py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5 fade-in">
          <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill mb-3">
            <FaBookMedical className="me-1" /> Health Education
          </span>
          <h1 className="display-5 fw-bold">Health Awareness</h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '650px' }}>
            Learn about common physical health issues, their causes, symptoms, and how to prevent them for a healthier, safer life.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="alert alert-info border-0 rounded-4 mb-4 d-flex align-items-center fade-in">
          <FaInfoCircle className="me-3 flex-shrink-0" size={20} />
          <span>
            <strong>Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. Always consult a healthcare provider for medical concerns.
          </span>
        </div>

        {/* Articles Accordion */}
        <div className="awareness-articles">
          {awarenessArticles.map((article, index) => (
            <div
              key={article.id}
              className="card border-0 shadow-sm rounded-4 mb-3 overflow-hidden fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Article Header */}
              <button
                className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center w-100"
                onClick={() => toggleArticle(article.id)}
                style={{ cursor: 'pointer', border: 'none' }}
                aria-expanded={openArticle === article.id}
                id={`awareness-${article.id}-toggle`}
              >
                <div className="d-flex align-items-center">
                  <span className="fs-3 me-3">{article.emoji}</span>
                  <h4 className="mb-0 fw-semibold">{article.title}</h4>
                </div>
                {openArticle === article.id ? (
                  <FaChevronUp className="text-muted" />
                ) : (
                  <FaChevronDown className="text-muted" />
                )}
              </button>

              {/* Article Content */}
              {openArticle === article.id && (
                <div className="card-body px-4 pb-4 pt-0 fade-in">
                  {/* Overview */}
                  <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: `${article.color}08` }}>
                    <h5 className="fw-semibold mb-2">
                      <FaInfoCircle className="me-2" style={{ color: article.color }} />
                      Overview
                    </h5>
                    <p className="text-muted mb-0">{article.overview}</p>
                  </div>

                  <div className="row g-4">
                    {/* Causes */}
                    <div className="col-md-6">
                      <h5 className="fw-semibold mb-3">
                        <FaExclamationTriangle className="me-2 text-warning" />
                        Causes
                      </h5>
                      <ul className="list-unstyled">
                        {article.causes.map((cause, i) => (
                          <li key={i} className="d-flex align-items-start mb-2">
                            <span className="text-warning me-2 mt-1">•</span>
                            <span className="text-muted">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Symptoms */}
                    <div className="col-md-6">
                      <h5 className="fw-semibold mb-3">
                        <FaListUl className="me-2 text-danger" />
                        Symptoms
                      </h5>
                      <ul className="list-unstyled">
                        {article.symptoms.map((symptom, i) => (
                          <li key={i} className="d-flex align-items-start mb-2">
                            <span className="text-danger me-2 mt-1">•</span>
                            <span className="text-muted">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prevention */}
                    <div className="col-md-6">
                      <h5 className="fw-semibold mb-3">
                        <FaShieldAlt className="me-2 text-success" />
                        Prevention
                      </h5>
                      <ul className="list-unstyled">
                        {article.prevention.map((prev, i) => (
                          <li key={i} className="d-flex align-items-start mb-2">
                            <FaCheckCircle className="text-success me-2 mt-1 flex-shrink-0" size={14} />
                            <span className="text-muted">{prev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div className="col-md-6">
                      <h5 className="fw-semibold mb-3">
                        💡 Healthy Lifestyle Tips
                      </h5>
                      <ul className="list-unstyled">
                        {article.tips.map((tip, i) => (
                          <li key={i} className="d-flex align-items-start mb-2">
                            <span className="text-primary me-2 mt-1">→</span>
                            <span className="text-muted">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awareness;
