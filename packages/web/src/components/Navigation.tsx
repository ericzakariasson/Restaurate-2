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
  background: #fcfcfc;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Item = styled.li`
  &:not(:last-of-type) {
    margin-right: 5px;
  }
`;

const Link = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: #222;
  font-size: ${p => p.theme.fontSize.large};
  padding: 8px 16px;
  font-weight: 700;
  white-space: nowrap;
  border-radius: 10px;

  &.active {
    background: #eee;
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
        <List>
          {authenticated ? (
            <>
              <Item>
                <Link to={routes.dashboard}>Översikt</Link>
              </Item>
              <Item>
                <Link to={routes.places}>Ställen</Link>
              </Item>
              <Item>
                <Link to={routes.visits}>Besök</Link>
              </Item>
              <Item>
                <Link to={routes.searchPlace}>Sök ställe</Link>
              </Item>
              <Item>
                <Link to={routes.wantToVisit}>Vill besöka</Link>
              </Item>
              <Item>
                <Link to={routes.settings}>Inställningar</Link>
              </Item>
            </>
          ) : (
            <>
              <Item>
                <Link to={routes.login}>Logga in</Link>
              </Item>
              <Item>
                <Link to={routes.register}>Registrera</Link>
              </Item>
            </>
          )}
        </List>
      </Nav>
    </header>
  );
};
