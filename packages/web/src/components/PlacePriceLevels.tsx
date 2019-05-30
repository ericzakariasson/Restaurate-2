import React from 'react';
import styled from 'styled-components';

import { PriceLevel } from '../types/places';

const List = styled.ul`
  list-style: none;
  margin-bottom: 30px;

  column-count: 2;
  column-gap: 10px;
`;

const Item = styled.li`
  margin-bottom: 10px;
`;

interface PriceLevelButtonProps {
  selected: boolean;
}

const Button = styled.button<PriceLevelButtonProps>`
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

const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
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

interface PlacePriceLevelsProps {
  priceLevels: PriceLevel[];
  selectedPriceLevel: number | null;
  setPriceLevel: (level: number | null) => void;
}

export const PlacePriceLevels = ({
  priceLevels,
  selectedPriceLevel,
  setPriceLevel
}: PlacePriceLevelsProps) => {
  return (
    <List>
      {priceLevels.map((priceLevel: PriceLevel) => (
        <Item key={priceLevel.level}>
          <Button
            selected={priceLevel.level === selectedPriceLevel}
            onClick={() =>
              setPriceLevel(
                selectedPriceLevel === priceLevel.level
                  ? null
                  : priceLevel.level
              )
            }
          >
            <Name>{priceLevel.name}</Name>
            <Check selected={selectedPriceLevel === priceLevel.level} />
          </Button>
        </Item>
      ))}
    </List>
  );
};
