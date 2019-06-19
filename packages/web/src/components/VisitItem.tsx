import * as React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { MeVisits_me_visits } from '../queries/types/MeVisits';

const Item = styled.li`
  padding: 15px;
  background: #fefefe;
  border: 1px solid #999;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 4px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: #222;
`;

const Place = styled.div``;

const Name = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 3px;
`;

const Address = styled.p``;

const Score = styled.h4`
  font-size: 2.4rem;
  font-weight: 400;
`;

const Order = styled.li``;

interface VisitItemProps extends MeVisits_me_visits {}

export const VisitItem = ({
  id,
  visitDate,
  place,
  rate,
  orders
}: VisitItemProps) => (
  <Item>
    <StyledLink to={`/visit/${id}`}>
      <Place>
        <Name>{place.name}</Name>
        <Address>{place.address.formatted}</Address>
      </Place>
      <Score>{rate.score}</Score>
      {orders &&
        orders
          .slice(0, 3)
          .map(order => <Order key={order.id}>{order.title}</Order>)}
    </StyledLink>
  </Item>
);
