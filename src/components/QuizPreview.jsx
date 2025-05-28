import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PreviewContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  border: 2px solid ${({ theme }) => theme.colors.paleVioletRed};
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  max-width: 600px;
  width: 100%;
`;

const QuestionText = styled.h3`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  margin-top: 0;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  cursor: not-allowed;
  opacity: 0.8;
`;

const Checkbox = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid ${({ theme }) => theme.colors.paleVioletRed};
  border-radius: 4px;
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const OptionText = styled.span`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 0.95rem;
`;

const PreviewLabel = styled.div`
  background-color: ${({ theme }) => theme.colors.paleVioletRed};
  color: white;
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

function QuizPreview() {
  return (
    <PreviewContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <PreviewLabel>Quiz Preview</PreviewLabel>
      <QuestionText>Myth: You need to be charming right away to make a good impression</QuestionText>
      <OptionsList>
        <OptionItem>
          <Checkbox />
          <OptionText>First impressions are everything</OptionText>
        </OptionItem>
        <OptionItem>
          <Checkbox />
          <OptionText>You should always have a witty comeback ready</OptionText>
        </OptionItem>
        <OptionItem>
          <Checkbox />
          <OptionText>Being yourself is enough</OptionText>
        </OptionItem>
        <OptionItem>
          <Checkbox />
          <OptionText>You only get one chance to impress</OptionText>
        </OptionItem>
      </OptionsList>
    </PreviewContainer>
  );
}

export default QuizPreview;
