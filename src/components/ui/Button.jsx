import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Button = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.sienna};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.paleVioletRed};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.steelBlue};
    outline-offset: 2px;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.sienna};
  color: ${({ theme }) => theme.colors.sienna};
  
  &:hover {
    background-color: ${({ theme => theme.colors.lavenderBlush};
    color: ${({ theme }) => theme.colors.sienna};
  }
`;
