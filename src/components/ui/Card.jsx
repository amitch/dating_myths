import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  border: 2px solid ${({ theme }) => theme.colors.sienna};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const CardHeader = styled.h3`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

export const CardBody = styled.div`
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-family: ${({ theme }) => theme.fonts.secondary};
  line-height: 1.6;
`;

export const CardFooter = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.paleVioletRed};
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;
