import * as React from 'react';
import { ActionButton, Input, Label, Modal, ModalProps } from 'components';
import { TagItem } from 'components/Tag';
import {
  Tag,
  useSearchTagLazyQuery,
  useUpdatePlaceMutation
} from 'graphql/types';
import { useDebounce } from 'hooks';
import { Plus } from 'react-feather';
import { animated, config, useTransition } from 'react-spring';
import styled from 'styled-components';
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

const SearchResultList = styled.ul`
  list-style: none;
  padding: 0 1rem 1rem;
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
}

export const EditTagsModal: React.FC<EditTagsModalProps> = ({
  open,
  onClose,
  tags,
  placeId
}) => {
  const [value, setValue] = React.useState('ka');
  const term = useDebounce(value, 300);

  const [search, { data, loading }] = useSearchTagLazyQuery();

  const [update] = useUpdatePlaceMutation();

  React.useEffect(() => {
    search({
      variables: {
        term,
        ignoreIds: tags.map(t => Number(t.id))
      }
    });
  }, [term, search, tags]);

  return (
    <Modal open={open} onClose={onClose} title="Taggar">
      <Content>
        <SearchArea>
          <Label text="Sök eller lägg till" />
          <Input value={value} onChange={e => setValue(e.target.value)} />
        </SearchArea>
        <SearchResult
          tags={data?.searchTag ?? []}
          onSelect={tag => {}}
          onCreate={() => {}}
          value={term}
          loading={loading}
        />
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

interface SearchResultProps {
  tags: Tag[];
  onSelect: (tag: Tag) => void;
  onCreate: () => void;
  value: string;
  loading: boolean;
}

const SearchResult: React.FC<SearchResultProps> = ({
  tags,
  onSelect,
  value,
  onCreate,
  loading
}) => {
  const transitions = useTransition(tags, tag => tag.id, {
    from: { opacity: 0, height: 0 },
    leave: { opacity: 0, height: 0 },
    enter: () => ({ opacity: 1, height: 48 }),
    config: config.slow
  });
  return (
    <SearchResultList>
      {transitions.map(({ item: tag, props, key }) => (
        <SearchResultItem key={key} style={props}>
          <TagItem>{tag.name}</TagItem>
          <ActionButton icon={Plus} onClick={() => onSelect(tag)} />
        </SearchResultItem>
      ))}
      {!loading && tags.length === 0 && (
        <SearchResultItem>
          <TagItem>{value}</TagItem>
          <ActionButton icon={Plus} onClick={onCreate} />
        </SearchResultItem>
      )}
    </SearchResultList>
  );
};
