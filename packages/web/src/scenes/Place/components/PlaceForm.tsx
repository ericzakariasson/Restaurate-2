import { PlaceType, PriceLevel, Tag } from 'graphql/types';
import * as React from 'react';
import styled from 'styled-components';
import { Comment } from './Comment';
import { PriceLevelPicker } from './PriceLevelPicker';
import { Tags } from './Tags';
import { Types } from './Types';

const UserPlaceInputs = styled.section`
  margin-bottom: 30px;
`;

interface PlaceFormProps {
  placeId: number;
  types?: PlaceType[] | null;
  priceLevel: PriceLevel;
  tags: Tag[];
  comment?: string | null;
  providerId: string;
}

export const PlaceForm = ({
  placeId,
  types,
  priceLevel,
  tags,
  comment,
  providerId
}: PlaceFormProps) => {
  return (
    <UserPlaceInputs>
      <Types selected={types} placeId={placeId} />
      <PriceLevelPicker priceLevel={priceLevel} placeId={placeId} />
      <Tags tags={tags} placeId={placeId} providerId={providerId} />
      <Comment comment={comment} placeId={placeId} />
    </UserPlaceInputs>
  );
};
