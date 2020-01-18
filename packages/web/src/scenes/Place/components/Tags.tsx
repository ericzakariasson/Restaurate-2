import { Input } from 'components';
import { Tag, useUpdatePlaceMutation } from 'graphql/types';
import * as React from 'react';
import { Check, Edit2, Loader, Plus, X } from 'react-feather';
import styled from 'styled-components';
import { ActionButton } from '../../../components/ActionButton';
import { InputBlock } from './InputBlock';

const Form = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: -10px;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

interface TagProps {
  editing: boolean;
}

const TagItem = styled.li<TagProps>`
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    margin-right: ${p => (p.editing ? 10 : 6)}px;
  }
`;

const TagName = styled.span`
  line-height: 1.75rem;
`;

const TagInput = styled(Input)``;

interface TagsProps {
  tags: Tag[];
  providerId: string;
}

export const Tags = ({ tags, providerId }: TagsProps) => {
  const [editing, setEditing] = React.useState(false);
  const [input, setInput] = React.useState('');

  const [updatePlace, { loading: saving }] = useUpdatePlaceMutation();

  const toggleEditing = () => setEditing(editing => !editing);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const updateTags = async (tags: string[]) => {
    await updatePlace({
      variables: {
        providerId,
        data: {
          tags
        }
      }
    });
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === '') {
      return;
    }

    const updatedTags = tags.map(tag => tag.name).concat(input.trim());

    updateTags(updatedTags);
    setInput('');
  };

  const handleRemove = (id: string) => () => {
    const updatedTags = tags.filter(tag => tag.id !== id).map(tag => tag.name);
    updateTags(updatedTags);
  };

  const iconProps = { color: '#666', size: 18 };

  return (
    <>
      <InputBlock label="Taggar">
        <List>
          {tags.length > 0
            ? tags.map((tag, i) => (
                <TagItem key={tag.id} editing={editing}>
                  <TagName>{tag.name}</TagName>
                  {editing ? (
                    <ActionButton
                      onClick={handleRemove(tag.id)}
                      icon={X}
                      iconProps={{ ...iconProps, size: 16 }}
                    />
                  ) : (
                    i !== tags.length - 1 && ','
                  )}
                </TagItem>
              ))
            : !editing && '–'}
          {!editing && (
            <ActionButton
              onClick={toggleEditing}
              icon={Edit2}
              iconProps={{ ...iconProps, size: 16 }}
            />
          )}
        </List>
      </InputBlock>
      {editing && (
        <Form onSubmit={handleAdd}>
          <TagInput
            autoFocus
            value={input}
            onChange={handleChange}
            fontSize="normal"
          />
          <ActionButton
            disabled={saving}
            type="submit"
            icon={saving ? Loader : Plus}
            iconProps={iconProps}
          />
          <ActionButton
            onClick={() => setEditing(false)}
            icon={Check}
            iconProps={iconProps}
          />
        </Form>
      )}
    </>
  );
};
