import { Textarea } from 'components';
import { useUpdatePlaceMutation } from 'graphql/types';
import * as React from 'react';
import { Check, Edit, Loader, X } from 'react-feather';
import styled from 'styled-components';
import { ActionButton } from '../../../components/ActionButton';
import { InputBlock, EmptyValue } from './InputBlock';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

interface CommentProps {
  comment?: string | null;
  placeId: number;
}

export const Comment = ({ comment, placeId }: CommentProps) => {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(comment || '');

  const [updatePlace, { loading: saving }] = useUpdatePlaceMutation();

  const handleClick = async () => {
    await updatePlace({
      variables: {
        placeId,
        data: {
          comment: value
        }
      }
    });
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const iconProps = { color: '#666', size: 18 };

  return (
    <>
      <InputBlock label="Kommentar">
        {comment ? <p>{comment}</p> : <EmptyValue>Ingen kommentar</EmptyValue>}
        {!editing && (
          <ActionButton onClick={() => setEditing(true)} icon={Edit} />
        )}
      </InputBlock>
      {editing && (
        <div>
          <Textarea autoFocus value={value} onChange={handleChange} rows={3} />
          <Wrapper>
            <ActionButton
              onClick={() => setEditing(false)}
              icon={X}
              iconProps={iconProps}
            />
            <ActionButton
              onClick={handleClick}
              icon={saving ? Loader : Check}
              iconProps={iconProps}
            />
          </Wrapper>
        </div>
      )}
    </>
  );
};
