import React from 'react';
import styled from '@emotion/styled';

const WelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    color: ${({ theme }) => theme.colors.sienna};
    margin-bottom: 1rem;
  }
`;

function QuizPage() {
  return (
    <div>
      <WelcomeMessage>
        <h1>Welcome to the Dating Myth Quiz</h1>
        <p>Let's rethink dating together—there may be more than one right answer, so choose all that feel true to you!</p>
      </WelcomeMessage>
      <div className="quiz-container">
        <h2>Quiz Questions Will Appear Here</h2>
        {/* Quiz content will go here */}
      </div>
    </div>
  );
}

export default QuizPage;