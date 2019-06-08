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

const BaseButton = styled.button<StyledButtonProps>`
  border-radius: 3px;
  margin: 0;
  border: none;
  background: none;
  text-align: center;
  font-size: ${p => p.theme.fontSize[p.size]};
  padding: ${p => padding[p.size]};
`;

const StyledSecondaryButton = styled(BaseButton)`
  font-weight: 700;
  color: ${p => p.theme.colors.primary.hex};
  background: ${p => p.theme.colors.primary.hues[9]};
  transition: ${p => p.theme.transition} background;

  &:hover {
    background: ${p => p.theme.colors.primary.hues[8]};
  }

  &:active {
    background: ${p => p.theme.colors.primary.hues[7]};
  }
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

const StyledTextButton = styled(BaseButton)<StyledButtonProps>`
  background: none;
  color: ${p => p.theme.colors.primary.hex};
`;

export const TextButton = ({ text, onClick, size = 'normal' }: ButtonProps) => (
  <StyledTextButton size={size} onClick={onClick}>
    {text}
  </StyledTextButton>
);
