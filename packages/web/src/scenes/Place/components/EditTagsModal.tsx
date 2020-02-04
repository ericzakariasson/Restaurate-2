import * as React from 'react';
import { ActionButton, Input, Label, Modal, ModalProps } from 'components';
import { TagItem } from 'components/Tag';
import {
  Tag,
  useSearchTagLazyQuery,
  useUpdatePlaceMutation,
  useAddTagMutation,
  PlaceDocument,
  PlaceQuery,
  PlaceQueryVariables,
  useRemoveTagMutation
} from 'graphql/types';
import { useDebounce } from 'hooks';
import { Plus, X, Icon } from 'react-feather';
import { animated, config, useTransition } from 'react-spring';
import styled from 'styled-components';
import { EmptyValue } from './InputBlock';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 1.5rem;
`;

const SearchArea = styled.div`
  padding: 0 1rem 1rem;
`;

const TagArea = styled.div`
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const SearchResultList = styled.ul`
  list-style: none;
  padding: 0 1rem 1rem;
  flex: 1;
`;

const SearchResultItem = styled(animated.li)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
`;

interface EditTagsModalProps extends ModalProps {
  tags: Tag[];
  placeId: number;
  providerId: string;
}

export const EditTagsModal: React.FC<EditTagsModalProps> = ({
  open,
  onClose,
  tags,
  placeId,
  providerId
}) => {
  const [value, setValue] = React.useState('');
  const term = useDebounce(value, 300);

  const [search, { data, loading, called }] = useSearchTagLazyQuery();

  const [update] = useUpdatePlaceMutation();

  React.useEffect(() => {
    if (term) {
      search({
        variables: {
          term,
          ignoreIds: tags.map(t => Number(t.id))
        }
      });
    }
  }, [term, search, tags]);

  const handleSelectTag = async (tag: Tag) => {
    await update({
      variables: { placeId, data: { tags: [...tags, tag].map(t => t.name) } }
    });
  };

  const handleRemoveTag = async (tag: Tag) => {
    await update({
      variables: {
        placeId,
        data: { tags: tags.filter(t => t.id !== tag.id).map(t => t.name) }
      }
    });
  };

  const handleCreateTag = async () => {
    await update({
      variables: { placeId, data: { tags: [...tags.map(t => t.name), value] } }
    });
    setValue('');
  };

  const searchResult = data?.searchTag ?? [];

  return (
    <Modal open={open} onClose={onClose} title="Taggar">
      <Content>
        <SearchArea>
          <Label text="Sök eller lägg till" />
          <Input value={value} onChange={e => setValue(e.target.value)} />
        </SearchArea>
        <AnimatedTagList
          tags={searchResult}
          onSelect={handleSelectTag}
          icon={Plus}
        >
          {called && !loading && value.length > 0 && searchResult.length === 0 && (
            <SearchResultItem>
              <TagItem>{value}</TagItem>
              <ActionButton icon={Plus} onClick={handleCreateTag} />
            </SearchResultItem>
          )}
        </AnimatedTagList>
        <TagArea>
          <AnimatedTagList
            tags={tags}
            onSelect={handleRemoveTag}
            icon={X}
            animateIn={false}
          >
            {tags.length === 0 && <EmptyValue>Inga taggar</EmptyValue>}
          </AnimatedTagList>
        </TagArea>
      </Content>
    </Modal>
  );
};

interface AnimatedTagList {
  tags: Tag[];
  onSelect: (tag: Tag) => void;
  icon: Icon;
  animateIn?: boolean;
}

const AnimatedTagList: React.FC<AnimatedTagList> = ({
  tags,
  children,
  onSelect,
  icon,
  animateIn = true
}) => {
  const height = 48;
  const transitions = useTransition(tags, tag => tag.id, {
    from: { opacity: 0, height: 0 },
    leave: { opacity: 0, height: 0 },
    enter: { opacity: 1, height },
    config: config.slow,
    initial: animateIn ? { height } : undefined
  });
  return (
    <SearchResultList>
      {transitions.map(({ item: tag, props, key }) => (
        <SearchResultItem key={key} style={props}>
          <TagItem>{tag.name}</TagItem>
          <ActionButton icon={icon} onClick={() => onSelect(tag)} />
        </SearchResultItem>
      ))}
      {children}
    </SearchResultList>
  );
};
