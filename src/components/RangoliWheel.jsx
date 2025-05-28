import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const WheelContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  margin: 2rem auto;
`;

const WheelSvg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.lightGray};
  stroke-width: 15;
`;

const CircleProgress = styled(motion.circle)`
  fill: none;
  stroke: ${({ theme }) => theme.colors.paleVioletRed};
  stroke-width: 15;
  stroke-linecap: round;
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s ease-in-out;
`;

const CenterText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.steelBlue};
`;

const RangoliWheel = ({ score, maxScore = 15 }) => {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / maxScore) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <WheelContainer>
      <WheelSvg viewBox="0 0 250 250">
        <CircleBackground
          cx="125"
          cy="125"
          r={radius}
        />
        <CircleProgress
          cx="125"
          cy="125"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </WheelSvg>
      <CenterText>
        {score}/{maxScore}
      </CenterText>
    </WheelContainer>
  );
};

export default RangoliWheel;
