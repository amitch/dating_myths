import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { Button, Checkbox, ProgressBar } from '../components/ui';
import Layout from '../components/layout/Layout';
import questionsData from '../data/questions.json';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { logEvent, EVENT_TYPES } from '../utils/logger';
import heartIcon from '../assets/love_heart_icon_gemini.png';

// Get area names from questions data
const areaNames = questionsData.areas || {};
const TOTAL_AREAS = Object.keys(areaNames).length; // Dynamic total number of areas

// Styled Components
const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.paleVioletRed};
  margin: 1rem 0;
  font-size: 0.9rem;
  text-align: center;
`;

const QuestionCounter = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const QuestionCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 480px) {
    padding: 1.25rem;
    margin-bottom: 1.25rem;
    border-radius: 10px;
  }
`;

const QuestionText = styled.h2`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  margin-bottom: 1.5rem;
  font-size: 1.35rem;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background-image: url(${heartIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    flex-shrink: 0;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1.25rem;
    
    &::before {
      width: 20px;
      height: 20px;
    }
  }
`;

const QuestionDescription = styled.div`
  display: none; // Hide the description text as requested
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const OptionButton = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lavenderBlush};
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.lavenderBlush};
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  ${({ selected, theme }) =>
    selected &&
    `
      background-color: ${theme.colors.lavenderBlush};
      border-color: ${theme.colors.paleVioletRed};
      font-weight: 500;
    `}
    
  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.95rem;
    border-radius: 6px;
  }
`;

