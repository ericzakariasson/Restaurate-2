import {
  PreviewPlaceDocument,
  PriceLevel,
  useUpdatePlaceMutation
} from 'graphql/types';
import { useDevice } from 'hooks';
import * as React from 'react';
import { Edit } from 'react-feather';
import styled, { css } from 'styled-components';
import { formatPriceLevel } from 'utils/format';
import { ActionButton } from '../../../components/ActionButton';
import { InputBlock } from './InputBlock';

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

const refetchPreview = (providerId: string) => ({
  refetchQueries: [{ query: PreviewPlaceDocument, variables: { providerId } }]
});

interface PriceLevelProps {
  priceLevel: PriceLevel;
  providerId: string;
}

export const PriceLevelPicker = ({
  priceLevel,
  providerId
}: PriceLevelProps) => {
  const [updatePlace] = useUpdatePlaceMutation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priceLevelIndex = priceLevelArray.findIndex(
      pl => pl === e.target.value
    );

    updatePlace({
      variables: {
        providerId,
        data: {
          priceLevel: priceLevelIndex
        }
      },
      ...refetchPreview(providerId)
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
            <ActionButton onClick={handleClick} icon={Edit} />
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
