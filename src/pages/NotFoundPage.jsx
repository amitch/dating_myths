import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { fadeIn } from '../utils/animations';

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.sienna};
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeIn}
    >
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Message>
        Oops! The page you're looking for doesn't exist or has been moved.
        <br />
        Let's get you back on track!
      </Message>
      
      <ButtonContainer>
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default NotFoundPage;
