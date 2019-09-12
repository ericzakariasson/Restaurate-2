import * as React from 'react';
import { InputBlock } from './InputBlock';
import {
  PriceLevel,
  useSetPriceLevelMutation,
  PlaceDocument,
  PlaceQuery,
  SetPriceLevelMutation
} from 'graphql/types';
import { formatPriceLevel } from 'utils/format';
import { ActionButton } from './ActionButton';
import { ChevronDown } from 'react-feather';
import styled, { css } from 'styled-components';
import { useDevice } from 'hooks';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';

interface SelectProps {
  hide: boolean;
}

const StyledSelect = styled.select<SelectProps>`
  font-size: 1.375rem; /* Prevent mobile browser from zooming in */
  margin-top: 5px;
  border: none;
  padding: 5px;
  border-radius: 5px;
  background: #f5f5f5;
  ${p =>
    p.hide &&
    css`
      appearance: none;
      position: absolute;
      height: 0;
      border: none;
      margin: 0;
      padding: 0;
    `};
`;

const priceLevelArray = Object.values(PriceLevel);

const updatePriceLevel = (providerPlaceId: string) => (
  cache: DataProxy,
  { data: result }: FetchResult<SetPriceLevelMutation>
) => {
  try {
    if (!result) {
      throw new Error('No result');
    }

    const placeQuery = {
      query: PlaceDocument,
      variables: { providerPlaceId }
    };

    const data = cache.readQuery<PlaceQuery>(placeQuery);

    if (!data || !data.place) {
      throw new Error('No query data');
    }

    const { place } = data;

    const updatedData = {
      place: {
        ...place,
        priceLevel: result.setPriceLevel
      }
    };

    cache.writeQuery({
      ...placeQuery,
      data: updatedData
    });
  } catch {}
};

interface PriceLevelProps {
  priceLevel: PriceLevel;
  providerPlaceId: string;
}

export const PriceLevelPicker = ({
  priceLevel,
  providerPlaceId
}: PriceLevelProps) => {
  const [savePriceLevel] = useSetPriceLevelMutation({
    update: updatePriceLevel(providerPlaceId)
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priceLevelIndex = priceLevelArray.findIndex(
      pl => pl === e.target.value
    );

    savePriceLevel({
      variables: {
        providerPlaceId,
        priceLevel: priceLevelIndex
      }
    });
  };

  const selectRef = React.useRef<HTMLSelectElement>(null);

  const handleClick = () => selectRef.current && selectRef.current.focus();

  const { isMobile } = useDevice();

  return (
    <>
      <InputBlock label="Prisklass">
        {isMobile && (
          <>
            {!!priceLevel ? formatPriceLevel(priceLevel) : '–'}
            <ActionButton
              onClick={handleClick}
              icon={<ChevronDown size={20} color="#666" />}
            />
          </>
        )}
        <StyledSelect
          ref={selectRef}
          value={priceLevel}
          onChange={handleChange}
          hide={isMobile}
        >
          {priceLevelArray.map(pl => (
            <option key={pl} value={pl}>
              {formatPriceLevel(pl)}
            </option>
          ))}
        </StyledSelect>
      </InputBlock>
    </>
  );
};
