import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { Button, Checkbox, ProgressBar } from '../components/ui';
import questionsData from '../data/questions.json';
import useDocumentTitle from '../hooks/useDocumentTitle';

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

const OptionButton = styled(motion.div)`
  display: block;
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.lavenderBlush};
  }
  
  ${({ selected, theme }) =>
    selected &&
    `
      font-weight: 500;
    `}
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
  
  // Debug logs
  console.log('Rendering QuizPage with areaId:', areaId);
  console.log('Current question index:', currentQuestion);
  
  // Get questions and area name for the current area
  const { questions } = questionsData;
  const areaQuestions = questions?.[areaId] || [];
  const areaName = areaNames[areaId] ? `${areaId}. ${areaNames[areaId]}` : `Area ${areaId}`;
  
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
    setSelectedOptions(prev => ({
      ...prev,
      [question.id]: [optionId] // Always store as array with single selection
    }));
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
    
    // Calculate score for this area
    const score = calculateAreaScore(areaQuestions, selectedOptions);
    
    setError('');
    saveAnswers(areaId, selectedOptions, score);
    
    const nextArea = parseInt(areaId) + 1;
    if (nextArea <= TOTAL_AREAS) {
      navigate(`/quiz/${nextArea}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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
    return <div>Loading...</div>;
  }

  return (
    <QuizContainer>
      <h1>{areaName}</h1>
      <QuestionCounter>
        Area {areaId} of {TOTAL_AREAS}
      </QuestionCounter>

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
            {question.options.map((option) => (
              <OptionButton
                key={option.id}
                selected={selectedOptions[question.id]?.includes(option.id)}
                onClick={() => handleOptionSelect(question, option.id)}
              >
                <Checkbox 
                  checked={selectedOptions[question.id]?.includes(option.id)} 
                  onChange={() => handleOptionSelect(question, option.id)}
                  id={`${question.id}-${option.id}`}
                  name={question.id}
                  label={option.text}
                />
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
