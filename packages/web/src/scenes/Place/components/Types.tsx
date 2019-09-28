import { ActionButton } from 'components';
import {
  PlaceType,
  useAllPlaceTypesQuery,
  useUpdatePlaceMutation
} from 'graphql/types';
import * as React from 'react';
import { Check, Edit2, Loader } from 'react-feather';
import styled from 'styled-components';
import { formatPlaceType } from 'utils/format';
import { InputBlock } from './InputBlock';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const Type = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  background: #f5f5f5;
  color: #222;
  font-weight: 700;
  border-radius: 6px;

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

const iconProps = { color: '#666', size: 18 };

interface TypesProps {
  types?: PlaceType[] | null;
  providerId: string;
}

export const Types = ({ types, providerId }: TypesProps) => {
  const [editing, setEditing] = React.useState(false);

  const { data, loading } = useAllPlaceTypesQuery();

  const [updatePlace] = useUpdatePlaceMutation();

  const toggleEditing = () => setEditing(editing => !editing);

  const handleTypeChange = async ({
    target: { value, checked }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const oldTypes = (types || []) as PlaceType[];

    const valueAsPlaceType = value as PlaceType;

    const updated = checked
      ? [...oldTypes, valueAsPlaceType]
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

  return (
    <>
      <InputBlock label="Typ" noMargin={false}>
        {editing ? (
          <EditTypes
            loading={loading}
            allTypes={data && data.allPlaceTypes}
            selectedTypes={types || []}
            onChange={handleTypeChange}
          />
        ) : (
          <List>
            {types
              ? types.map(type => (
                  <Type key={type}>{formatPlaceType(type)}</Type>
                ))
              : '–'}
          </List>
        )}
        <ActionButton
          onClick={toggleEditing}
          icon={
            editing ? (
              <Check {...iconProps} size={16} />
            ) : (
              <Edit2 {...iconProps} size={16} />
            )
          }
        />
      </InputBlock>
    </>
  );
};

interface EditTypesProps {
  loading: boolean;
  allTypes?: PlaceType[];
  selectedTypes: PlaceType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditTypes = ({
  loading,
  onChange,
  allTypes,
  selectedTypes
}: EditTypesProps) => {
  return loading ? (
    <Loader {...iconProps} />
  ) : (
    <List>
      {allTypes &&
        allTypes.map(type => (
          <TypeInput
            key={type}
            type={type}
            onChange={onChange}
            selected={selectedTypes.includes(type)}
          />
        ))}
    </List>
  );
};

const TypeItem = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

interface TypeLabelProps {
  selected: boolean;
}

const TypeLabel = styled.label<TypeLabelProps>`
  display: block;
  font-size: ${p => p.theme.fontSize.normal};
  padding: 8px 12px;
  font-weight: 700;
  background: ${p => (p.selected ? '#222' : '#FFF')};
  color: ${p => (p.selected ? '#FFF' : '#222')};
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: ${p => p.theme.boxShadow};
  margin-bottom: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;

interface TypeInputProps {
  type: PlaceType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selected: boolean;
}

const TypeInput = ({ type, onChange, selected }: TypeInputProps) => {
  return (
    <TypeItem>
      <TypeLabel selected={selected}>
        {formatPlaceType(type)}
        <HiddenInput
          onChange={onChange}
          type="checkbox"
          value={type}
          name="place-type"
          checked={selected}
        />
      </TypeLabel>
    </TypeItem>
  );
};
