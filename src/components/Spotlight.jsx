import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const SpotlightContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  color: ${({ theme, variant }) => 
    variant === 'indian' ? theme.colors.darkSlateGray : theme.colors.steelBlue};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.sienna};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Decoration = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  opacity: 0.2;
  
  &.top-left {
    top: -10px;
    left: -10px;
    border-top: 2px solid ${({ theme, variant }) => 
      variant === 'indian' ? theme.colors.sienna : theme.colors.steelBlue};
    border-left: 2px solid ${({ theme, variant }) => 
      variant === 'indian' ? theme.colors.sienna : theme.colors.steelBlue};
    border-top-left-radius: 8px;
  }
  
  &.bottom-right {
    bottom: -10px;
    right: -10px;
    border-bottom: 2px solid ${({ theme, variant }) => 
      variant === 'indian' ? theme.colors.paleVioletRed : theme.colors.steelBlue};
    border-right: 2px solid ${({ theme, variant }) => 
      variant === 'indian' ? theme.colors.paleVioletRed : theme.colors.steelBlue};
    border-bottom-right-radius: 8px;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

const Emoji = styled.span`
  font-size: 1.2em;
  margin: 0 2px;
`;

function Spotlight({ variant = 'indian' }) {
  const content = {
    indian: {
      text: "Divorced and dating later in life? Your journey's strength is your charm—find connection over chai.",
      emoji: "☕"
    },
    nonIndian: {
      text: "Divorced and starting fresh? Your life's story is your spark—dive into dating!",
      emoji: "✨"
    }
  };

  const { text, emoji } = content[variant] || content.indian;

  return (
    <SpotlightContainer
      variant={variant}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: variant === 'indian' ? 0.4 : 0.5 }}
    >
      <Decoration className="top-left" variant={variant} />
      <Text>
        <Emoji>{emoji}</Emoji> {text} <Emoji>{emoji}</Emoji>
      </Text>
      <Decoration className="bottom-right" variant={variant} />
    </SpotlightContainer>
  );
}

export default Spotlight;
