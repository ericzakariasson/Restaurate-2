import * as React from 'react';
import styled from 'styled-components';
import { PlaceTagFragment } from 'graphql/types';
import { InputBlock } from './InputBlock';
import { ActionButton } from './ActionButton';
import { Check, X, Plus } from 'react-feather';

const Input = styled.input`
  font-size: 1.375rem;
  border: none;
  padding: none;
  margin: 0;
  flex: 0;
  width: auto;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const List = styled.ul``;

const Tag = styled.li``;

interface TagsProps {
  tags: PlaceTagFragment[] | null;
}

export const Tags = ({ tags }: TagsProps) => {
  const [editing, setEditing] = React.useState(false);

  const [value, setValue] = React.useState('');

  const toggleEditing = () => setEditing(editing => !editing);

  const iconProps = { color: '#666', size: 18 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <InputBlock label="Taggar">
      {tags && tags.length > 0 ? (
        <List>
          {tags.map(tag => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </List>
      ) : (
        !editing && '–'
      )}
      {editing && (
        <Form onSubmit={handleSubmit}>
          <Input value={value} onChange={handleChange} />
          <ActionButton type="submit" icon={<Check {...iconProps} />} />
        </Form>
      )}
      <ActionButton
        onClick={toggleEditing}
        icon={editing ? <X {...iconProps} /> : <Plus {...iconProps} />}
      />
    </InputBlock>
  );
};
