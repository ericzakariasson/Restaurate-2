import * as React from 'react';
import styled from 'styled-components';
import {
  PlaceTagFragment,
  useAddTagMutation,
  AddTagMutation,
  PlaceDocument,
  PlaceQuery
} from 'graphql/types';
import { InputBlock } from './InputBlock';
import { ActionButton } from './ActionButton';
import { Check, X, Plus, Loader } from 'react-feather';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { useArray } from 'hooks';

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
  tags: PlaceTagFragment[];
  providerId: string;
}

export const Tags = ({ tags, providerId }: TagsProps) => {
  const [editing, setEditing] = React.useState(false);
  const [input, setInput] = React.useState('');

  const toggleEditing = () => setEditing(editing => !editing);

  const [addTag, { loading: saving }] = useAddTagMutation({
    update: (
      cache: DataProxy,
      { data: result }: FetchResult<AddTagMutation>
    ) => {
      try {
        if (!result) {
          throw new Error('No result');
        }

        const placeQuery = {
          query: PlaceDocument,
          variables: { providerId }
        };

        const data = cache.readQuery<PlaceQuery>(placeQuery);

        if (!data || !data.place) {
          throw new Error('No query data');
        }

        const newTag = result.addTag;
        data.place.tags.push(newTag);

        cache.writeQuery({
          ...placeQuery,
          data
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === '') {
      return;
    }

    try {
      await addTag({ variables: { providerId, name: input } });
      setInput('');
    } catch {}
  };

  const iconProps = { color: '#666', size: 18 };

  return (
    <InputBlock label="Taggar">
      {tags.length > 0 ? (
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
          <Input value={input} onChange={handleChange} />
          <ActionButton
            disabled={saving}
            type="submit"
            icon={saving ? <Loader {...iconProps} /> : <Check {...iconProps} />}
          />
        </Form>
      )}
      <ActionButton
        onClick={toggleEditing}
        icon={editing ? <X {...iconProps} /> : <Plus {...iconProps} />}
      />
    </InputBlock>
  );
};
