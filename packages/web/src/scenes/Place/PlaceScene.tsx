import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { Loading, Page, NavButton } from '../../components';
import { GeneralError } from '../Error/GeneralError';
import { usePlaceQuery } from '../../graphql/types';
import { PlaceMap } from './components/Map';
import { Visits } from './components/Visits';
import { UserStat } from './components/UserStat';
import { Website } from './components/Website';
import { ProviderPlaceIdParam, addVisitRoute } from 'routes';
import { WantToVisitButton } from './components/WantToVisitButton';
import { PriceLevelPicker } from './components/PriceLevelPicker';
import { Tags } from './components/Tags';
import { Comment } from './components/Comment';

const UserStats = styled.section`
  display: flex;
  margin-bottom: 20px;
`;

const UserPlaceInputs = styled.section`
  margin-bottom: 30px;
`;

interface PlaceSceneProps extends RouteComponentProps<ProviderPlaceIdParam> {}

export const PlaceScene = ({
  match: {
    params: { providerPlaceId }
  }
}: PlaceSceneProps) => {
  const { data, loading, error } = usePlaceQuery({
    variables: { providerPlaceId }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const place = data && data.place;

  const {
    data: { name, location, url },
    priceLevel,
    tags,
    comment,
    visitCount,
    averageScore,
    visits,
    hasVisited,
    wantToVisit
  } = place!;

  const formattedAddress = location.address
    ? `${location.address}, ${location.city}`
    : location.city;

  return (
    <Page title={name} subTitle={formattedAddress}>
      <PlaceMap lat={location.lat!} lng={location.lng!} />
      {url && <Website url={url} />}
      <UserStats>
        <UserStat label="Besök" value={visitCount} />
        <UserStat label="Betyg" value={averageScore || '–'} />
      </UserStats>
      <UserPlaceInputs>
        <PriceLevelPicker
          priceLevel={priceLevel}
          providerPlaceId={providerPlaceId}
        />
        <Tags tags={tags} providerPlaceId={providerPlaceId} />
        <Comment comment={comment} providerPlaceId={providerPlaceId} />
      </UserPlaceInputs>
      {!hasVisited && (
        <WantToVisitButton
          providerPlaceId={providerPlaceId}
          wantToVisit={wantToVisit}
        />
      )}
      <NavButton
        text="Nytt besök"
        variant="primary"
        to={addVisitRoute(providerPlaceId)}
      />
      <Visits visits={visits} />
    </Page>
  );
};
