import { Textarea } from 'components';
import { useUpdatePlaceMutation } from 'graphql/types';
import * as React from 'react';
import { Check, Edit2, Loader, X } from 'react-feather';
import styled from 'styled-components';
import { ActionButton } from '../../../components/ActionButton';
import { InputBlock } from './InputBlock';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

interface CommentProps {
  comment?: string | null;
  providerId: string;
}

export const Comment = ({ comment, providerId }: CommentProps) => {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(comment || '');

  const [updatePlace, { loading: saving }] = useUpdatePlaceMutation();

  const handleClick = async () => {
    await updatePlace({
      variables: {
        providerId,
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
          <Textarea autoFocus value={value} onChange={handleChange} rows={3} />
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
