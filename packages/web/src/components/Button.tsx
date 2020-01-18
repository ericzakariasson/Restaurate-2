import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Size } from 'style';
import { Loader } from 'react-feather';

type Type = 'submit' | 'reset' | 'button';

type Variant = 'primary' | 'secondary';

type Margin = 'top' | 'right' | 'bottom' | 'left';

type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'black'
  | 'white'
  | 'gray';

interface Props {
  text: string | React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  size?: Size;
  type?: Type;
  margin?: Margin[];
  color?: Color;
  loading?: boolean;
}
interface ButtonProps extends Props {
  variant: Variant;
}

interface NavButtonProps extends ButtonProps {
  to: string;
}

interface TextButtonProps extends Props {}

interface StyledProps {
  size: Size;
  color: Color;
}

interface StyledButtonProps extends StyledProps {
  variant: Variant;
  margin?: Margin[];
}

interface StyledNavButtonProps extends StyledButtonProps {
  to: string;
}

interface StyledTextButtonProps extends StyledProps {}

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
  small: '10px 12px',
  normal: '14px 16px',
  large: '14px 16px'
};

const BaseButton = styled.button<StyledProps>`
  border-radius: 8px;
  margin: 0;
  border: none;
  background: none;
  text-align: center;
  font-size: ${p => p.theme.fontSize[p.size]};
  padding: ${p => padding[p.size]};
  transition: ${p => p.theme.transition};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTextButton = styled(BaseButton)<StyledTextButtonProps>`
  background: none;
  color: ${p => p.theme.colors[p.color].default};
`;

export const TextButton = ({
  text,
  onClick,
  size = 'normal',
  type = 'button',
  color = 'primary'
}: TextButtonProps) => (
  <StyledTextButton type={type} size={size} onClick={onClick} color={color}>
    {text}
  </StyledTextButton>
);

const StyledButton = styled(BaseButton)<StyledButtonProps>`
  color: #222;
  width: 100%;
  font-weight: 700;
  border: 1px solid;
  box-shadow: ${p => p.theme.boxShadow};
  transition: ${p => p.theme.transition} background;

  ${p =>
    p.margin &&
    p.margin.map(direction => `margin-${direction}: 10px;`).join('\n')}

  ${p =>
    p.variant === 'primary' &&
    css`
      background-color: ${p.theme.colors[p.color].hues[0]};
      border-color: ${p.theme.colors[p.color].hues[0]};
    `}

    ${p =>
      p.variant === 'secondary' &&
      p.color === 'gray' &&
      css`
        color: #666;
        background-color: #f5f5f5;
        border: none;
      `}

    ${p =>
      p.variant === 'secondary' &&
      p.color === 'black' &&
      css`
        color: #fff;
        background-color: ${p.theme.colors.black.default};
        border: none;
      `}
  
  ${p =>
    p.variant === 'secondary' &&
    !(['white', 'gray', 'black'] as Color[]).includes(p.color) &&
    css`
      background-color: ${p.theme.colors[p.color].hues[9]};
      color: ${p.theme.colors[p.color].hues[0]};
      border: none;

      &:hover {
        background: ${p.theme.colors[p.color].hues[8]};
      }

      &:active {
        background: ${p.theme.colors[p.color].hues[7]};
      }
    `}
  
  ${p =>
    p.color === 'white' &&
    css`
      background-color: #fff;
      border-color: #eee;

      &:hover {
        background: #fcfcfc;
      }

      &:active {
        background: #eee;
      }
    `}
  
  ${p =>
    p.variant === 'primary' &&
    p.color === 'black' &&
    css`
      color: ${p.theme.colors.primary.hues[0]};
      background-color: ${p.theme.colors[p.color].hues[0]};
      border-color: ${p.theme.colors[p.color].hues[0]};
    `}
  

  ${p =>
    p.disabled &&
    css`
      box-shadow: none;
      color: rgba(0, 0, 0, 0.5);
    `}
`;

export const Button = ({
  text,
  onClick,
  variant,
  margin,
  loading,
  size = 'large',
  type = 'button',
  color = 'primary',
  disabled = false
}: ButtonProps) => (
  <StyledButton
    variant={variant}
    type={type}
    size={size}
    onClick={onClick}
    disabled={disabled || loading || (!onClick && type === 'button')}
    margin={margin}
    color={color}
  >
    {loading ? <Loader size={22} /> : text}
  </StyledButton>
);

const StyledNavButton = styled(StyledButton)<StyledNavButtonProps>`
  text-decoration: none;
  display: block;
`;

export const NavButton = ({
  text,
  to,
  variant,
  margin,
  size = 'large',
  type = 'button',
  color = 'primary'
}: NavButtonProps) => (
  <StyledNavButton
    as={Link}
    to={to}
    type={type}
    size={size}
    variant={variant}
    color={color}
    margin={margin}
  >
    {text}
  </StyledNavButton>
);
