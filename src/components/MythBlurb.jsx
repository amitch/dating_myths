import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const BlurbContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  color: ${({ theme }) => theme.colors.steelBlue};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  border: 2px solid ${({ theme }) => theme.colors.sienna};
  position: relative;
  overflow: hidden;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.paleVioletRed};
    border-radius: 50%;
    opacity: 0.3;
  }
  
  &::before {
    top: -20px;
    left: -20px;
  }
  
  &::after {
    bottom: -20px;
    right: -20px;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 500;
`;

function MythBlurb() {
  return (
    <BlurbContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Text>
        Think dating needs a Bollywood sparkle or a perfect rishta match? 
        Let's bust those myths and discover what really matters in modern dating!
      </Text>
    </BlurbContainer>
  );
}

export default MythBlurb;
