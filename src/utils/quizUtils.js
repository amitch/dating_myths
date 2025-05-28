import questionsData from '../data/questions.json';

/**
 * Calculate scores based on user answers
 * @param {Object} answers - User's answers from QuizContext
 * @returns {Object} - { totalScore, areaScores, answerDetails }
 */
export const calculateScores = (answers) => {
  const areaScores = {};
  const answerDetails = {};
  let totalScore = 0;
  
  // Initialize area scores with 0
  for (let i = 1; i <= 5; i++) {
    areaScores[i] = 0;
  }
  
  // If no answers, return zeros
  if (!answers || Object.keys(answers).length === 0) {
    return { totalScore: 0, areaScores, answerDetails };
  }
  
  // Calculate scores for each answer
  Object.entries(answers).forEach(([questionId, selectedOptions]) => {
    try {
      // Extract area ID from question ID (format: 'q1', 'q2', etc.)
      const areaId = parseInt(questionId.match(/q(\d+)/)[1]);
      const questionNum = questionId.replace(/[^0-9]/g, '');
      const questionKey = questionId.replace(/[^a-z0-9]/gi, '');
      
      // Get the question data
      const questionData = questionsData.questions[areaId]?.find(
        q => q.id === questionKey
      );
      
      if (!questionData) return;
      
      // Initialize answer details for this question
      answerDetails[questionId] = {
        question: questionData.text,
        selectedOptions: [],
        correctOptions: [],
        isCorrect: false,
        explanation: ''
      };
      
      // Track if any correct answer was selected
      let hasCorrectAnswer = false;
      let hasIncorrectAnswer = false;
      
      // Check each selected option
      if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
        selectedOptions.forEach(optionId => {
          const option = questionData.options.find(opt => opt.id === optionId);
          if (option) {
            answerDetails[questionId].selectedOptions.push(option.text);
            if (option.correct) {
              hasCorrectAnswer = true;
              answerDetails[questionId].correctOptions.push(option.text);
            } else {
              hasIncorrectAnswer = true;
            }
          }
        });
      }
      
      // Determine if the answer is correct
      // For multiple select, any correct answer gives a point, but incorrect answers don't subtract
      const questionScore = hasCorrectAnswer && !hasIncorrectAnswer ? 1 : 0;
      
      // Ensure areaId is valid (1-5)
      if (areaId >= 1 && areaId <= 5) {
        areaScores[areaId] = (areaScores[areaId] || 0) + questionScore;
        totalScore += questionScore;
      }
      
      // Update answer details
      answerDetails[questionId].isCorrect = questionScore === 1;
      answerDetails[questionId].explanation = questionScore === 1 
        ? 'Great job! Your selections align with healthy dating perspectives.'
        : 'Consider reviewing these concepts for better understanding.';
      
    } catch (error) {
      console.warn(`Error processing question ${questionId}:`, error);
    }
  });
  
  // Ensure no area score exceeds 3 (max 3 questions per area)
  for (let i = 1; i <= 5; i++) {
    areaScores[i] = Math.min(3, areaScores[i] || 0);
  }
  
  return { 
    totalScore: Math.min(15, totalScore), // Max 15 questions total
    areaScores,
    answerDetails
  };
};

/**
 * Identify strongest and weakest areas
 * @param {Object} areaScores - Scores for each area
 * @returns {Object} - { strongestArea, weakestArea }
 */
export const getStrongestWeakestAreas = (areaScores) => {
  let strongestArea = 1;
  let weakestArea = 1;
  
  Object.entries(areaScores).forEach(([areaId, score]) => {
    const areaNum = parseInt(areaId);
    
    if (score > areaScores[strongestArea]) {
      strongestArea = areaNum;
    }
    
    if (score < areaScores[weakestArea] || 
        (score === areaScores[weakestArea] && areaNum === 1)) {
      // Prioritize First Impressions (area 1) in case of tie
      weakestArea = areaNum;
    }
  });
  
  return { strongestArea, weakestArea };
};

/**
 * Get personalized tips based on weakest area
 * @param {number} weakestArea - ID of the weakest area
 * @returns {string[]} - Array of tips
 */
export const getTips = (weakestArea) => {
  const tipsByArea = {
    1: [
      "Try to be more open to different types of people. Opposites can complement each other!",
      "Don't put too much pressure on first impressions. Give people a chance to show their true selves.",
      "Consider that there might be many potential matches, not just one 'perfect' person."
    ],
    2: [
      "Try updating your profile with recent photos that show your personality.",
      "Be proactive in starting conversations with your matches.",
      "Consider being more selective with your right swipes to increase match quality."
    ],
    3: [
      "Be open about your expectations early in the relationship.",
      "Remember that relationships require work from both partners.",
      "Consider that love languages might differ between partners."
    ],
    4: [
      "Practice active listening in your conversations.",
      "Try to express your needs clearly and calmly.",
      "Remember that it's okay to take time to process your thoughts before responding."
    ],
    5: [
      "Be open about your long-term goals early in the relationship.",
      "Remember that commitment levels can grow over time.",
      "Consider what you truly want from a long-term partnership."
    ]
  };
  
  return tipsByArea[weakestArea] || [
    "Be yourself and have fun getting to know new people!",
    "Remember that every relationship is a learning experience.",
    "Stay open to new experiences and perspectives."
  ];
};

/**
 * Get a title based on the total score
 * @param {number} totalScore - User's total score
 * @returns {string} - Title
 */
export const getTitle = (totalScore) => {
  if (totalScore >= 13) return "Dating Guru";
  if (totalScore >= 10) return "Romantic Expert";
  if (totalScore >= 7) return "Hopeful Romantic";
  if (totalScore >= 4) return "Casual Dater";
  return "Dating Newbie";
};
