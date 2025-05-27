import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { Button } from '../components/ui';
import { fadeIn } from '../utils/animations';

const ResultsContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ScoreCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.sienna};
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
`;

const Score = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.steelBlue};
  margin: 1rem 0;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
`;

const ResultText = styled.p`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const TipItem = styled.li`
  background: ${({ theme }) => theme.colors.lavenderBlush};
  border-left: 4px solid ${({ theme }) => theme.colors.paleVioletRed};
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0 4px 4px 0;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

// Mock function to calculate results - replace with actual implementation
const calculateResults = (answers) => {
  // This is a simplified example - replace with your actual scoring logic
  const totalQuestions = Object.values(answers).reduce(
    (total, area) => total + Object.keys(area).length, 
    0
  );
  
  const correctAnswers = Math.floor(Math.random() * totalQuestions);
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Mock tips based on score
  const tips = [
    'Focus on active listening during conversations',
    'Be open about your intentions early on',
    'Remember that compatibility is more important than perfection'
  ];
  
  return {
    score,
    tips,
    resultText: score > 70 
      ? 'Great job! You have a healthy approach to dating.' 
      : score > 40 
        ? 'You\'re on the right track, but there\'s room for growth.'
        : 'Consider rethinking some of your dating assumptions.'
  };
};

function ResultsPage() {
  const navigate = useNavigate();
  const { answers, resetQuiz, userName } = useQuiz();
  
  // Redirect to home if no answers exist
  useEffect(() => {
    if (Object.keys(answers).length === 0) {
      navigate('/');
    }
  }, [answers, navigate]);
  
  // Calculate results
  const { score, tips, resultText } = calculateResults(answers);
  
  const handleRestart = () => {
    resetQuiz();
    navigate('/');
  };
  
  const handleViewAnswers = () => {
    // Navigate to a page showing detailed answers
    // This would be implemented in a future update
    alert('Detailed answers view would be shown here');
  };

  return (
    <ResultsContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeIn}
    >
      <ScoreCard>
        <Title>{userName ? `${userName}'s Results` : 'Your Results'}</Title>
        <Score>{score}%</Score>
        <ResultText>{resultText}</ResultText>
      </ScoreCard>
      
      <ScoreCard>
        <Subtitle>Your Personalized Tips</Subtitle>
        <ResultText>
          Based on your answers, here are some tips to improve your dating experience:
        </ResultText>
        <TipsList>
          {tips.map((tip, index) => (
            <TipItem key={index}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                {tip}
              </motion.div>
            </TipItem>
          ))}
        </TipsList>
        
        <Actions>
          <Button variant="secondary" onClick={handleViewAnswers}>
            View Detailed Answers
          </Button>
          <Button variant="primary" onClick={handleRestart}>
            Take Quiz Again
          </Button>
        </Actions>
      </ScoreCard>
    </ResultsContainer>
  );
}

export default ResultsPage;