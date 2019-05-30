import React from 'react';
import styled from 'styled-components';

import { PriceLevel } from '../types/places';

const PriceLevelList = styled.ul`
  display: flex;
  list-style: none;
  margin-bottom: 15px;
`;

const PriceLevelItem = styled.li`
  flex: 1;

  &:not(:last-of-type) {
    margin-right: 5px;
  }
`;

interface PriceLevelButtonProps {
  active: boolean;
}

const PriceLevelButton = styled.button<PriceLevelButtonProps>`
  border-radius: 3px;
  border: none;
  outline: none;
  width: 100%;
  padding: 7px 5px;
  background: ${p => (p.active ? '#222' : '#F5F5F5')};
  color: ${p => (p.active ? '#F5F5F5' : '#222')};
  font-size: 0.9rem;
  font-weight: 600;
`;

interface PlacePriceLevelsProps {
  priceLevels: PriceLevel[];
  activePriceLevel: number | null;
  setPriceLevel: (level: number | null) => void;
}

export const PlacePriceLevels = ({
  priceLevels,
  activePriceLevel,
  setPriceLevel
}: PlacePriceLevelsProps) => {
  return (
    <PriceLevelList>
      {priceLevels.map((priceLevel: PriceLevel) => (
        <PriceLevelItem key={priceLevel.level}>
          <PriceLevelButton
            active={priceLevel.level === activePriceLevel}
            onClick={() =>
              setPriceLevel(
                activePriceLevel === priceLevel.level ? null : priceLevel.level
              )
            }
          >
            {priceLevel.name}
          </PriceLevelButton>
        </PriceLevelItem>
      ))}
    </PriceLevelList>
  );
};
