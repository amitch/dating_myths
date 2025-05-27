import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Button } from '../components/ui';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

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
  
  const { values, handleChange, handleSubmit } = useForm(
    { name: '' },
    {
      name: [
        (value) => (value ? null : 'Name is required'),
        (value) => (value.length >= 2 ? null : 'Name must be at least 2 characters'),
      ],
    },
    ({ name }) => {
      // This will be handled by the form submission
      navigate('/quiz/1');
    }
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
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
        <Button type="submit" variant="primary">
          Start Quiz
        </Button>
      </Form>
    </IntroContainer>
  );
}

export default IntroPage;
