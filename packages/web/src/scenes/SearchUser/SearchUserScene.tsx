import * as React from 'react';
import { Page, Input, Label } from 'components';
import { useDebounce } from 'hooks';
import { useSearchUserLazyQuery } from 'graphql/types';
import { useTransition, animated } from 'react-spring';

export const SearchUserScene = () => {
  const [value, setValue] = React.useState('');
  const term = useDebounce(value, 300);

  const [search, { data }] = useSearchUserLazyQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  React.useEffect(() => {
    if (term.length > 2) {
      search({ variables: { term, options: {} } });
    }
  }, [term, search]);

  const id = 'search-user-input';

  const searchResult = data?.searchUsers.data ?? [];

  const transitions = useTransition(searchResult, user => user.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
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
      <ul>
        {transitions.map(({ key, props, item }) => (
          <animated.li key={key} style={props}>
            {item.name} <span>{item.visitCount}</span>
          </animated.li>
        ))}
      </ul>
    </Page>
  );
};
