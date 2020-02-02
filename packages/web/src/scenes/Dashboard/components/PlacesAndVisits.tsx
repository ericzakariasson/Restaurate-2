import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../../routes';
import { Label } from 'components';

const List = styled.ul`
  list-style: none;
  display: flex;
  margin-bottom: 30px;
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

interface BoxProps {
  disabled: boolean;
}

const Box = styled.h2<BoxProps>`
  width: 100%;
  background: ${p => (p.disabled ? '#FCFCFC' : '#FFF')};
  color: #222;
  border-radius: 6px;
  box-shadow: ${p => p.theme.boxShadow};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${p => p.theme.fontSize.xxxl};
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
          <Label text="Ställen" />
          <Box disabled={placeCount === 0}>{placeCount}</Box>
        </StyledLink>
      </Item>
      <Item>
        <StyledLink to={routes.visits}>
          <Label text="Besök" />
          <Box disabled={visitCount === 0}>{visitCount}</Box>
        </StyledLink>
      </Item>
    </List>
  );
};
