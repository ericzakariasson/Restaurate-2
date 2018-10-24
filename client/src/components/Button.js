import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { animated } from 'react-spring';

const buttonShadow = rgba => `0px 4px 128px ${rgba('action', 0.16)}, 0px 4px 4px rgba(0, 0, 0, 0.16)`;

const StyledButton = styled.button`
  border-radius: 2px;
  box-shadow: ${p => buttonShadow(p.theme.rgba)};
  background: ${p => p.theme.action};
  padding: 15px 20px;
  width: ${p => p.width === 'auto' ? 'auto' : '100%'};
  border: none;
  outline: none;
  text-align: center;
  display: block;
  cursor: pointer;
  text-decoration: none;
`;

const ButtonText = styled.span`
  color: #FFF;
  font-size: 2rem;
  font-weight: 700;
  font-family: ${p => p.theme.font.text};
`;

export const NavButton = ({ to, disabled, children, type, width, ...props }) => {
  return (
    <StyledButton as={NavLink} width={width} to={to} disabled={disabled} {...props}>
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  )
}

const Button = ({ onClick, children, width, ...props}) => {
  return (
    <StyledButton onClick={onClick} width={width} {...props}>
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  )
}

export default Button;