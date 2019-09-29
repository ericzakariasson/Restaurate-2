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

  const search = (values: SearchPlaceFormValues) => {
    onSubmit(values);

    const searchParams = qs.stringify({ q: values.query });

    history.push({ search: searchParams });

    trackEvent({
      category: 'Search',
      action: 'Search Place'
    });
  };

  React.useEffect(() => {
    const { search: searchParams } = location;
    const parsed = qs.parse(searchParams);
    setQuery(parsed.q as string);

    if (parsed.q) {
      search({ query: parsed.q as string, position });
    }
  }, []);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    search({ query, position });
  };

  const handleChange = (fn: (value: string) => void) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => fn(e.target.value);

  const handleQueryChange = handleChange(setQuery);

  const isValid = !!query;

  return (
    <form onSubmit={handleSubmit}>
      <InputField>
        <Label text="Namn och plats" htmlFor="place" />
        <Input
          autoFocus
          id="place"
          value={query}
          onChange={handleQueryChange}
          placeholder="Namn på ställe"
        />
      </InputField>
      <SearchButton disabled={!isValid}>Sök</SearchButton>
    </form>
  );
};
