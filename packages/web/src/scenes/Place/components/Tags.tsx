import { ActionButton } from 'components';
import { TagItem } from 'components/Tag';
import { Tag } from 'graphql/types';
import { useModal } from 'hooks';
import * as React from 'react';
import { Edit } from 'react-feather';
import styled from 'styled-components';
import { EditTagsModal } from './EditTagsModal';
import { EmptyValue, InputBlock } from './InputBlock';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: -0.25rem;
`;

const TagItemWithMargin = styled(TagItem)`
  margin: 0.25rem;
`;

interface TagsProps {
  tags: Tag[];
  placeId: number;
}

export const Tags = ({ tags, placeId }: TagsProps) => {
  const { open, close, isOpen } = useModal();

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
              <TagItemWithMargin as="li" key={tag.id}>
                {tag.name}
              </TagItemWithMargin>
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
