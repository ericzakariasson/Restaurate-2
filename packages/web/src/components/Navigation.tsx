import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
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

  const authenticated = data && data.me;

  return (
    <header>
      <Nav>
        <List>
          {authenticated ? (
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
        </List>
      </Nav>
    </header>
  );
});
