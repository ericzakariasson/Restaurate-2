import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const StyledButton = styled.button`
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  background: #FFF;
  padding: 20px 0;
  border: none;
  outline: none;
`;

const ButtonText = styled.span`
  color: ${p => p.theme.action};
  font-size: 2.4rem;
`;

const Button = ({ onClick, disabled, children }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.node
}

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  background: #FFF;
  padding: 20px 0;
  border: none;
  outline: none;
  text-align: center;
`;

export const NavButton = ({ to, disabled, children }) => {
  return (
    <StyledNavLink to={to} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </StyledNavLink>
  )
}

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
}

export default Button;