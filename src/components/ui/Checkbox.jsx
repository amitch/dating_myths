import styled from '@emotion/styled';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: ${({ checked, theme }) => 
    checked ? theme.colors.paleVioletRed : 'white'};
  border: 2px solid ${({ theme }) => theme.colors.paleVioletRed};
  border-radius: 4px;
  margin-right: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.lavenderBlush};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  width: 100%;
  padding: 0.5rem 0;
  user-select: none;
`;

export const Checkbox = ({ checked, onChange, label, id, name, ...props }) => {
  return (
    <CheckboxContainer>
      <CheckboxLabel htmlFor={id}>
        <HiddenCheckbox 
          type="checkbox" 
          checked={checked} 
          onChange={onChange}
          id={id}
          name={name}
          {...props}
        />
        <StyledCheckbox checked={checked}>
          {checked && (
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </StyledCheckbox>
        {label}
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

// Named export is used instead of default export