function QuizPage() {
  const { areaId } = useParams();
  useDocumentTitle(areaNames[areaId] || 'Quiz');
  
  const navigate = useNavigate();
  const { saveAnswers, completeQuiz } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Get questions and area name for the current area
  const { questions } = questionsData;
  const areaQuestions = questions?.[areaId] || [];
  const areaName = areaNames[areaId] 
    ? `${areaId}. ${areaNames[areaId]} (${areaId} of ${TOTAL_AREAS})` 
    : `Area ${areaId} (${areaId} of ${TOTAL_AREAS})`;
  const location = useLocation();
  
  // Log page view and validate questions
  useEffect(() => {
    logEvent(EVENT_TYPES.PAGE_VIEW, {
      page: `Quiz Area ${areaId}`,
      path: location.pathname,
      areaName: areaNames[areaId],
      questionCount: areaQuestions.length,
    });
    
    if (areaQuestions.length > 0) {
      setIsLoading(false);
      setError('');
    } else {
      setError('No questions found for this area. Please try again.');
      setIsLoading(false);
      
      logEvent('QUIZ_ERROR', {
        error: 'No questions found',
        areaId,
        path: location.pathname,
      });
    }
  }, [areaId, areaQuestions]);

  const handleOptionSelect = async (question, optionId) => {
    setSelectedOptions(prev => {
      const currentSelections = prev[question.id] || [];
      let newSelections;
      
      // Toggle the clicked option
      if (currentSelections.includes(optionId)) {
        newSelections = currentSelections.filter(id => id !== optionId);
      } else {
        newSelections = [...currentSelections, optionId];
      }
      
      return {
        ...prev,
        [question.id]: newSelections
      };
    });
    
    // Log the answer
    await logEvent(EVENT_TYPES.QUESTION_ANSWERED, {
      areaId,
      questionId: question.id,
      questionText: question.text,
      selectedOption: optionId,
      isCorrect: question.options.find(opt => opt.id === optionId)?.correct || false,
      timestamp: new Date().toISOString(),
    });
    
    // Clear any previous errors when user makes a selection
    setError('');
  };

  const handleNext = async () => {
    // Validate all questions are answered
    const unansweredQuestions = areaQuestions.filter(
      q => !selectedOptions[q.id] || selectedOptions[q.id].length === 0
    );
    
    if (unansweredQuestions.length > 0) {
      setError('Please answer all questions before continuing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Log validation error
      await logEvent('QUIZ_VALIDATION_ERROR', {
        areaId,
        unansweredQuestions: unansweredQuestions.map(q => q.id),
        error: 'Unanswered questions',
        timestamp: new Date().toISOString(),
      });
      
      return;
    }
    
    // Calculate score for this area
    const score = calculateAreaScore(areaQuestions, selectedOptions);
    
    // Log area completion
    await logEvent('QUIZ_AREA_COMPLETED', {
      areaId,
      areaName: areaNames[areaId],
      score,
      maxPossibleScore: areaQuestions.length,
      timestamp: new Date().toISOString(),
    });
    
    setError('');
    saveAnswers(areaId, selectedOptions, score);
    
    const nextArea = parseInt(areaId) + 1;
    if (nextArea <= TOTAL_AREAS) {
      navigate(`/quiz/${nextArea}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Log quiz completion
      await logEvent(EVENT_TYPES.QUIZ_COMPLETED, {
        totalAreas: TOTAL_AREAS,
        timestamp: new Date().toISOString(),
      });
      
      completeQuiz();
      navigate('/results');
    }
  };
  
  // Calculate score for the current area
  const calculateAreaScore = (questions, answers) => {
    let score = 0;
    
    questions.forEach(question => {
      const selected = answers[question.id] || [];
      let hasCorrect = false;
      let hasIncorrect = false;
      
      // Check each selected option
      selected.forEach(optionId => {
        const option = question.options.find(opt => opt.id === optionId);
        if (option) {
          if (option.correct) {
            hasCorrect = true;
          } else {
            hasIncorrect = true;
          }
        }
      });
      
      // Award point if at least one correct answer and no incorrect answers
      if (hasCorrect && !hasIncorrect) {
        score++;
      }
    });
    
    return score;
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // Go to previous question in the same area
      setCurrentQuestion(prev => prev - 1);
      setError('');
    } else if (parseInt(areaId) > 1) {
      // Go to previous area's last question
      const prevArea = parseInt(areaId) - 1;
      const prevAreaQuestions = questionsData[prevArea] || [];
      navigate(`/quiz/${prevArea}`, { state: { lastQuestion: true } });
    }
  };

  // Calculate progress
  const progress = ((parseInt(areaId) - 1) / TOTAL_AREAS) * 100;
  const currentAreaNum = parseInt(areaId);
  const totalAreas = TOTAL_AREAS;

  if (isLoading) {
    return (
      <Layout title={areaName} showHeader={false} showFooter={false}>
        <QuizContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <div>Loading...</div>
        </QuizContainer>
      </Layout>
    );
  }

  // Create a styled header component for the quiz area
  const AreaHeader = () => (
    <div style={{
      position: 'relative',
      zIndex: 2,
      color: 'white',
      textAlign: 'center',
      padding: '1rem 0',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
    }}>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>Area {areaId} (of {TOTAL_AREAS}): {areaNames[areaId]}</h1>
    </div>
  );

  return (
    <Layout 
      title="" 
      showHeader={true} 
      showFooter={false}
      customHeader={<AreaHeader />}
    >
      <QuizContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {areaQuestions.map((question, qIndex) => (
          <QuestionCard
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qIndex * 0.1 }}
          >
            <QuestionText>
              {question.text}
              {question.description && (
                <QuestionDescription>
                  {question.description}
                </QuestionDescription>
              )}
            </QuestionText>
            <OptionsList>
              {question.options.map((option) => {
                const isSelected = selectedOptions[question.id]?.includes(option.id) || false;
                return (
                  <OptionButton
                    key={option.id}
                    selected={isSelected}
                    onClick={() => handleOptionSelect(question, option.id)}
                  >
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => handleOptionSelect(question, option.id)}
                      id={`${question.id}-${option.id}`}
                      name={`${question.id}[]`}
                      label={option.text}
                    />
                  </OptionButton>
                );
              })}
            </OptionsList>
          </QuestionCard>
        ))}
        <NavigationContainer>
          <Button
            onClick={() => {
              if (parseInt(areaId) > 1) {
                navigate(`/quiz/${parseInt(areaId) - 1}`);
              } else {
                navigate('/');
              }
            }}
            variant="secondary"
          >
            {parseInt(areaId) === 1 ? 'Back to Start' : 'Previous Area'}
          </Button>
          <Button onClick={handleNext}>
            {parseInt(areaId) === TOTAL_AREAS ? 'See Results' : 'Next Area'}
          </Button>
        </NavigationContainer>
      </QuizContainer>
    </Layout>
  );
}

export default QuizPage;
