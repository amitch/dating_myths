import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { fadeIn } from '../utils/animations'; 

const ResultsContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.sienna};
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2.2rem;
`;

const Message = styled(motion.p)`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 2rem;
`;

function ResultsPage() {
  return (
    <ResultsContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeIn}
    >
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Results
      </Title>
      <Message
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Your quiz results will appear here
      </Message>
    </ResultsContainer>
  );
}

export default ResultsPage;