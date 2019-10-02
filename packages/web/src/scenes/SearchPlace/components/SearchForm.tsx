import * as React from 'react';
import styled from 'styled-components';
import { Input, Label } from 'components';
import { usePosition } from 'hooks';
import { trackEvent } from 'analytics/trackEvent';
import { useHistory, useLocation } from 'react-router-dom';

const SearchButton = styled.button`
  padding: 10px 35px;
  box-shadow: ${p => p.theme.boxShadow};
  background: ${p => p.theme.colors.primary.default};
  border-radius: 8px;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  width: 50%;
  max-width: 180px;
  transition: ${p => p.theme.transition};

  &:disabled {
    color: #444;
    transition: ${p => p.theme.transition};
  }
`;

const InputField = styled.div`
  margin-bottom: 15px;
`;

export interface SearchPlaceFormValues {
  query: string;
  position: Position | null;
}

interface SearchFormProps {
  onSubmit: (values: SearchPlaceFormValues) => void;
}

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const { position } = usePosition({
    initiateOnMount: true
  });

  const [searched, setSearched] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  const [query, setQuery] = React.useState('');

  const search = React.useCallback(
    (query: string) => {
      if (!query.trim()) {
        return;
      }

      const searchParams = new URLSearchParams({ q: query });
      history.push({ search: searchParams.toString() });

      onSubmit({ query, position });
      trackEvent({
        category: 'Search',
        action: 'Search Place'
      });

      setSearched(true);
    },
    [history, onSubmit, position]
  );

  React.useEffect(() => {
    if (searched) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const urlQuery = searchParams.get('q');

    if (urlQuery && query === '') {
      setQuery(urlQuery);
      search(urlQuery);
    }
  }, [location, query, searched, search]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    search(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const isValid = !!query;

  return (
    <form onSubmit={handleSubmit}>
      <InputField>
        <Label text="Namn och plats" htmlFor="place" />
        <Input
          autoFocus
          id="place"
          value={query}
          onChange={handleChange}
          placeholder="Namn på ställe"
        />
      </InputField>
      <SearchButton disabled={!isValid}>Sök</SearchButton>
    </form>
  );
};
