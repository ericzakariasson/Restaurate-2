import * as React from 'react';
import styled from 'styled-components';
import { X } from 'react-feather';

import { PriceLevel, Tag } from '../types/place';
import { priceLevels } from '../constants';

import { staticMapboxMapUrl } from '../../../utils';
import { PriceLevelList } from './PriceLevelsList';

import {
  SmallLabel,
  ListInput,
  TextButton,
  PageTitle
} from '../../../components';

interface ItemProps {}

const Wrapper = styled.section<ItemProps>`
  display: flex;
  flex-direction: column;
`;

interface MapWrapperProps {
  url: string;
}

const MapWrapper = styled.article<MapWrapperProps>`
  position: relative;
  border-radius: 5px;
  background: #fcfcfc;
  overflow: hidden;
  margin-bottom: 40px;
  border: 1px solid #333;
  box-shadow: 0 4px 2px rgba(0, 0, 0, 0.08);
  background-image: url(${p => p.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #eee;
`;

const MapOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.65);
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Name = styled.h3`
  margin-bottom: 5px;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #222;
  font-family: ${p => p.theme.fonts.monospace};
`;

const Address = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #444;
  text-align: center;
`;

interface PlaceFormProps {
  place: google.maps.places.PlaceResult;
  deselect: () => void;
  priceLevel: number | undefined;
  setPriceLevel: (priceLevel: number) => void;
  resetPriceLevel: () => void;
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  goToVisitForm: () => void;
}

export const PlaceForm = React.memo(
  ({
    place: { name, formatted_address, geometry },
    deselect,
    priceLevel,
    setPriceLevel,
    resetPriceLevel,
    tags,
    addTag,
    removeTag,
    goToVisitForm
  }: PlaceFormProps) => {
    const width = window.innerWidth - 30;
    const height = 200;
    const url = staticMapboxMapUrl({ geometry, width, height, zoom: 13 });

    return (
      <>
        <PageTitle title="Ställe" />
        <Wrapper>
          <MapWrapper url={url}>
            <MapOverlay>
              <Name>{name}</Name>
              <Address>{formatted_address}</Address>
            </MapOverlay>
          </MapWrapper>
          <SmallLabel text="Prisklass" />
          <PriceLevelList
            selectedPriceLevel={priceLevel}
            setPriceLevel={setPriceLevel}
            resetPriceLevel={resetPriceLevel}
          />
          <ListInput
            label="Taggar"
            removeItem={removeTag}
            items={tags}
            addItem={addTag}
            placeholder="Indiskt, lunch ..."
          />
          <TextButton onClick={goToVisitForm} text="Gå vidare till besök" />
        </Wrapper>
      </>
    );
  }
);
