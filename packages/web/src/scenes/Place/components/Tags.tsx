import * as React from 'react';
import styled, { css } from 'styled-components';
import {
  PlaceTagFragment,
  useAddTagMutation,
  AddTagMutation,
  PlaceDocument,
  PlaceQuery,
  useRemoveTagMutation,
  RemoveTagMutation
} from 'graphql/types';
import { InputBlock } from './InputBlock';
import { ActionButton } from './ActionButton';
import { Check, X, Plus, Loader, Edit, Edit2, Edit3 } from 'react-feather';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { Input } from 'components';

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

const Tag = styled.li<TagProps>`
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

const updateAddTag = (providerId: string) => (
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

    const { place } = data;

    const newTag = result.addTag;

    const duplicate = place.tags.some(tag => tag.id === newTag.id);

    if (duplicate) {
      return;
    }

    const updatedData = {
      place: {
        ...place,
        tags: [...(place.tags || []), newTag]
      }
    };

    cache.writeQuery({
      ...placeQuery,
      data: updatedData
    });
  } catch (e) {
    console.error(e);
  }
};

const updateRemoveTag = (providerId: string) => (
  cache: DataProxy,
  { data: result }: FetchResult<RemoveTagMutation>
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

    const { place } = data;
    const removedId = result.removeTag;

    const updatedData = {
      place: {
        ...place,
        tags: place.tags.filter(tag => tag.id !== removedId.toString())
      }
    };

    cache.writeQuery({
      ...placeQuery,
      data: updatedData
    });
  } catch (e) {
    console.error(e);
  }
};

interface TagsProps {
  tags: PlaceTagFragment[];
  providerId: string;
}

export const Tags = ({ tags, providerId }: TagsProps) => {
  const [editing, setEditing] = React.useState(false);
  const [input, setInput] = React.useState('');

  const toggleEditing = () => setEditing(editing => !editing);

  const [addTag, { loading: saving }] = useAddTagMutation({
    update: updateAddTag(providerId)
  });

  const [removeTag, { loading: removing }] = useRemoveTagMutation({
    update: updateRemoveTag(providerId)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === '') {
      return;
    }

    addTag({ variables: { providerId, name: input } });
    setInput('');
  };

  const handleRemove = (id: string) => () => {
    removeTag({ variables: { providerId, tagId: Number(id) } });
  };

  const iconProps = { color: '#666', size: 18 };

  return (
    <>
      <InputBlock label="Taggar">
        <List>
          {tags.length > 0
            ? tags.map((tag, i) => (
                <Tag key={tag.id} editing={editing}>
                  <TagName>{tag.name}</TagName>
                  {editing ? (
                    <ActionButton
                      onClick={handleRemove(tag.id)}
                      icon={<X {...iconProps} size={16} />}
                    />
                  ) : (
                    i !== tags.length - 1 && ','
                  )}
                </Tag>
              ))
            : !editing && '–'}
          {!editing && (
            <ActionButton
              onClick={toggleEditing}
              icon={<Edit2 {...iconProps} size={16} />}
            />
          )}
        </List>
      </InputBlock>
      {editing && (
        <Form onSubmit={handleAdd}>
          <TagInput value={input} onChange={handleChange} fontSize="normal" />
          <ActionButton
            disabled={saving}
            type="submit"
            icon={saving ? <Loader {...iconProps} /> : <Plus {...iconProps} />}
          />
          <ActionButton
            onClick={() => setEditing(false)}
            icon={<Check {...iconProps} />}
          />
        </Form>
      )}
    </>
  );
};
