import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Score } from 'components/Card';
import { PlaceInfo } from 'components/PlaceInfo';
import { Tag } from 'graphql/types';

export const Card = styled.div`
  padding: 1rem;
  background: #fefefe;
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
  flex: 1;
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
  font-weight: 600;
  text-align: right;
  font-size: ${p => p.theme.fontSize.small};
`;

const TagList = styled.ul`
  list-style: none;
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  overflow: hidden;
  position: relative;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3rem;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
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

const TAG_LIMIT = 5;

interface PlaceListItemProps {
  name: string | undefined;
  address: string | undefined;
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
        <PlaceInfo name={name} address={address} />
        {tags.length > 0 && (
          <TagList>
            {tags.slice(0, TAG_LIMIT).map(t => (
              <TagItem key={t.id}>{t.name}</TagItem>
            ))}
          </TagList>
        )}
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
