import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { Button } from '../components/ui';
import { fadeIn, fadeInUp } from '../utils/animations';
import { calculateScores, getStrongestWeakestAreas, getTitle, getTips } from '../utils/quizUtils';
import useDocumentTitle from '../hooks/useDocumentTitle';
import questionsData from '../data/questions.json';
import RangoliWheel from '../components/RangoliWheel';
import ScreenshotPrompt from '../components/ScreenshotPrompt';

const ResultsContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.lavenderBlush};
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.darkSlateGray};
`;

const ScoreCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.sienna};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.steelBlue};
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  text-align: center;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.sienna};
  padding-bottom: 0.5rem;
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TipCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.lavenderBlush};
  border: 1px solid ${({ theme }) => theme.colors.sienna};
  border-radius: 8px;
  padding: 1.2rem;
  position: relative;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  &::before {
    content: '💡';
    position: absolute;
    left: 1rem;
    top: -0.8rem;
    background: white;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    border: 1px solid ${({ theme }) => theme.colors.sienna};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const AreaScoresContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

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

function ResultsPage() {
  const navigate = useNavigate();
  const { answers, userName, resetQuiz } = useQuiz();
  
  // Get area names from questions data
  const areaNames = questionsData.areas || {};
  
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
      const { strongestArea, weakestArea } = getStrongestWeakestAreas(areaScores);
      
      // Get title and tips based on scores
      const title = getTitle(totalScore);
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
      navigate('/');
    }
  }, [answers, navigate]);

  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate('/quiz/1');
  };

  return (
    <ResultsContainer
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <ScreenshotPrompt />
      
      <ScoreCard
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <h2>Hello{userName ? `, ${userName}` : ''}!</h2>
        <RangoliWheel 
          score={isNaN(results.totalScore) ? 0 : results.totalScore} 
          maxScore={15} 
        />
        <h3 style={{ 
          color: '#2F4F4F', 
          margin: '1.5rem 0 0',
          fontStyle: 'italic',
          fontWeight: 'normal',
          textAlign: 'center',
          fontSize: '1.4rem'
        }}>
          {results.totalScore > 0 ? (
            <span>You're a <strong style={{ color: '#A0522D' }}>{results.title}</strong></span>
          ) : (
            <span>Enjoy your dating journey's next phase</span>
          )}
        </h3>
      </ScoreCard>

      <ScoreCard>
        <Subtitle>Your Scores by Area</Subtitle>
        <AreaScoresContainer>
          {Object.entries(results.areaScores).map(([areaId, score]) => (
            <AreaScore key={areaId}>
              <span>{areaId}. {areaNames[areaId] || `Area ${areaId}`}:</span>
              <span>{isNaN(score) ? 0 : score}/3</span>
            </AreaScore>
          ))}
        </AreaScoresContainer>
      </ScoreCard>

      <ScoreCard>
        <Subtitle>Your Personalized Tips</Subtitle>
        <TipsList>
          {results.tips.map((tip, index) => {
            // Get the area name for the weakest area tip
            const areaName = areaNames[results.weakestArea] || `Area ${results.weakestArea}`;
            const formattedTip = tip.replace('{area}', areaName);
            
            return (
              <TipCard
                key={index}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {formattedTip}
              </TipCard>
            );
          })}
        </TipsList>

        <Actions>
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
          >
            Back to Start
          </Button>
          <Button
            variant="primary"
            onClick={handleRetakeQuiz}
          >
            Retake Quiz
          </Button>
        </Actions>
      </ScoreCard>
    </ResultsContainer>
  );
}

export default ResultsPage;
