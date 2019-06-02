import * as React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'xxsmall' | 'xsmall' | 'small' | 'normal' | 'large';
}

interface StyledButtonProps {
  size: 'xxsmall' | 'xsmall' | 'small' | 'normal' | 'large';
}

interface Padding {
  xxsmall: string;
  xsmall: string;
  small: string;
  normal: string;
  large: string;
}

const padding: Padding = {
  xxsmall: '4px 8px',
  xsmall: '4px 8px',
  small: '5px 10px',
  normal: '6px 12px',
  large: '6px 12px'
};

const BaseButton = styled.button`
  border-radius: 3px;
  margin: 0;
  border: none;
  background: none;
  text-align: center;
`;

const StyledSecondaryButton = styled(BaseButton)<StyledButtonProps>`
  font-size: ${p => p.theme.fontSize[p.size]};
  font-weight: 700;
  color: ${p => p.theme.colors.primary.hex};
  background: ${p => p.theme.colors.primary.light};
  padding: ${p => padding[p.size]};
`;

const StyledSecondarySmallButton = styled(StyledSecondaryButton)`
  font-size: 0.75rem;
`;

export const SecondaryButton = ({
  text,
  onClick,
  size = 'normal'
}: ButtonProps) => (
  <StyledSecondaryButton size={size} onClick={onClick}>
    {text}
  </StyledSecondaryButton>
);
