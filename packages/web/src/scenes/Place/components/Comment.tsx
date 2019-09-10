import * as React from 'react';
import { InputBlock } from './InputBlock';
import { ActionButton } from './ActionButton';
import { Edit2, Check, X, Loader } from 'react-feather';
import { Textarea } from 'components';
import styled from 'styled-components';
import {
  useSetCommentMutation,
  PlaceDocument,
  PlaceQuery,
  SetCommentMutation
} from 'graphql/types';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const updateComment = (providerId: string) => (
  cache: DataProxy,
  { data: result }: FetchResult<SetCommentMutation>
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

    const updatedData = {
      place: {
        ...place,
        comment: result.setComment
      }
    };

    cache.writeQuery({
      ...placeQuery,
      data: updatedData
    });
  } catch {}
};

interface CommentProps {
  comment?: string | null;
  providerId: string;
}

export const Comment = ({ comment, providerId }: CommentProps) => {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(comment || '');

  const [setComment, { loading: saving }] = useSetCommentMutation({
    update: updateComment(providerId)
  });

  const handleClick = async () => {
    await setComment({ variables: { providerId, comment: value } });
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const iconProps = { color: '#666', size: 18 };

  return (
    <>
      <InputBlock label="Kommentar">
        {comment || '–'}
        {!editing && (
          <ActionButton
            onClick={() => setEditing(true)}
            icon={<Edit2 {...iconProps} size={16} />}
          />
        )}
      </InputBlock>
      {editing && (
        <div>
          <Textarea value={value} onChange={handleChange} rows={3} />
          <Wrapper>
            <ActionButton
              onClick={() => setEditing(false)}
              icon={<X {...iconProps} />}
            />
            <ActionButton
              onClick={handleClick}
              icon={
                saving ? <Loader {...iconProps} /> : <Check {...iconProps} />
              }
            />
          </Wrapper>
        </div>
      )}
    </>
  );
};
