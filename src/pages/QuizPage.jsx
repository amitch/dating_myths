import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { Button, ProgressBar } from '../components/ui';
import questionsData from '../data/questions.json';

// Constants
const TOTAL_AREAS = 5; // Total number of quiz areas

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
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const QuestionText = styled.h2`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  line-height: 1.5;
`;

const QuestionDescription = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.steelBlue};
  font-style: italic;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionButton = styled(motion.button)`
  display: block;
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid ${({ selected, theme }) => 
    selected ? theme.colors.paleVioletRed : theme.colors.lightGray};
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.paleVioletRed};
    background-color: ${({ theme }) => theme.colors.lavenderBlush};
  }
  
  ${({ selected, theme }) =>
    selected &&
    `
      background-color: ${theme.colors.lavenderBlush};
      font-weight: 500;
    `}
`;

function QuizPage() {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const { saveAnswers, completeQuiz } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Debug logs
  console.log('Rendering QuizPage with areaId:', areaId);
  console.log('Current question index:', currentQuestion);
  
  // Get questions and area name for the current area
  const { areas, questions } = questionsData;
  const areaQuestions = questions?.[areaId] || [];
  const areaName = areas?.[areaId] || `Area ${areaId}`;
  
  // Debug logs
  console.log('Area name:', areaName);
  console.log('Area questions:', areaQuestions);
  
  // Set loading state and validate questions
  useEffect(() => {
    if (areaQuestions.length > 0) {
      console.log(`Found ${areaQuestions.length} questions for area ${areaId}`);
      setIsLoading(false);
      setError('');
    } else {
      console.error(`No questions found for area ${areaId}`);
      setError('No questions found for this area. Please try again.');
      setIsLoading(false);
    }
  }, [areaId, areaQuestions]);

  const handleOptionSelect = (question, optionId) => {
    setSelectedOptions(prev => {
      const currentSelections = prev[question.id] || [];
      const isMultiSelect = question.description?.toLowerCase().includes('select all');
      
      if (isMultiSelect) {
        // Toggle the selected state for multi-select
        const newSelections = currentSelections.includes(optionId)
          ? currentSelections.filter(id => id !== optionId)
          : [...currentSelections, optionId];
        
        return {
          ...prev,
          [question.id]: newSelections
        };
      } else {
        // Single select behavior
        return {
          ...prev,
          [question.id]: [optionId] // Store as array for consistency
        };
      }
    });
    // Clear any previous errors when user makes a selection
    setError('');
  };

  const handleNext = () => {
    // Validate all questions are answered
    const unansweredQuestions = areaQuestions.filter(
      q => !selectedOptions[q.id] || selectedOptions[q.id].length === 0
    );
    
    if (unansweredQuestions.length > 0) {
      setError('Please answer all questions before continuing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setError('');
    saveAnswers(areaId, selectedOptions);
    
    const nextArea = parseInt(areaId) + 1;
    if (nextArea <= TOTAL_AREAS) {
      navigate(`/quiz/${nextArea}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      completeQuiz();
      navigate('/results');
    }
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
    return <div>Loading...</div>;
  }

  return (
    <QuizContainer>
      <h1>{areaName}</h1>
      <QuestionCounter>
        Area {areaId} of {TOTAL_AREAS}
      </QuestionCounter>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {areaQuestions.map((question, index) => (
        <QuestionCard
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <QuestionText>
            {question.text}
            {question.description && (
              <QuestionDescription>{question.description}</QuestionDescription>
            )}
          </QuestionText>

          <OptionsList>
            {question.options.map(option => (
              <OptionButton
                key={option.id}
                selected={selectedOptions[question.id]?.includes(option.id)}
                onClick={() => handleOptionSelect(question, option.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.text}
              </OptionButton>
            ))}
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
  );
}

export default QuizPage;
