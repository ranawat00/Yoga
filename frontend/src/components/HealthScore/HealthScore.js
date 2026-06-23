import React, { useState } from 'react';
import './HealthScore.css';
import healthIllustration from '../../assets/health_score_illustration.png';
import { useApp } from '../../context/AppContext';

const QUIZ_QUESTIONS = [
  {
    question: "How many hours of deep sleep do you get daily?",
    options: [
      { text: "Less than 6 hours", score: 4 },
      { text: "6 to 8 hours", score: 9 },
      { text: "More than 8 hours of restful sleep", score: 12.5 }
    ]
  },
  {
    question: "How much water and natural liquids do you drink daily?",
    options: [
      { text: "Under 1.5 liters", score: 4 },
      { text: "1.5 to 2.5 liters", score: 9 },
      { text: "Above 2.5 liters (including coconut water/juices)", score: 12.5 }
    ]
  },
  {
    question: "How often do you exercise or practice yoga/pranayama?",
    options: [
      { text: "Rarely or never", score: 3 },
      { text: "2 to 3 times a week", score: 8 },
      { text: "Daily or almost daily", score: 12.5 }
    ]
  },
  {
    question: "What does your typical daily diet consist of?",
    options: [
      { text: "Mostly processed, packaged, or fast foods", score: 3 },
      { text: "Mixed home-cooked grains and cooked vegetables", score: 8 },
      { text: "High-alkaline raw fruits, green vegetables & sprouts", score: 12.5 }
    ]
  },
  {
    question: "How are your energy levels throughout the day?",
    options: [
      { text: "Frequently tired, sluggish, or need caffeine/tea", score: 4 },
      { text: "Moderate energy, feel a bit tired in the afternoon", score: 8 },
      { text: "Highly energetic and alert from morning to night", score: 12.5 }
    ]
  },
  {
    question: "How often do you experience stress, anxiety, or mental fatigue?",
    options: [
      { text: "Almost daily or feel constantly overwhelmed", score: 3 },
      { text: "Occasionally, depending on work and routine", score: 8 },
      { text: "Rarely, feel mostly calm, centered, and peaceful", score: 12.5 }
    ]
  },
  {
    question: "How is your digestion and gut health?",
    options: [
      { text: "Irregular, prone to bloating, acidity, or constipation", score: 3 },
      { text: "Average digestion, occasional issues", score: 8 },
      { text: "Excellent digestion, feel light after meals, regular elimination", score: 12.5 }
    ]
  },
  {
    question: "How much direct sunlight exposure do you get daily?",
    options: [
      { text: "None or very little (mostly indoors)", score: 4 },
      { text: "15 to 30 minutes in the morning or evening", score: 9 },
      { text: "More than 30 minutes of natural outdoor sunlight", score: 12.5 }
    ]
  }
];

