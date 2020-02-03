import { ActionButton, Input } from 'components';
import { Tag, useUpdatePlaceMutation } from 'graphql/types';
import { useModal } from 'hooks';
import * as React from 'react';
import { Edit } from 'react-feather';
import styled from 'styled-components';
import { EditTagsModal } from './EditTagsModal';
import { InputBlock, EmptyValue } from './InputBlock';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const TagItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  background: #f5f5f5;

  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;

const TagName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #222;
`;

interface TagsProps {
  tags: Tag[];
  providerId: string;
}

export const Tags = ({ tags, providerId }: TagsProps) => {
  const [input, setInput] = React.useState('');
  const { open, close, isOpen } = useModal({ defaultOpen: true });

  const [updatePlace, { loading: saving }] = useUpdatePlaceMutation();

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

  return (
    <>
      <EditTagsModal open={isOpen} onClose={close} tags={tags} />
      <InputBlock label="Taggar">
        <List>
          {tags.length > 0 ? (
            tags.map(tag => (
              <TagItem key={tag.id}>
                <TagName>{tag.name}</TagName>
              </TagItem>
            ))
          ) : (
            <EmptyValue>Inga taggar</EmptyValue>
          )}
        </List>
        <ActionButton onClick={open} icon={Edit} />
      </InputBlock>
    </>
  );
};
