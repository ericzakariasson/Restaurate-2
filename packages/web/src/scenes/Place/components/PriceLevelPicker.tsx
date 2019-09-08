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

const updatePriceLevel = (providerId: string) => (
  cache: DataProxy,
  { data }: FetchResult<SetPriceLevelMutation>
) => {
  const placeQuery = {
    query: PlaceDocument,
    variables: { providerId }
  };

  const { place } = cache.readQuery<PlaceQuery>(placeQuery)!;

  const updatedQuery = {
    ...placeQuery,
    data: {
      place: {
        ...place,
        priceLevel: data ? data.setPriceLevel : null
      }
    }
  };

  cache.writeQuery(updatedQuery);
};

interface PriceLevelProps {
  value?: PriceLevel | null;
  providerId: string;
}

export const PriceLevelPicker = ({ value, providerId }: PriceLevelProps) => {
  const [setPriceLevel] = useSetPriceLevelMutation({
    update: updatePriceLevel(providerId)
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priceLevel = priceLevelArray.findIndex(pl => pl === e.target.value);
    setPriceLevel({
      variables: {
        providerId,
        priceLevel
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
            {!!value ? formatPriceLevel(value) : '–'}
            <ActionButton
              onClick={handleClick}
              icon={<ChevronDown size={20} color="#666" />}
            />
          </>
        )}
        <StyledSelect ref={selectRef} onChange={handleChange} hide={isMobile}>
          {Object.values(PriceLevel).map(pl => (
            <option key={pl} value={pl}>
              {formatPriceLevel(pl)}
            </option>
          ))}
        </StyledSelect>
      </InputBlock>
    </>
  );
};