export default function HealthScore({ isStandalone = false }) {
  const { addNotification, setView } = useApp();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setIsQuizOpen(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const handleCloseQuiz = () => {
    setIsQuizOpen(false);
  };

  const handleOptionSelect = (optionScore) => {
    const newAnswers = [...answers, optionScore];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      const total = newAnswers.reduce((sum, val) => sum + val, 0);
      const roundedScore = Math.min(100, Math.round(total));
      setScore(roundedScore);
      setShowResult(true);
      addNotification("Health check completed! Your score is ready.", "success");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const newAnswers = answers.slice(0, -1);
      setAnswers(newAnswers);
    }
  };

  const handleScrollToWorkshops = () => {
    setIsQuizOpen(false);
    setView('home');
    setTimeout(() => {
      const element = document.getElementById('workshops');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const getResultFeedback = (scoreVal) => {
    if (scoreVal >= 80) {
      return {
        title: "Excellent Vitality",
        class: "vitality-excellent",
        desc: "Fantastic job! Your body and lifestyle are in a state of high vitality and natural harmony. You maintain excellent habits. Keep practicing daily yoga, eating fresh alkaline foods, and enjoying direct sunlight to sustain this peak state of health."
      };
    } else if (scoreVal >= 50) {
      return {
        title: "Good Vitality",
        class: "vitality-good",
        desc: "You are on a very good track, but there is room to unlock even greater energy. Focus on small shifts: drink fresh ash gourd or green juice on an empty stomach, avoid sleeping late, and try to incorporate more raw, enzyme-rich sprouts into your diet."
      };
    } else {
      return {
        title: "Needs Attention",
        class: "vitality-attention",
        desc: "Your body is showing signs of high acidity, accumulated toxins, or low energy. This is a gentle wake-up call to prioritize your well-being. We highly recommend joining our upcoming 21-Day Detox Workshop, replacing processed food with whole plant foods, and drinking more natural liquids."
      };
    }
  };

  const resultFeedback = getResultFeedback(score);

  return (
    <div className={isStandalone ? "health-score-page" : ""}>
      {isStandalone && (
        <div className="health-score-page-header">
          <div className="health-score-page-header-container">
            <button className="back-btn" onClick={() => {
              setView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Home
            </button>
            <h1>Calculate Your Health Score</h1>
            <p>Understand your body's vital metrics and discover the roadmap to drug-free natural wellness.</p>
          </div>
        </div>
      )}
      <section id="health-score" className="health-score-section">
      <div className="health-score-container">
        
        {/* Left Column: Heading & Description */}
        <div className="health-score-left">
          <h2 className="health-score-title">Check Your Health Score</h2>
          <p className="health-score-desc">
            Take this simple 8-step health check – it takes just 2 minutes! By the end, you'll gain a clear understanding of your health status without any need for tests or scans.
          </p>
          
          {/* Curvy pointing arrow */}
          <div className="health-score-arrow-wrapper">
            <svg width="120" height="70" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15,10 C45,28 65,58 105,42" stroke="#B08272" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5,5" />
              <path d="M92,35 L106,42 L97,54" stroke="#B08272" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* Right Column: Premium Card */}
        <div className="health-score-right">
          <div className="health-score-card">
            
            {/* Illustration */}
            <div className="card-image-container">
              <img src={healthIllustration} alt="Health Activities Illustration" className="card-image" />
            </div>

            {/* Sub-text */}
            <h3 className="card-title">
              Ready to take the test and discover your current health score?
            </h3>

            {/* Info Metrics Container */}
            <div className="card-info-box">
              <div className="info-item">
                <span className="info-num">8</span>
                <span className="info-label">Questions</span>
              </div>
              <div className="info-divider"></div>
              <div className="info-item">
                <span className="info-num">5</span>
                <span className="info-label">Minutes</span>
              </div>
            </div>

            {/* Start Button */}
            <button className="card-btn" onClick={handleStartQuiz}>
              Let's Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Animated Wavy Hill Background */}
      <div className="health-score-bottom-wave">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="wave-svg-container">
          <path className="wave-bg-path wave-back" d="M0,60 C120,100 240,100 360,60 C480,20 600,20 720,60 C840,100 960,100 1080,60 C1200,20 1320,20 1440,60 L1440,160 L0,160 Z" fill="#b5cc9b" opacity="0.55" />
          <path className="wave-bg-path wave-front" d="M0,80 C120,120 240,120 360,80 C480,40 600,40 720,80 C840,120 960,120 1080,80 C1200,40 1320,40 1440,80 L1440,160 L0,160 Z" fill="#c4dbb3" />
        </svg>
      </div>

      {/* Interactive Quiz Modal Overlay */}
      {isQuizOpen && (
        <div className="quiz-modal-overlay" onClick={handleCloseQuiz}>
          <div className="quiz-modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Close button */}
            <button className="quiz-close-btn" onClick={handleCloseQuiz} aria-label="Close Quiz">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {!showResult ? (
              // Quiz Step View
              <div className="quiz-step-view">
                
                {/* Progress bar */}
                <div className="quiz-progress-bg">
                  <div 
                    className="quiz-progress-fill" 
                    style={{ width: `${((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>

                <span className="quiz-step-indicator">
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>

                <h3 className="quiz-question-text">
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </h3>

                <div className="quiz-options-container">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => (
                    <button 
                      key={idx} 
                      className="quiz-option-btn"
                      onClick={() => handleOptionSelect(opt.score)}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {currentQuestionIndex > 0 && (
                  <button className="quiz-back-btn" onClick={handleBack}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to previous question
                  </button>
                )}
              </div>
            ) : (
              // Result View
              <div className="quiz-result-view">
                <h3 className="result-main-heading">Your Health Score</h3>
                
                {/* Circular Score display */}
                <div className="result-score-circle-container">
                  <svg className="result-score-svg" viewBox="0 0 120 120">
                    <circle 
                      className="score-circle-bg" 
                      cx="60" 
                      cy="60" 
                      r="52" 
                      strokeWidth="8"
                    />
                    <circle 
                      className={`score-circle-fill ${resultFeedback.class}`}
                      cx="60" 
                      cy="60" 
                      r="52" 
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 52}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - score / 100)}
                    />
                  </svg>
                  <div className="result-score-text">
                    <span className="score-number">{score}</span>
                    <span className="score-max">/ 100</span>
                  </div>
                </div>

                <div className={`result-vitality-badge ${resultFeedback.class}`}>
                  {resultFeedback.title}
                </div>

                <p className="result-description">
                  {resultFeedback.desc}
                </p>

                <div className="result-actions">
                  <button className="btn btn-outline" onClick={handleStartQuiz} style={{ flex: 1, padding: '0.9rem' }}>
                    Retake Test
                  </button>
                  <button className="btn btn-green" onClick={handleScrollToWorkshops} style={{ flex: 1.3, padding: '0.9rem' }}>
                    Explore Workshops
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  </div>
);
}
