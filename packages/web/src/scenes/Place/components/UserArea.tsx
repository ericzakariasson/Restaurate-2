import * as React from 'react';
import { Loading } from 'components';
import { usePlaceQuery } from 'graphql/types';
import styled from 'styled-components';
import { PlaceForm } from './PlaceForm';
import { UserStat } from './UserStat';
import { Visits } from './Visits';
import { Redirect } from 'react-router-dom';
import { previewPlaceRoute } from 'routes';

const Wrapper = styled.section``;

const UserStats = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 5px;
`;

interface UserAreaProps {
  providerId: string;
}

export const UserArea = ({ providerId }: UserAreaProps) => {
  const { data, loading } = usePlaceQuery({ variables: { providerId } });

  const place = data && data.place;

  if (loading) {
    return <Loading fullscreen={false} />;
  }

  if (!place) {
    return <Redirect to={previewPlaceRoute({ providerId })} />;
  }

  const {
    visitCount,
    averageScore,
    types,
    priceLevel,
    tags,
    comment,
    visits
  } = place;

  return (
    <Wrapper>
      <UserStats>
        <UserStat label="Besök" value={visitCount} />
        <UserStat label="Betyg" value={averageScore || '–'} />
      </UserStats>
      <PlaceForm
        providerId={providerId}
        types={types}
        priceLevel={priceLevel}
        tags={tags}
        comment={comment}
      />
      <Visits visits={visits} />
    </Wrapper>
  );
};
