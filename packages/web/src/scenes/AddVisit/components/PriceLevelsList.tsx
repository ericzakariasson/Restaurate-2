import * as React from 'react';
import styled from 'styled-components';

import { PriceLevelButton } from './PriceLevelButton';
import { PriceLevel } from '../../../graphql/types';

const List = styled.ul`
  list-style: none;
  margin-bottom: 30px;

  column-count: 2;
  column-gap: 10px;
`;

interface PriceLevelListProps {
  selectedPriceLevel: PriceLevel | null;
  setPriceLevel: (priceLevel: PriceLevel) => void;
  resetPriceLevel: () => void;
}

export const PriceLevelList = ({
  selectedPriceLevel,
  setPriceLevel,
  resetPriceLevel
}: PriceLevelListProps) => {
  const handleClick = (priceLevel: PriceLevel) => {
    if (priceLevel === selectedPriceLevel) {
      resetPriceLevel();
    } else {
      setPriceLevel(priceLevel);
    }
  };

  return (
    <List>
      {Object.entries(PriceLevel).map(([key, priceLevel]) => (
        <PriceLevelButton
          key={priceLevel.value}
          priceLevel={priceLevel}
          selected={priceLevel === selectedPriceLevel}
          onClick={() => handleClick(priceLevel)}
        />
      ))}
    </List>
  );
};
