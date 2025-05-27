import styled from '@emotion/styled';

const ProgressContainer = styled.div`
  width: 100%;
  margin: 1.5rem 0;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.darkSlateGray};
`;

const ProgressWrapper = styled.div`
  height: 6px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${({ value, max }) => `${(value / max) * 100}%`};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.paleVioletRed},
    ${({ theme }) => theme.colors.steelBlue}
  );
  border-radius: 3px;
  transition: width 0.3s ease-out;
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

function ProgressBar({ value, max = 100, showPercentage = false, className }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={className}>
      {showPercentage && (
        <ProgressInfo>
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </ProgressInfo>
      )}
      <ProgressWrapper>
        <ProgressBarFill value={value} max={max} />
      </ProgressWrapper>
    </div>
  );
}

export default ProgressBar;
