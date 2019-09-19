import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from 'routes';
import { useMeQuery } from 'graphql/types';

const Nav = styled.nav`
  display: flex;
  max-width: ${p => p.theme.page.maxWidth};
  margin: 0 auto;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Link = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: #222;
  font-size: ${p => p.theme.fontSize.large};
  padding: 10px 20px;
  font-weight: 700;
  white-space: nowrap;

  &.active {
    border-bottom: 2px solid #222;
  }
`;

export const Navigation = () => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return null;
  }

  const authenticated = data && data.me;

  return (
    <header>
      <Nav>
        {authenticated ? (
          <>
            <Link to={routes.dashboard}>Översikt</Link>
            <Link to={routes.places}>Ställen</Link>
            <Link to={routes.visits}>Besök</Link>
            <Link to={routes.searchPlace}>Sök ställe</Link>
            <Link to={routes.wantToVisit}>Vill besöka</Link>
            <Link to={routes.settings}>Inställningar</Link>
          </>
        ) : (
          <>
            <Link to={routes.login}>Logga in</Link>
            <Link to={routes.register}>Registrera</Link>
          </>
        )}
      </Nav>
    </header>
  );
};
