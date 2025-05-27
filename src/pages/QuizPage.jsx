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
    selected ? theme.colors.steelBlue : theme.colors.lightGray};
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.steelBlue};
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
  const { state, dispatch } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Get questions for the current area
  const areaQuestions = questionsData[areaId.trim()] || [];
  
  // Set loading to false once questions are loaded
  useEffect(() => {
    if (areaQuestions.length > 0) {
      setIsLoading(false);
    } else {
      setError('No questions found for this area. Please try again.');
      setIsLoading(false);
    }
  }, [areaId, areaQuestions]);

  // Load saved answers when component mounts or area changes
  useEffect(() => {
    setCurrentQuestion(0);
    
    // Load previously saved answers for this area
    if (state.answers && state.answers[areaId]) {
      setSelectedOptions(state.answers[areaId]);
    } else {
      setSelectedOptions({});
    }
    
    setError('');
  }, [areaId, state.answers]);

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
    setError('');
  };

  const handleNext = () => {
    // Validate all questions are answered
    const allAnswered = areaQuestions.every(q => {
      const hasAnswer = selectedOptions[q.id] !== undefined;
      if (!hasAnswer) {
        setError('Please answer all questions before continuing.');
      }
      return hasAnswer;
    });
    
    if (!allAnswered) return;

    // Save answers to context
    dispatch({
      type: 'SAVE_ANSWERS',
      payload: {
        areaId: areaId,
        answers: selectedOptions
      }
    });

    // Navigate to next area or results
    const nextArea = parseInt(areaId) + 1;
    if (nextArea <= TOTAL_AREAS) {
      navigate(`/quiz/${nextArea}`);
    } else {
      dispatch({ type: 'COMPLETE_QUIZ' });
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (parseInt(areaId) > 1) {
      navigate(`/quiz/${parseInt(areaId) - 1}`);
    }
  };

  // Calculate progress
  const progress = ((parseInt(areaId) - 1) / TOTAL_AREAS) * 100;
  const currentAreaNum = parseInt(areaId);
  const totalAreas = TOTAL_AREAS;

  return (
    <QuizContainer>
      <ProgressBar value={progress} max={100} />
      
      <QuestionCounter>
        Area {areaId} of {TOTAL_AREAS}
      </QuestionCounter>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {isLoading ? (
        <div>Loading questions...</div>
      ) : areaQuestions.length > 0 ? (
        <>
          <QuestionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionText>
              {currentQuestion + 1}. {areaQuestions[currentQuestion]?.text}
            </QuestionText>
            
            <OptionsList>
              {areaQuestions[currentQuestion]?.options.map((option) => (
                <OptionButton
                  key={option.id}
                  onClick={() => handleOptionSelect(areaQuestions[currentQuestion].id, option.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  selected={selectedOptions[areaQuestions[currentQuestion].id] === option.id}
                >
                  {option.text}
                </OptionButton>
              ))}
            </OptionsList>
          </QuestionCard>

          <NavigationContainer>
            <Button 
              onClick={handlePrevious}
              disabled={parseInt(areaId) === 1 && currentQuestion === 0}
              variant="outline"
            >
              {currentQuestion === 0 ? 'Previous Area' : 'Previous'}
            </Button>
            
            <Button 
              onClick={handleNext}
              variant="primary"
            >
              {currentAreaNum >= totalAreas ? 'See Results →' : 'Next →'}
            </Button>
          </NavigationContainer>
        </>
      ) : (
        <ErrorMessage>No questions available for this area.</ErrorMessage>
      )}
    </QuizContainer>
  );
}

export default QuizPage;
