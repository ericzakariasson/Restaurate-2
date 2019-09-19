import * as React from 'react';
import styled from 'styled-components';
import { Input, Label } from 'components';
import { usePosition } from 'hooks';

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
    color: #222;
    opacity: 0.8;
    transition: ${p => p.theme.transition};
    box-shadow: none;
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

  const [query, setQuery] = React.useState('');

  const handleChange = (fn: (value: string) => void) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => fn(e.target.value);

  const handleQueryChange = handleChange(setQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ query, position });
  };

  const isValid = !!query;

  return (
    <form onSubmit={handleSubmit}>
      <InputField>
        <Label text="Namn och plats" htmlFor="place" />
        <Input
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
