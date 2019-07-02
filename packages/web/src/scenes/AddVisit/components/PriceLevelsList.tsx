import * as React from 'react';
import styled from 'styled-components';

import { PriceLevelButton } from './PriceLevelButton';
import {
  getFormattedPriceLevels,
  PriceLevelProps
} from '../../../utils/priceLevelHelpers';

const List = styled.ul`
  list-style: none;
  margin-bottom: 30px;

  column-count: 2;
  column-gap: 10px;
`;

interface PriceLevelListProps {
  selectedPriceLevel: number | undefined;
  setPriceLevel: (level: number) => void;
  resetPriceLevel: () => void;
}

export const PriceLevelList = ({
  selectedPriceLevel,
  setPriceLevel,
  resetPriceLevel
}: PriceLevelListProps) => {
  const formattedPriceLevels = getFormattedPriceLevels();

  const handleClick = (priceLevel: PriceLevelProps) => {
    if (priceLevel.value === selectedPriceLevel) {
      resetPriceLevel();
    } else {
      setPriceLevel(priceLevel.value);
    }
  };

  return (
    <List>
      {formattedPriceLevels.map(priceLevel => (
        <PriceLevelButton
          key={priceLevel.value}
          priceLevel={priceLevel}
          selected={priceLevel.value === selectedPriceLevel}
          onClick={() => handleClick(priceLevel)}
        />
      ))}
    </List>
  );
};
