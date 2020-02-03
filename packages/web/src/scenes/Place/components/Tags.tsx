import { ActionButton, Input } from 'components';
import { Tag, useUpdatePlaceMutation } from 'graphql/types';
import { useModal } from 'hooks';
import * as React from 'react';
import { Edit } from 'react-feather';
import styled from 'styled-components';
import { EditTagsModal } from './EditTagsModal';
import { InputBlock, EmptyValue } from './InputBlock';
import { TagItem } from 'components/Tag';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

interface TagsProps {
  tags: Tag[];
  placeId: number;
}

export const Tags = ({ tags, placeId }: TagsProps) => {
  const { open, close, isOpen } = useModal({ defaultOpen: true });

  return (
    <>
      <EditTagsModal
        open={isOpen}
        onClose={close}
        tags={tags}
        placeId={placeId}
      />
      <InputBlock label="Taggar">
        <List>
          {tags.length > 0 ? (
            tags.map(tag => (
              <TagItem as="li" key={tag.id}>
                {tag.name}
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
