import * as React from 'react';
import styled from 'styled-components';

import { PriceLevel } from '../../../types/place';

const List = styled.ul`
  list-style: none;
  margin-bottom: 30px;

  column-count: 2;
  column-gap: 10px;
`;

interface ItemProps {
  selected: boolean;
}

const Item = styled.li<ItemProps>`
  margin-bottom: 10px;
  border-radius: 3px;
  border: 1px solid ${p => (p.selected ? '#bbb' : '#eee')};
  outline: none;
  width: 100%;
  padding: 15px;
  background: #fcfcfc;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: ${p => p.theme.transition};
`;

const Label = styled.label``;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const Input = styled.input`
  display: none;
`;

interface CheckProps {
  selected: boolean;
}

const Check = styled.span<CheckProps>`
  display: block;
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  background: ${p => (p.selected ? p.theme.colors.primary.hex : '#eee')};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 0.25rem;
    background: #fff;
    opacity: ${p => (p.selected ? 1 : 0)};
    transition: ${p => p.theme.transition};
  }
`;

interface PlaceFormPriceLevelsProps {
  priceLevels: PriceLevel[];
  priceLevel: number | undefined;
  handleChange: (e: any) => void;
}

export const PlaceFormPriceLevels = ({
  priceLevels,
  priceLevel,
  handleChange
}: PlaceFormPriceLevelsProps) => {
  return (
    <List>
      {priceLevels.map((pl: PriceLevel) => (
        <Item key={pl.level} selected={priceLevel === pl.level}>
          <Input
            name="priceLevel"
            type="radio"
            id={`price-level-${pl.level}`}
            value={pl.level}
            onChange={handleChange}
            checked={pl.level === priceLevel}
          />
          <Label htmlFor={`price-level-${pl.level}`}>
            <Name>{pl.name}</Name>
            <Check selected={priceLevel === pl.level} />
          </Label>
        </Item>
      ))}
    </List>
  );
};
