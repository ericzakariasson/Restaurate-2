import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'xxsmall' | 'xsmall' | 'small' | 'normal' | 'large';
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

interface NavButtonProps extends ButtonProps {
  to: string;
}

interface StyledButtonProps {
  size: 'xxsmall' | 'xsmall' | 'small' | 'normal' | 'large';
}

interface StyledNavButtonProps extends StyledButtonProps {
  to: string;
}

interface Padding {
  xxsmall: string;
  xsmall: string;
  small: string;
  normal: string;
  large: string;
  [key: string]: string;
}

const padding: Padding = {
  xxsmall: '4px 8px',
  xsmall: '4px 8px',
  small: '5px 10px',
  normal: '6px 12px',
  large: '14px 16px'
};

const BaseButton = styled.button<StyledButtonProps>`
  border-radius: 3px;
  margin: 0;
  border: none;
  background: none;
  text-align: center;
  font-size: ${p => p.theme.fontSize[p.size]};
  padding: ${p => padding[p.size]};
  transition: ${p => p.theme.transition};
`;

const StyledSecondaryButton = styled(BaseButton)`
  font-weight: 700;
  color: ${p => p.theme.colors.primary.hex};
  background-color: ${p => p.theme.colors.primary.hues[9]};
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
  size = 'normal',
  type = 'button'
}: ButtonProps) => (
  <StyledSecondaryButton type={type} size={size} onClick={onClick}>
    {text}
  </StyledSecondaryButton>
);

const StyledTextButton = styled(BaseButton)<StyledButtonProps>`
  background: none;
  color: ${p => p.theme.colors.primary.hex};
`;

export const TextButton = ({
  text,
  onClick,
  size = 'normal',
  type = 'button'
}: ButtonProps) => (
  <StyledTextButton type={type} size={size} onClick={onClick}>
    {text}
  </StyledTextButton>
);

const StyledButton = styled(BaseButton)<StyledButtonProps>`
  background-color: ${p =>
    p.disabled ? '#EEE' : p.theme.colors.primary.hues[0]};
  color: #222;
  width: 100%;
  font-weight: 700;
  border: 1px solid
    ${p => (p.disabled ? '#CCC' : p.theme.colors.primary.hues[0])};
  box-shadow: ${p => p.theme.boxShadow};
`;

export const Button = ({
  text,
  onClick,
  size = 'large',
  disabled = false,
  type = 'button'
}: ButtonProps) => (
  <StyledButton type={type} size={size} onClick={onClick} disabled={disabled}>
    {text}
  </StyledButton>
);

const StyledNavButton = styled(StyledButton)<StyledNavButtonProps>`
  text-decoration: none;
  display: block;
`;

export const NavButton = ({
  text,
  size = 'large',
  disabled = false,
  type = 'button',
  to
}: NavButtonProps) => (
  <StyledNavButton
    as={Link}
    to={to}
    type={type}
    size={size}
    disabled={disabled}
  >
    {text}
  </StyledNavButton>
);
