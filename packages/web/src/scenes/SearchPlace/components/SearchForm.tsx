import * as React from 'react';
import styled from 'styled-components';
import { Input, Label } from 'components';
import { usePosition } from 'hooks';
import { trackEvent } from 'analytics/trackEvent';
import * as qs from 'query-string';
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

  const history = useHistory();
  const location = useLocation();

  const [query, setQuery] = React.useState('');

  const search = React.useCallback(
    (values: SearchPlaceFormValues) => {
      onSubmit(values);

      const searchParams = qs.stringify({ q: values.query });

      history.push({ search: searchParams });

      trackEvent({
        category: 'Search',
        action: 'Search Place'
      });
    },
    [history, onSubmit]
  );

  React.useEffect(() => {
    const { search: searchParams } = location;
    const parsed = qs.parse(searchParams);
    const q = (parsed.q as string) || '';
    setQuery(q);

    if (parsed.q) {
      search({ query: q, position });
    }
  }, [location, position, search]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    search({ query, position });
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
