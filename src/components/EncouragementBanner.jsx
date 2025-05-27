import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Button } from './ui';

const BannerContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.paleVioletRed};
  color: ${({ theme }) => theme.colors.darkSlateGray};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Message = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 600;
`;

const Lotus = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.steelBlue};
  opacity: 0.2;
  border-radius: 50%;
  
  &:first-of-type {
    top: -20px;
    left: 20%;
  }
  
  &:last-child {
    bottom: -20px;
    right: 20%;
  }
`;

function EncouragementBanner({ onStartClick }) {
  return (
    <BannerContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Lotus />
      <Message>Ready to rediscover dating? You're enough—jump in!</Message>
      <Button 
        onClick={onStartClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        style={{
          backgroundColor: 'transparent',
          border: '2px solid',
          borderColor: 'var(--colors-sienna)',
          color: 'var(--colors-sienna)'
        }}
      >
        Start Quiz
      </Button>
      <Lotus />
    </BannerContainer>
  );
}

export default EncouragementBanner;
