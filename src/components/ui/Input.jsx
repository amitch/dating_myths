import styled from '@emotion/styled';

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  border: 2px solid ${({ theme }) => theme.colors.steelBlue};
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.paleVioletRed};
    opacity: 0.7;
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.paleVioletRed};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.paleVioletRed}40`};
  }
  
  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-weight: 500;
`;

export const InputError = styled.p`
  color: ${({ theme }) => theme.colors.paleVioletRed};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;
