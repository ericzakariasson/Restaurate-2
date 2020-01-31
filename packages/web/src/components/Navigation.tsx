import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from 'routes';
import { useMeQuery, UserRole } from 'graphql/types';
import 'scroll-behavior-polyfill';

const Nav = styled.nav`
  display: flex;
  max-width: ${p => p.theme.page.maxWidth};
  margin: 0 auto;
  overflow-x: scroll;
  background: #fcfcfc;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;

const Item = styled.li`
  padding: 0.5rem 0;

  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;

const Link = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: #222;
  font-size: ${p => p.theme.fontSize.normal};
  padding: 0.5rem 1rem;
  font-weight: 700;
  white-space: nowrap;
  border-radius: 0.5rem;
  transition: ${p => p.theme.transition};
  font-weight: 600;

  &.active {
    background: #eee;
    transition: ${p => p.theme.transition};
  }
`;

const menuItems = [
  {
    to: routes.dashboard,
    name: 'Översikt'
  },
  {
    to: routes.places,
    name: 'Ställen'
  },
  {
    to: routes.visits,
    name: 'Besök'
  },
  {
    to: routes.searchPlace,
    name: 'Sök ställe'
  },
  {
    to: routes.wantToVisit,
    name: 'Vill besöka'
  },
  {
    to: routes.settings,
    name: 'Inställningar'
  }
];

export const Navigation = withRouter(({ location }) => {
  const { data, loading } = useMeQuery();

  const refs = React.useRef<React.RefObject<HTMLLIElement>[]>(
    menuItems.map(() => React.createRef<HTMLLIElement>())
  );

  React.useEffect(() => {
    const found = refs.current.find(
      ref => ref.current && ref.current.id === location.pathname
    );

    if (found && found.current) {
      found.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center'
      });
    }
  }, [location.pathname]);

  if (loading) {
    return null;
  }

  const isAuthenticated = data && data.me && data.me.confirmed;

  return (
    <header>
      <Nav>
        <List>
          {isAuthenticated ? (
            menuItems.map((item, i) => (
              <Item key={item.to} ref={refs.current[i]} id={item.to}>
                <Link to={item.to}>{item.name}</Link>
              </Item>
            ))
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
          {isAuthenticated && data!.me!.roles.includes(UserRole.Admin) && (
            <Item>
              <Link to={routes.admin.metrics}>Metrics</Link>
            </Item>
          )}
        </List>
      </Nav>
    </header>
  );
});
