import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { Button } from '../components/ui';
import { fadeIn } from '../utils/animations';

// Mock questions - replace with actual data from your JSON
const MOCK_QUESTIONS = {
  1: [
    {
      id: 'q1',
      text: 'Which of these dating myths have you heard before?',
      options: [
        { id: 'q1_a1', text: 'Opposites attract and make better matches' },
        { id: 'q1_a2', text: 'Men should always make the first move' },
        { id: 'q1_a3', text: 'Playing hard to get is the best strategy' },
      ],
    },
    // Add more questions as needed
  ],
  // Add more areas as needed
};

const QuizContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const QuestionCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const QuestionText = styled.h2`
  color: ${({ theme }) => theme.colors.sienna};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const OptionItem = styled.li`
  margin-bottom: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s;
  background: ${({ theme, checked }) => 
    checked ? theme.colors.lavenderBlush : 'transparent'};
  border: 1px solid ${({ theme, checked }) => 
    checked ? theme.colors.paleVioletRed : theme.colors.lightGray};

  &:hover {
    background: ${({ theme }) => theme.colors.lavenderBlush};
  }
`;

const CheckboxInput = styled.input`
  margin-right: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

function QuizPage() {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const { saveAnswers, answers } = useQuiz();
  
  const [selectedOptions, setSelectedOptions] = useState({});
  
  // Get questions for the current area
  const currentQuestions = MOCK_QUESTIONS[areaId] || [];
  
  // Load saved answers when component mounts or area changes
  useEffect(() => {
    if (answers[areaId]) {
      setSelectedOptions(answers[areaId]);
    } else {
      setSelectedOptions({});
    }
  }, [areaId, answers]);
  
  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [optionId]: !prev[questionId]?.[optionId]
      }
    }));
  };
  
  const handleNext = () => {
    // Save answers for current area
    saveAnswers(areaId, selectedOptions);
    
    // Navigate to next area or results
    const nextArea = parseInt(areaId, 10) + 1;
    if (nextArea <= 5) { // Assuming 5 areas total
      navigate(`/quiz/${nextArea}`);
    } else {
      navigate('/results');
    }
  };
  
  const handlePrevious = () => {
    const prevArea = parseInt(areaId, 10) - 1;
    if (prevArea >= 1) {
      navigate(`/quiz/${prevArea}`);
    } else {
      navigate('/');
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeIn}
    >
      <QuizContainer>
        <h1>Area {areaId} of 5</h1>
        
        {currentQuestions.map((question) => (
          <QuestionCard key={question.id}>
            <QuestionText>{question.text}</QuestionText>
            <OptionsList>
              {question.options.map((option) => (
                <OptionItem key={option.id}>
                  <CheckboxLabel checked={selectedOptions[question.id]?.[option.id] || false}>
                    <CheckboxInput
                      type="checkbox"
                      checked={selectedOptions[question.id]?.[option.id] || false}
                      onChange={() => handleOptionChange(question.id, option.id)}
                    />
                    {option.text}
                  </CheckboxLabel>
                </OptionItem>
              ))}
            </OptionsList>
          </QuestionCard>
        ))}
        
        <Navigation>
          <Button 
            variant="secondary" 
            onClick={handlePrevious}
            disabled={parseInt(areaId, 10) === 1}
          >
            Previous
          </Button>
          <Button 
            variant="primary" 
            onClick={handleNext}
            disabled={Object.keys(selectedOptions).length === 0}
          >
            {parseInt(areaId, 10) === 5 ? 'See Results' : 'Next'}
          </Button>
        </Navigation>
      </QuizContainer>
    </motion.div>
  );
}

export default QuizPage;