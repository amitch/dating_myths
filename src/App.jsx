import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const AppContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-family: ${({ theme }) => theme.fonts.primary};
  position: relative;
`;

function App() {
  return (
    <AppContainer
      data-testid="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Dating Myths Quiz</h1>
        <p>Welcome to the dating myths quiz!</p>
      </motion.div>
    </AppContainer>
  );
}

export default App;