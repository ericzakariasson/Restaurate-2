import * as React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { MePlaces_me_places } from '../queries/types/MePlaces';
import { placeRoute } from '../routes';

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

interface PlaceItemProps extends MePlaces_me_places {}

export const PlaceItem = ({ id, name, address }: PlaceItemProps) => (
  <Item>
    <StyledLink to={placeRoute(id)}>
      <Name>{name}</Name>
      <Address>{address.formatted}</Address>
    </StyledLink>
  </Item>
);
