import React from 'react';
import styled from '@emotion/styled';

const StyledSvg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  max-width: 300px;
  margin: 0 auto;
  fill: ${({ theme, color }) => color || theme.colors.sienna};
`;

export const Rangoli = ({ color, ...props }) => (
  <StyledSvg 
    viewBox="0 0 100 100" 
    color={color}
    {...props}
  >
    <path d="M50 10L20 40L35 55L45 45L30 30L50 10ZM70 30L55 45L65 55L80 40L70 30ZM50 70L30 50L45 35L55 45L70 30L90 50L75 65L65 55L50 70ZM50 90L20 60L35 45L45 55L30 70L50 90ZM70 70L55 55L65 45L80 60L70 70Z" />
  </StyledSvg>
);

export default Rangoli;
