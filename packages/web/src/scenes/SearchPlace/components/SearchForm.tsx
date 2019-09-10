import * as React from 'react';
import styled from 'styled-components';
import { Input, Label } from 'components';
import { usePosition } from 'hooks';
import { Compass } from 'react-feather';

const Search = styled.button`
  padding: 10px 35px;
  box-shadow: ${p => p.theme.boxShadow};
  background: ${p => p.theme.colors.primary.hues[0]};
  border-radius: 6px;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  margin-top: 15px;
`;

const InputField = styled.div`
  margin-bottom: 15px;
`;

const SmallInput = styled(Input)`
  font-size: ${p => p.theme.fontSize.normal};
  padding: 10px 15px;
`;

const UsingPosition = styled.p`
  color: #666;
`;

const LocationFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UseManualButton = styled.button`
  padding: 5px 9px;
  margin-left: 5px;
  background: #f5f5f5;
  border-radius: 4px;
  border: none;
  color: #666;
  font-size: ${p => p.theme.fontSize.normal};
`;

const IconWrapper = styled.button`
  padding: 9px; /* To match height of <SmallInput />  */
  margin-left: 10px;
  background: #f5f5f5;
  border-radius: 6px;
  border: none;
  color: #666;
  font-size: ${p => p.theme.fontSize.normal};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface SearchPlaceFormValues {
  query: string;
  location: string;
  position: Position | null;
}

interface SearchFormProps {
  onSubmit: (values: SearchPlaceFormValues) => void;
}

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const { position, rejected } = usePosition({
    initiateOnMount: true
  });

  const positionEnabled = position && position.coords && !rejected;

  const [query, setQuery] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [usingPosition, setUsingPosition] = React.useState(false);

  React.useEffect(() => setUsingPosition(!!positionEnabled), [positionEnabled]);

  const toggleManualLocation = () => setUsingPosition(state => !state);

  const handleChange = (fn: (value: string) => void) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => fn(e.target.value);

  const handleQueryChange = handleChange(setQuery);
  const handleLocationChange = handleChange(setLocation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ query, location, position });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField>
        <Label text="Ställe" htmlFor="place" />
        <Input
          id="place"
          value={query}
          onChange={handleQueryChange}
          placeholder="Namn på ställe"
        />
      </InputField>
      {usingPosition ? (
        <UsingPosition>
          Använder din platsinformation
          <UseManualButton onClick={toggleManualLocation}>
            Ändra
          </UseManualButton>
        </UsingPosition>
      ) : (
        <InputField>
          <Label text="Plats" htmlFor="location" />
          <LocationFieldWrapper>
            <SmallInput
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Adress eller stad"
            />
            <IconWrapper type="button" onClick={toggleManualLocation}>
              <Compass />
            </IconWrapper>
          </LocationFieldWrapper>
        </InputField>
      )}
      <Search>Sök</Search>
    </form>
  );
};
