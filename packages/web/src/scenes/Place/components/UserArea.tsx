import * as React from 'react';
import { Loading } from 'components';
import { usePlaceQuery, Visit } from 'graphql/types';
import styled from 'styled-components';
import { PlaceForm } from './PlaceForm';
import { UserStat } from './UserStat';
import { Visits } from './Visits';
import { Redirect } from 'react-router-dom';
import { previewPlaceRoute } from 'routes';

const Wrapper = styled.section``;

const UserStats = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

interface UserAreaProps {
  providerId: string;
}

export const UserArea = ({ providerId }: UserAreaProps) => {
  const { data, loading } = usePlaceQuery({ variables: { providerId } });

  if (loading || !data) {
    return <Loading fullscreen={false} />;
  }

  if (data.place === null) {
    return <Redirect to={previewPlaceRoute({ providerId })} />;
  }

  const {
    id,
    visitCount,
    averageScore,
    types,
    priceLevel,
    tags,
    comment,
    visits
  } = data.place;

  return (
    <Wrapper>
      <UserStats>
        <UserStat label="Besök" value={visitCount} />
        <UserStat label="Betyg" value={averageScore || '–'} />
      </UserStats>
      <PlaceForm
        placeId={Number(id)}
        types={types}
        priceLevel={priceLevel}
        tags={tags}
        comment={comment}
      />
      <Visits visits={visits as Visit[]} />
    </Wrapper>
  );
};
