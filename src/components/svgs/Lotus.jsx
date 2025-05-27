import React from 'react';
import styled from '@emotion/styled';

const StyledSvg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  max-width: 50px;
  margin: 1.5rem auto;
  fill: ${({ theme, color }) => color || theme.colors.paleVioletRed};
  opacity: 0.8;
`;

export const Lotus = ({ color, ...props }) => (
  <StyledSvg 
    viewBox="0 0 24 24" 
    color={color}
    {...props}
  >
    <path d="M12 20c-2.21 0-4-1.79-4-4 0-1.2.54-2.27 1.38-3 1.33 1.54 3.49 1.54 4.84 0 .84.73 1.38 1.8 1.38 3 0 2.21-1.79 4-4 4zm0-16c-2.21 0-4 1.79-4 4 0 1.2.54 2.27 1.38 3 1.33-1.54 3.49-1.54 4.84 0 .84-.73 1.38-1.8 1.38-3 0-2.21-1.79-4-4-4z" />
  </StyledSvg>
);

export default Lotus;
