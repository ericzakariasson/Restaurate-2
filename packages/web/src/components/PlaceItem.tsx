import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { formatDate } from '../utils/format';

import { MePlaces_me_places } from '../queries/types/MePlaces';
import { placeRoute } from '../routes';

const Item = styled.li`
  background: #fcfcfc;
  box-shadow: ${p => p.theme.boxShadow};
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #222;
  border: 1px solid #999;
  /* border-radius: 4px 4px 0 0; */
  border-radius: 4px;
`;

const Place = styled.div``;

const Name = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 3px;
`;

const Address = styled.p``;

const Numbers = styled.div``;

const Score = styled.h4`
  font-size: 2.4rem;
  font-weight: 400;
  margin-top: -5px;
`;

const VisitCount = styled.h5``;

const VisitList = styled.ul`
  background: #fff;
  border-radius: 0 0 4px 4px;
  border: 1px solid #ccc;
  border-top: none;
`;

const VisitItem = styled.li`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`;

const VisitDate = styled.span``;
const VisitScore = styled.span``;

interface PlaceItemProps extends MePlaces_me_places {}

export const PlaceItem = ({
  id,
  slug,
  name,
  address,
  averageScore,
  visitCount,
  visits
}: PlaceItemProps) => (
  <Item>
    <StyledLink to={placeRoute(slug)}>
      <Place>
        <Name>{name}</Name>
        <Address>{address.formatted}</Address>
      </Place>
      <Numbers>
        <VisitCount>{visitCount} besök</VisitCount>
        <Score>{averageScore}</Score>
      </Numbers>
    </StyledLink>
    {/* <VisitList>
      {visits.map(visit => (
        <VisitItem>
          <VisitDate>{formatDate(visit.visitDate)}</VisitDate>
          <VisitScore>{visit.rate.score}</VisitScore>
        </VisitItem>
      ))}
    </VisitList> */}
  </Item>
);
