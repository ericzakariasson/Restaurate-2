import * as React from 'react';
import { Modal, ModalProps, Label, Input } from 'components';
import styled from 'styled-components';
import { Tag } from 'graphql/types';
import { EmptyValue } from './InputBlock';

const Content = styled.div``;

const SearchArea = styled.div`
  padding: 0 1rem 1rem;
`;

const TagArea = styled.div`
  border-top: 1px solid #eee;
  padding: 1rem 1rem 1.5rem;
`;

const TagList = styled.ul``;

const TagItem = styled.li``;

interface EditTagsModalProps extends ModalProps {
  tags: Tag[];
}

export const EditTagsModal: React.FC<EditTagsModalProps> = ({
  open,
  onClose,
  tags
}) => {
  const [value, setValue] = React.useState('');

  return (
    <Modal open={open} onClose={onClose} title="Taggar">
      <Content>
        <SearchArea>
          <Label text="Sök eller lägg till" />
          <Input value={value} onChange={e => setValue(e.target.value)} />
        </SearchArea>
        <TagArea>
          {tags.length > 0 ? (
            <TagList>
              {tags.map(tag => (
                <TagItem key={tag.id}>{tag.name}</TagItem>
              ))}
            </TagList>
          ) : (
            <EmptyValue>Inga taggar</EmptyValue>
          )}
        </TagArea>
      </Content>
    </Modal>
  );
};
