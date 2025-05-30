import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { Button } from '../components/ui';
import Layout from '../components/layout/Layout';
import { logEvent, EVENT_TYPES } from '../utils/logger';
import { fadeIn, fadeInUp } from '../utils/animations';
import { UserContext } from '../context/UserContext';
import { 
  calculateScores, 
  getStrongestWeakestAreas, 
  getTitle, 
  getTips, 
  getMaxScore 
} from '../utils/quizUtils';
import useDocumentTitle from '../hooks/useDocumentTitle';
import questionsData from '../data/questions.json';
import RangoliWheel from '../components/RangoliWheel';

const ResultsContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.lavenderBlush};
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const ScoreCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.sienna};
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 12px;
  }
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const AreaScore = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.lavenderBlush};
  border-radius: 8px;
  font-size: 0.95rem;
  
  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
  
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
  const location = useLocation();
  const { answers, resetQuiz } = useQuiz();
  const { user } = useContext(UserContext);
  const [results, setResults] = useState(null);
  const [title, setTitle] = useState('');
  const [tips, setTips] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Get area names from questions data
  const areaNames = questionsData.areas || {};

  // Set document title based on results
  useDocumentTitle('Your Results - Dating Myths Quiz');

  // Log results view
  useEffect(() => {
    if (!answers || Object.keys(answers).length === 0) {
      navigate('/');
      return;
    }

    try {
      // Calculate scores with the answers in their current format
      const { totalScore, areaScores } = calculateScores(answers);
      const { strongestArea, weakestArea } = getStrongestWeakestAreas(areaScores, questionsData.areas);
      
      // Get title and tips based on scores
      const maxPossibleScore = getMaxScore(questionsData);
      const percentage = Math.round((totalScore / maxPossibleScore) * 100);
      const { title, description } = getTitle(percentage);
      const tips = getTips(weakestArea);
      
      // Prepare results data
      const resultsData = {
        totalScore,
        areaScores,
        title,
        description,
        tips,
        strongestArea,
        weakestArea,
        maxScore: maxPossibleScore
      };
      
      setResults(resultsData);
      
      // Log the final results
      logEvent(EVENT_TYPES.QUIZ_COMPLETED, {
        userName: user?.name || 'Anonymous',
        title: title,
        description: description,
        score: totalScore,
        maxScore: maxPossibleScore,
        areas: Object.entries(areaScores).map(([areaId, score]) => ({
          areaId,
          areaName: areaNames[areaId],
          score,
          maxQuestions: (questionsData.questions[areaId] || []).length
        })),
        timestamp: new Date().toISOString(),
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

  const CommonHeader = () => (
    <div style={{
      position: 'relative',
      zIndex: 2,
      color: 'white',
      textAlign: 'center',
      padding: '1rem 0',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
    }}>
    </div>
  );

  return (
    <Layout 
      title="" 
      showHeader={true} 
      showFooter={false}
      customHeader={<CommonHeader />}
    >
      <ResultsContainer
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <ScoreCard
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h2>Well done{userName ? `, ${userName}` : '!'}</h2>
          <RangoliWheel 
            score={isNaN(results.totalScore) ? 0 : results.totalScore} 
            maxScore={results.maxScore} 
          />
          <h3 style={{ 
            color: '#2F4F4F', 
            margin: '1rem 0 0.5rem',
            fontSize: '1.8rem',
            fontWeight: 'bold'
          }}>
            {results.title}
          </h3>
          <p style={{
            color: '#666',
            fontSize: '1.1rem',
            marginBottom: '1.5rem',
            fontStyle: 'italic'
          }}>
            {results.description}
          </p>
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
    </Layout>
    );
}

export default ResultsPage;
