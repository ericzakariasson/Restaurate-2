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
import { Phone } from './components/Phone';
import { Types } from './components/Types';

const UserStats = styled.section`
  display: flex;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const UserPlaceInputs = styled.section`
  margin-bottom: 30px;
`;

const Contact = styled.div`
  margin-bottom: 15px;
`;

interface PlaceSceneProps extends RouteComponentProps<ProviderPlaceIdParam> {}

export const PlaceScene = ({
  match: {
    params: { providerPlaceId }
  }
}: PlaceSceneProps) => {
  const { data, loading, error } = usePlaceQuery({
    variables: { providerId: providerPlaceId }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const place = data && data.place;

  const {
    details: { name, location, contact },
    priceLevel,
    tags,
    comment,
    visitCount,
    averageScore,
    visits,
    hasVisited,
    wantToVisit,
    types
  } = place!;

  const { website, phone } = contact;

  return (
    <Page title={name} subTitle={location.address.formatted}>
      <PlaceMap lat={location.position.lat!} lng={location.position.lng} />
      {(website || phone) && (
        <Contact>
          {website && website.map(w => <Website key={w.value} url={w.value} />)}
          {website && ' — '}
          {phone && phone.map(w => <Phone key={w.value} nr={w.value} />)}
        </Contact>
      )}
      <UserStats>
        <UserStat label="Besök" value={visitCount} />
        <UserStat label="Betyg" value={averageScore || '–'} />
      </UserStats>
      <UserPlaceInputs>
        <Types types={types} providerId={providerPlaceId} />
        <PriceLevelPicker
          priceLevel={priceLevel}
          providerId={providerPlaceId}
        />
        <Tags tags={tags} providerId={providerPlaceId} />
        <Comment comment={comment} providerId={providerPlaceId} />
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
