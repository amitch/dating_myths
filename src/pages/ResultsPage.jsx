import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { Button } from '../components/ui';
import { fadeIn } from '../utils/animations';
import { calculateScores, getStrongestWeakestAreas, getTitle, getTips } from '../utils/quizUtils';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ResultsContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.lavenderBlush};
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.darkSlateGray};
`;

const ScoreCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors.sienna};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.steelBlue};
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  text-align: center;
`;

const Score = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.paleVioletRed};
  margin: 1rem 0;
  text-align: center;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.sienna};
  padding-bottom: 0.5rem;
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

const areaNames = {
  1: 'Dating Myths and Beliefs',
  2: 'Online Dating',
  3: 'Relationship Expectations',
  4: 'Communication and Conflict',
  5: 'Commitment and Future'
};

const AreaScore = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.lavenderBlush};
  border-radius: 6px;
  font-size: 1.1rem;
  
  span:first-of-type {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.sienna};
  }
  
  span:last-child {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.steelBlue};
  }
`;

const AreaScoresContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

function ResultsPage() {
  const navigate = useNavigate();
  const { answers, userName } = useQuiz();
  
  // Set initial state
  const [results, setResults] = useState({
    totalScore: 0,
    areaScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    title: 'New to Dating',
    tips: [
      'Start by being open to new experiences',
      'Focus on getting to know people without pressure',
      'Remember that everyone starts somewhere - take your time'
    ],
    strongestArea: 1,
    weakestArea: 1
  });
  
  // Set document title based on results
  useDocumentTitle(
    results.totalScore > 0 
      ? `Results: ${results.title}` 
      : 'Quiz Results'
  );

  useEffect(() => {
    if (!answers || Object.keys(answers).length === 0) {
      navigate('/');
      return;
    }

    try {
      // Calculate scores
      const { totalScore, areaScores } = calculateScores(answers);
      
      // Ensure we have valid scores
      if (totalScore === 0 && Object.values(areaScores).every(score => score === 0)) {
        // If no answers were selected, show a friendly message
        setResults({
          totalScore: 0,
          areaScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          title: 'New to Dating',
          tips: [
            'Start by being open to new experiences',
            'Focus on getting to know people without pressure',
            'Remember that everyone starts somewhere - take your time'
          ],
          strongestArea: 1,
          weakestArea: 1
        });
        return;
      }
      
      // Get strongest/weakest areas
      const { strongestArea, weakestArea } = getStrongestWeakestAreas(areaScores);
      
      // Get title based on score
      const title = getTitle(totalScore);
      
      // Get tips for weakest area
      const tips = getTips(weakestArea);

      setResults({
        totalScore,
        areaScores,
        title,
        tips,
        strongestArea,
        weakestArea
      });
    } catch (error) {
      console.error('Error calculating results:', error);
      // Fallback to default state if there's an error
      setResults({
        totalScore: 0,
        areaScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        title: 'New to Dating',
        tips: [
          'Start by being open to new experiences',
          'Focus on getting to know people without pressure',
          'Remember that everyone starts somewhere - take your time'
        ],
        strongestArea: 1,
        weakestArea: 1
      });
    }
  }, [answers, navigate]);
  
  if (!answers || Object.keys(answers).length === 0) {
    return null;
  }

  return (
    <ResultsContainer
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Title>Your Dating Profile Results</Title>
      
      <ScoreCard>
        <h2>Hello{userName ? `, ${userName}` : ''}!</h2>
        <div style={{ margin: '1rem 0' }}>
          <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Your Dating Profile</div>
          <Score>{isNaN(results.totalScore) ? '0' : results.totalScore}/15</Score>
        </div>
        <h3 style={{ 
          color: '#2F4F4F', 
          margin: '1rem 0',
          fontStyle: 'italic',
          fontWeight: 'normal'
        }}>
          {results.totalScore > 0 ? (
            <span>You're a <strong>{results.title}</strong></span>
          ) : (
            <span>Ready to start your dating journey</span>
          )}
        </h3>
      </ScoreCard>
      
      <ScoreCard>
        <Subtitle>Your Scores by Area</Subtitle>
        <AreaScoresContainer>
          {Object.entries(results.areaScores).map(([areaId, score]) => {
            const displayScore = isNaN(score) ? 0 : score;
            return (
              <AreaScore key={areaId}>
                <span>{areaNames[areaId]}:</span>
                <span>{displayScore}/3</span>
              </AreaScore>
            );
          })}
        </AreaScoresContainer>
        
        <Subtitle>Your Strengths</Subtitle>
        <p>You scored highest in <strong>{areaNames[results.strongestArea]}</strong>.</p>
        
        <Subtitle>Areas for Growth</Subtitle>
        <p>Consider working on: <strong>{areaNames[results.weakestArea]}</strong></p>
        
        <Subtitle>Personalized Tips</Subtitle>
        <TipsList>
          {results.tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <TipItem>{tip}</TipItem>
            </motion.div>
          ))}
        </TipsList>
        
        <Actions>
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
          >
            Back to Start
          </Button>
          <Button
            onClick={() => {
              // Clear answers and start over
              localStorage.removeItem('datingMythsQuizState');
              navigate('/quiz/1');
            }}
          >
            Retake Quiz
          </Button>
        </Actions>
      </ScoreCard>
    </ResultsContainer>
  );
}

export default ResultsPage;