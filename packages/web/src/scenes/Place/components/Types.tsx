import {
  PlaceType,
  useAllPlaceTypesQuery,
  useUpdatePlaceMutation
} from 'graphql/types';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { formatPlaceType } from 'utils/format';
import { InputBlock } from './InputBlock';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

interface TypeProps {
  selected: boolean;
}

const Type = styled.li<TypeProps>`
  font-size: 14px;
  padding: 0.5rem 1rem;
  color: #222;
  font-weight: 400;
  border-radius: 0.5rem;
  position: relative;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Dashed = styled.svg`
  position: absolute;
  top: 100%;
  height: 100%;
  top: 0;
  left: 0;

  path {
    fill: none;
    stroke: blue;
    stroke-width: 5;
    stroke-dasharray: 10, 10;
  }
`;

const iconProps = { color: '#666', size: 18 };

interface TypesProps {
  selected?: PlaceType[] | null;
  providerId: string;
}

export const Types = ({ selected, providerId }: TypesProps) => {
  const { data, loading } = useAllPlaceTypesQuery();

  const [updatePlace] = useUpdatePlaceMutation();

  const handleChange = async ({
    target: { value, checked }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const oldTypes = selected ?? [];
    const valueAsPlaceType = value as PlaceType;

    const updated = checked
      ? oldTypes.concat(valueAsPlaceType)
      : oldTypes.filter(type => type !== valueAsPlaceType);

    updatePlace({
      variables: {
        providerId,
        data: {
          types: updated
        }
      }
    });
  };

  if (loading) {
    return null;
  }

  return (
    <InputBlock label="Typ">
      <List>
        {data?.allPlaceTypes.map(type => (
          <TypeItem key={type}>
            <TypeLabel selected={selected?.includes(type)}>
              {formatPlaceType(type)}
              <HiddenInput
                onChange={handleChange}
                type="checkbox"
                value={type}
                name="place-type"
                checked={selected?.includes(type)}
              />
            </TypeLabel>
          </TypeItem>
        )) ?? '–'}
      </List>
    </InputBlock>
  );
};

const TypeItem = styled.li`
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

interface TypeLabelProps {
  selected?: boolean;
}

const TypeLabel = styled.label<TypeLabelProps>`
  font-size: 14px;
  padding: 0.5rem 1rem;
  color: #222;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px dashed #ccc;
  position: relative;
  display: block;
  margin-bottom: 0.5rem;
  transition: ${p => p.theme.transition};

  ${p =>
    p.selected &&
    css`
      border: 1px solid #222;
    `}

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;
