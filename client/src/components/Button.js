import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { animated } from 'react-spring';

const StyledButton = styled.button`
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  background: ${p => p.cta ? p.theme.action : '#FFF'};
  padding: 20px 0;
  border: none;
  outline: none;
`;

const ButtonText = styled.span`
  color: #FFF;
  font-size: 2rem;
  font-family: ${p => p.theme.font.text};
`;

const buttonShadow = rgba => `0px 4px 128px ${rgba('action', 0.16)}, 0px 4px 4px rgba(0, 0, 0, 0.16)`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  border-radius: 2px;
  box-shadow: ${p => buttonShadow(p.theme.rgba)};
  background: ${p => p.theme.action};
  padding: 15px 20px;
  width: ${p => p.width === 'auto' ? 'auto' : '100%'};
  border: none;
  outline: none;
  text-align: center;
  display: block;
`;

export const NavButton = ({ to, disabled, children, type, width, ...props }) => {
  return (
    <StyledNavLink width={width} to={to} disabled={disabled} {...props}>
      <ButtonText>{children}</ButtonText>
    </StyledNavLink>
  )
}