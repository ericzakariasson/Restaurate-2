import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PlaceTagFragment } from 'graphql/types';
import { Score } from 'components/Card';

export const Card = styled.div`
  padding: 15px;
  background: #fefefe;
  border: 1px solid #eee;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 8px;

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

const NeutralLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #222;
`;

const Place = styled.div`
  margin-right: 15px;
  min-width: 0;
`;

const Name = styled.h3`
  font-size: ${p => p.theme.fontSize.large};
  margin-bottom: 3px;
`;

const Address = styled.p`
  /* font-weight: 600; */
  color: #666;
  font-size: ${p => p.theme.fontSize.normal};
`;

const Numbers = styled.div``;

const ScoreArea = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const VisitCount = styled.h5`
  margin-bottom: -5px;
`;

const Tags = styled.p`
  margin-top: 10px;
  font-size: ${p => p.theme.fontSize.small};
  color: #666;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`;

interface PlaceListItemProps {
  name: string;
  address: string;
  visitCount: number;
  to: string;
  averageScore: number;
  tags: PlaceTagFragment[];
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
        {tags.length > 0 && <Tags>{tags.map(t => t.name).join(', ')}</Tags>}
      </Place>
      <ScoreArea>
        <Numbers>
          <VisitCount>{visitCount} besök</VisitCount>
          <Score score={averageScore} />
        </Numbers>
      </ScoreArea>
    </NeutralLink>
  </Card>
);
