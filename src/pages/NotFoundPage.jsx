import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { fadeIn } from '../utils/animations';
import { useQuiz } from '../context/QuizContext';

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 600px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  width: 100%;
`;

function NotFoundPage() {
  const navigate = useNavigate();
  const { userName } = useQuiz();

  return (
    <Container
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeIn}
    >
      <Title>404</Title>
      <Subtitle>Oops! Page Not Found</Subtitle>
      <Message>
        {userName ? `${userName}, ` : ''}The page you're looking for doesn't exist or has been moved.
        The quiz area might be invalid or you may have followed a broken link.
      </Message>
      
      <ButtonContainer>
        <Button
          onClick={() => navigate('/')}
          variant="secondary"
          size="large"
        >
          Back to Home
        </Button>
        <Button
          onClick={() => navigate('/quiz/1')}
          variant="primary"
          size="large"
        >
          Start Quiz
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default NotFoundPage;
