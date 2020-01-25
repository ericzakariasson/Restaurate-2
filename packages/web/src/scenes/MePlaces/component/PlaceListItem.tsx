import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Tag } from 'graphql/types';
import { Score } from 'components/Card';

export const Card = styled.div`
  padding: 1rem;
  background: #fefefe;
  border: 1px solid #eee;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 0.5rem;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const NeutralLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: #222;
`;

const Place = styled.div`
  margin-right: 15px;
  min-width: 0;
`;

const Name = styled.h3`
  font-size: ${p => p.theme.fontSize.large};
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Address = styled.p`
  font-weight: 400;
  color: ${p => p.theme.colors.black.default};
  font-size: ${p => p.theme.fontSize.small};
`;

const Numbers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ScoreArea = styled.div`
  display: flex;
  flex-shrink: 0;
  text-align: right;
`;

const VisitCount = styled.h5`
  margin-top: 0.5rem;
  text-align: right;
`;

const TagList = styled.ul`
  list-style: none;
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
`;

const TagItem = styled.li`
  background: #f5f5f5;
  padding: 0.25rem 0.375rem;
  font-size: 0.75rem;
  color: #666;
  font-weight: 700;
  border-radius: 0.25rem;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  white-space: pre;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const TagCount = styled.span`
  font-weight: 600;
  font-size: 0.75rem;
  color: ${p => p.theme.colors.black.default};
`;

interface PlaceListItemProps {
  name: string;
  address: string;
  visitCount: number;
  to: string;
  averageScore?: number | null;
  tags: Tag[];
}

export const PlaceListItem = ({
  name,
  to,
  address,
  visitCount,
  averageScore,
  tags
}: PlaceListItemProps) => (
  <Card>
    <NeutralLink to={to}>
      <Place>
        <Name>{name}</Name>
        <Address>{address}</Address>
        <TagList>
          {tags.slice(0, 3).map(t => (
            <TagItem key={t.id}>{t.name}</TagItem>
          ))}
          {tags.length > 3 && <TagCount>+{tags.length - 3}</TagCount>}
        </TagList>
      </Place>
      <ScoreArea>
        <Numbers>
          <Score score={averageScore} />
          <VisitCount>{visitCount} besök</VisitCount>
        </Numbers>
      </ScoreArea>
    </NeutralLink>
  </Card>
);
