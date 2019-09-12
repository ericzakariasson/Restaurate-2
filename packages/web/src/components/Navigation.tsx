import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from 'routes';

const Nav = styled.nav`
  display: flex;
  background: #f5f5f5;
  padding: 0 10px;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Link = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: #222;
  font-size: ${p => p.theme.fontSize.normal};
  padding: 10px;
  font-weight: 700;
  white-space: nowrap;

  &.active {
    border-bottom: 2px solid #aaa;
  }
`;

export const Navigation = () => {
  return (
    <header>
      <Nav>
        <Link to={routes.dashboard}>Översikt</Link>
        <Link to={routes.places}>Ställen</Link>
        <Link to={routes.visits}>Besök</Link>
        <Link to={routes.searchPlace}>Sök ställe</Link>
        <Link to={routes.wantToVisit}>Vill besöka</Link>
      </Nav>
    </header>
  );
};
