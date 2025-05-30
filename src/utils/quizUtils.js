import questionsData from '../data/questions.json';
import scoringData from '../data/scoring.json';


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
  
  // Calculate scores for each area
  Object.entries(answers).forEach(([areaId, areaData]) => {
    if (!areaData?.answers) return;
    
    // Process each answer in the area
    Object.entries(areaData.answers).forEach(([questionId, selectedOptions]) => {
      try {
        // Get the question data - handle both q1 and 1 formats
        const normalizedQuestionId = questionId.startsWith('q') ? questionId : `q${questionId}`;
        const questionData = questionsData.questions[areaId]?.find(
          q => q.id === normalizedQuestionId || q.id === questionId
        );
        
        if (!questionData) {
          console.warn(`Question ${questionId} not found in area ${areaId}`);
          return;
        }
        
        // Initialize answer details for this question
        answerDetails[questionId] = {
          question: questionData.text,
          selectedOptions: [],
          correctOptions: [],
          isCorrect: false,
          explanation: ''
        };
        
        // Track selected and correct options
        let hasCorrect = false;
        let hasIncorrect = false;
        
        // Check each selected option
        if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
          selectedOptions.forEach(optionId => {
            const option = questionData.options.find(opt => opt.id === optionId);
            if (option) {
              answerDetails[questionId].selectedOptions.push(option.text);
              if (option.correct) {
                hasCorrect = true;
                answerDetails[questionId].correctOptions.push(option.text);
              } else {
                hasIncorrect = true;
              }
            }
          });
        }
        
        // Award point if at least one correct answer and no incorrect answers
        const questionScore = (hasCorrect && !hasIncorrect) ? 1 : 0;
        const areaNum = parseInt(areaId);
        
        // Ensure areaId is valid (1-5)
        if (areaNum >= 1 && areaNum <= 5) {
          // Initialize area score if it doesn't exist
          if (typeof areaScores[areaNum] !== 'number') {
            areaScores[areaNum] = 0;
          }
          areaScores[areaNum] += questionScore;
          totalScore += questionScore;
          
          console.log(`Area ${areaNum} score:`, areaScores[areaNum], 'for question', questionId);
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
  });
  
  // Ensure no area score exceeds the number of questions in that area
  for (let i = 1; i <= 5; i++) {
    const maxQuestions = questionsData.questions[i]?.length || 0;
    areaScores[i] = Math.min(maxQuestions, areaScores[i] || 0);
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
  // Get tips for the specific area or return default tips
  return scoringData.tipsByArea[weakestArea] || scoringData.defaultTips;
};

/**
 * Get a title based on the percentage score
 * @param {number} percentage - User's score as a percentage (0-100)
 * @returns {Object} - { title, description }
 */
export const getTitle = (percentage) => {
  // Sort titles by minScore in descending order to find the best match
  const sortedTitles = [...scoringData.titles].sort((a, b) => b.minScore - a.minScore);
  
  // Find the first title where the percentage meets or exceeds the minScore
  const result = sortedTitles.find(
    (title) => percentage >= title.minScore
  ) || { title: 'Unknown', description: 'Your results are being calculated.' };
  
  console.log('Title result for', percentage + '%:', result);
  
  return {
    title: result.title,
    description: result.description
  };
};

/**
 * Get the maximum possible score
 * @returns {number} - Maximum possible score
 */
export const getMaxScore = () => {
  return scoringData.maxScore;
};
