import styled from '@emotion/styled';

export const ProgressContainer = styled.div`
  width: 100%;
  margin: 1.5rem 0;
`;

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.darkSlateGray};
`;

export const ProgressWrapper = styled.div`
  height: 8px;
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: ${({ theme }) => theme.colors.steelBlue};
  border-radius: 4px;
  transition: width 0.5s ease-in-out;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: translateX(-100%);
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;
