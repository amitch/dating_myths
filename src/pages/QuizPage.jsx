import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { fadeIn } from '../utils/animations';

const StyledWelcomeMessage = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.sienna};
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
`;

const Description = styled(motion.p)`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const QuizContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const StyledH2 = styled(motion.h2)`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

function QuizPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeIn}
    >
      <StyledWelcomeMessage
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Title
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Welcome to the Dating Myth Quiz
        </Title>
        <Description
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Let&apos;s rethink dating together—there may be more than one right answer,
          so choose all that feel true to you!
        </Description>
      </StyledWelcomeMessage>

      <QuizContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <StyledH2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Quiz Questions Will Appear Here
        </StyledH2>
        {/* Quiz content will go here */}
      </QuizContainer>
    </motion.div>
  );
}

export default QuizPage;