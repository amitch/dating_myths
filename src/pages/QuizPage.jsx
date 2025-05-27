import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { Button, ProgressBar } from '../components/ui';
import questionsData from '../data/questions.json';

// Styled Components
const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuestionText = styled.h2`
  color: #1e293b;
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
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #94a3b8;
    background-color: #f8fafc;
  }
  
  &[data-selected='true'] {
    border-color: #3b82f6;
    background-color: #eff6ff;
    font-weight: 500;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 2rem;
`;

function QuizPage() {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const { saveAnswers, answers } = useQuiz();
  
  const [selectedOptions, setSelectedOptions] = useState({});
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Get questions for the current area
  const currentQuestions = questionsData[areaId] || [];
  const currentAreaNum = parseInt(areaId, 10);
  const totalAreas = Object.keys(questionsData).length;
  
  // Load saved answers when component mounts or area changes
  useEffect(() => {
    if (answers[areaId]) {
      setSelectedOptions(answers[areaId]);
    } else {
      setSelectedOptions({});
    }
  }, [areaId, answers]);
  
  const isCurrentAreaComplete = () => {
    return currentQuestions.every(question => 
      selectedOptions[question.id] && 
      Object.values(selectedOptions[question.id]).some(Boolean)
    );
  };
  
  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [optionId]: !prev[questionId]?.[optionId]
      }
    }));
  };
  
  const handleNext = () => {
    setIsAnimating(true);
    saveAnswers(areaId, selectedOptions);
    
    const nextArea = currentAreaNum + 1;
    if (nextArea <= totalAreas) {
      setDirection(1);
      navigate(`/quiz/${nextArea}`);
    } else {
      navigate('/results');
    }
  };
  
  const handlePrevious = () => {
    const prevArea = currentAreaNum - 1;
    if (prevArea >= 1) {
      setIsAnimating(true);
      setDirection(-1);
      navigate(`/quiz/${prevArea}`);
    } else {
      navigate('/');
    }
  };

  // Animation variants
  const slideInRight = {
    initial: { x: 300, opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: -300, opacity: 0 }
  };

  const slideOutLeft = {
    initial: { x: -300, opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: 300, opacity: 0 }
  };

  return (
    <QuizContainer>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Area {currentAreaNum} of {totalAreas}</h2>
        <ProgressBar 
          value={currentAreaNum} 
          max={totalAreas} 
          showPercentage={true} 
        />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={areaId}
          custom={direction}
          initial="initial"
          animate="in"
          exit="out"
          variants={direction === 1 ? slideInRight : slideOutLeft}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => setIsAnimating(false)}
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          {currentQuestions.map((question) => (
            <QuestionCard key={question.id}>
              <QuestionText>{question.text}</QuestionText>
              <OptionsList>
                {question.options.map((option) => (
                  <OptionButton
                    key={option.id}
                    onClick={() => handleOptionSelect(question.id, option.id)}
                    data-selected={selectedOptions[question.id]?.[option.id] || false}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.text}
                  </OptionButton>
                ))}
              </OptionsList>
            </QuestionCard>
          ))}
          
          <Navigation>
            <Button 
              onClick={handlePrevious}
              disabled={currentAreaNum <= 1 || isAnimating}
              variant="secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              ← Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!isCurrentAreaComplete() || isAnimating}
              variant="primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{
                opacity: isCurrentAreaComplete() ? 1 : 0.7,
                cursor: isCurrentAreaComplete() ? 'pointer' : 'not-allowed'
              }}
            >
              {currentAreaNum >= totalAreas ? 'See Results →' : 'Next →'}
            </Button>
          </Navigation>
        </motion.div>
      </AnimatePresence>
    </QuizContainer>
  );
}

export default QuizPage;