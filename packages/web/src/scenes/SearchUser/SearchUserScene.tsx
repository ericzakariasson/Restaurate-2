import * as React from 'react';
import { Page, Input, Label } from 'components';
import { useDebounce } from 'hooks';
import { useSearchUserLazyQuery } from 'graphql/types';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { plural } from 'utils/format';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { userRoute } from 'routes';

const ResultList = styled.ul`
  margin-top: 1rem;
  list-style: none;
`;

const NoStyleLink = styled(NavLink)`
  text-decoration: none;
`;

const ResultItem = styled(animated.li)`
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 0.25rem;
  overflow: hidden;
`;

const Name = styled.p`
  padding: 1rem;
  color: #222;
  font-size: 1.15rem;
  font-weight: 500;
  padding-bottom: 0.25rem;
`;

const Stats = styled.p`
  padding: 1rem;
  color: #666;
  font-size: 0.875rem;
  padding-top: 0;
`;

export const SearchUserScene = () => {
  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);
  const storedTerm = searchParams.get('term');

  const [value, setValue] = React.useState(storedTerm ?? '');
  const term = useDebounce(value, 300);

  const [search, { data }] = useSearchUserLazyQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    history.push({ search: `term=${e.target.value}` });
  };

  React.useEffect(() => {
    if (term.length > 2) {
      search({ variables: { term, options: {} } });
    }
  }, [term, search]);

  const id = 'search-user-input';

  const searchResult = data?.searchUsers.data ?? [];

  const transitions = useTransition(searchResult, user => user.id, {
    from: { opacity: 0, height: 0, marginBottom: '0rem' },
    enter: { opacity: 1, height: 75, marginBottom: '1rem' },
    leave: { opacity: 0, height: 0, marginBottom: '0rem' }
  });

  return (
    <Page title="Sök användare">
      <Label htmlFor={id} text="För- och efternamn" />
      <Input
        id={id}
        value={value}
        onChange={handleChange}
        placeholder="Anders Svensson"
      />
      <ResultList>
        {transitions.map(({ key, props, item: user }) => (
          <ResultItem key={key} style={props}>
            <NoStyleLink to={userRoute(user.id)}>
              <Name>{user.name}</Name>
              <Stats>
                {user.placeCount} {plural('ställe', 'n', user.placeCount !== 0)}{' '}
                • {user.visitCount} besök
              </Stats>
            </NoStyleLink>
          </ResultItem>
        ))}
      </ResultList>
    </Page>
  );
};
