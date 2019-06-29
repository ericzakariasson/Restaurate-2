import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import { MapPin, FileText } from 'react-feather';

const List = styled.ul`
  list-style: none;
  display: flex;
  margin: 40px 0;
`;

const Item = styled.li`
  cursor: pointer;
  width: 50%;

  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
`;

const Label = styled.span`
  color: #666;
  margin-bottom: 5px;
  font-size: 1.1rem;
`;

interface BoxProps {
  disabled: boolean;
}

const Box = styled.h2<BoxProps>`
  width: 100%;
  background: ${p => (p.disabled ? '#FCFCFC' : '#FFF')};
  color: #222;
  border-radius: 3px;
  border: 1px solid;
  border-color: ${p => (p.disabled ? '#DDD' : '#222')};
  box-shadow: ${p => p.theme.boxShadow};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 3px 3px 0 #eee;
`;

interface PlacesAndVisitsProps {
  placeCount: number;
  visitCount: number;
}

export const PlacesAndVisits = ({
  placeCount,
  visitCount
}: PlacesAndVisitsProps) => {
  return (
    <List>
      <Item>
        <StyledLink to={routes.places}>
          <Label>Ställen</Label>
          <Box disabled={placeCount === 0}>{placeCount}</Box>
        </StyledLink>
      </Item>
      <Item>
        <StyledLink to={routes.visits}>
          <Label>Besök</Label>
          <Box disabled={visitCount === 0}>{visitCount}</Box>
        </StyledLink>
      </Item>
    </List>
  );
};
