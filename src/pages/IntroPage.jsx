import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useEffect } from 'react';

// Import components directly to avoid circular dependencies
import { Button } from '../components/ui/Button';
import MythBlurb from '../components/MythBlurb';
import EncouragementBanner from '../components/EncouragementBanner';
import Spotlight from '../components/Spotlight';
import QuizPreview from '../components/QuizPreview';

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Subtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const Title = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.sienna};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.colors.sienna};
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.steelBlue};
  }
`;

function IntroPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const handleFormSubmit = (formValues) => {
    navigate('/quiz/1', { state: { userName: formValues.name } });
  };
  
  const { values, handleChange, handleSubmit } = useForm(
    { name: '' },
    {
      name: [
        (value) => (value ? null : 'Name is required'),
        (value) => (value.length >= 2 ? null : 'Name must be at least 2 characters'),
      ],
    },
    handleFormSubmit
  );

  return (
    <IntroContainer>
      <Title
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to the Dating Myths Quiz
      </Title>
      
      <Subtitle>
        Let's rethink dating together—there may be more than one right answer, so choose all that feel true to you!
      </Subtitle>
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="What should we call you?"
          required
        />
        <Button 
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Quiz
        </Button>
      </Form>
      
      <MythBlurb />
      
      <QuizPreview />
      
      {!isMobile && (
        <>
          <Spotlight variant="indian" />
          <Spotlight variant="nonIndian" />
        </>
      )}
      
      <EncouragementBanner onStartClick={handleSubmit} />
    </IntroContainer>
  );
}

export default IntroPage;
