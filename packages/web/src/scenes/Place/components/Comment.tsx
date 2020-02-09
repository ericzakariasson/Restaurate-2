import { Modal, Textarea } from 'components';
import { useUpdatePlaceMutation } from 'graphql/types';
import { useModal } from 'hooks';
import * as React from 'react';
import { Edit } from 'react-feather';
import { ActionButton } from '../../../components/ActionButton';
import { EmptyValue, InputBlock } from './InputBlock';
import styled from 'styled-components';

const ModalContent = styled.div`
  padding: 0 1rem 1.5rem;
`;

interface CommentProps {
  comment?: string | null;
  placeId: number;
}

export const Comment = ({ comment, placeId }: CommentProps) => {
  const [value, setValue] = React.useState(comment || '');

  const [updatePlace] = useUpdatePlaceMutation();

  const saveComment = async () => {
    await updatePlace({
      variables: {
        placeId,
        data: {
          comment: value
        }
      }
    });
  };

  const { open, isOpen, close } = useModal();

  const handleClose = () => {
    close();
    saveComment();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  return (
    <>
      <Modal open={isOpen} onClose={handleClose} title="Kommentar">
        <ModalContent>
          <Textarea autoFocus value={value} onChange={handleChange} rows={5} />
        </ModalContent>
      </Modal>
      <InputBlock label="Kommentar">
        {comment ? <p>{comment}</p> : <EmptyValue>Ingen kommentar</EmptyValue>}
        <ActionButton onClick={open} icon={Edit} />
      </InputBlock>
    </>
  );
};
