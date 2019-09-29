import { PlaceTagFragment, PlaceType, PriceLevel } from 'graphql/types';
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
  providerId: string;
  types?: PlaceType[] | null;
  priceLevel: PriceLevel;
  tags: PlaceTagFragment[];
  comment?: string | null;
}

export const PlaceForm = ({
  providerId,
  types,
  priceLevel,
  tags,
  comment
}: PlaceFormProps) => {
  return (
    <UserPlaceInputs>
      <Types types={types} providerId={providerId} />
      <PriceLevelPicker priceLevel={priceLevel} providerId={providerId} />
      <Tags tags={tags} providerId={providerId} />
      <Comment comment={comment} providerId={providerId} />
    </UserPlaceInputs>
  );
};
