import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { Loading, Page, Label, NavButton } from '../../components';
import { GeneralError } from '../Error/GeneralError';
import { formatPriceLevel } from '../../utils/format';
import {
  usePlaceQuery,
  PlaceDocument,
  PlaceQuery,
  useToggleWantToVisitMutation,
  PriceLevel,
  Tag,
  PlaceTagFragment
} from '../../graphql/types';
import { PlaceMap } from './components/Map';
import { Visits } from './components/Visits';
import { UserStat } from './components/UserStat';
import { Website } from './components/Website';
import { ProviderIdParam, addVisitRoute } from 'routes';
import { Check, CheckCircle, X, ChevronDown, Plus, Edit2 } from 'react-feather';
import { WantToVisitButton } from './components/WantToVisitButton';
import { DataProxy } from 'apollo-cache';
import { ActionButton } from './components/ActionButton';
import { PriceLevelPicker } from './components/PriceLevelPicker';
import { InputBlock } from './components/InputBlock';
import { Tags } from './components/Tags';
import { Comment } from './components/Comment';

const Info = styled.div`
  margin-bottom: 20px;
`;

const Text = styled.p`
  text-align: center;
`;

const UserStats = styled.section`
  display: flex;
  margin-bottom: 20px;
`;

const UserPlaceInputs = styled.section`
  margin-bottom: 30px;
`;

interface PlaceSceneProps extends RouteComponentProps<ProviderIdParam> {}

export const PlaceScene = ({
  match: {
    params: { providerId }
  }
}: PlaceSceneProps) => {
  const { data, loading, error } = usePlaceQuery({
    variables: { providerId }
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
    types,
    tags,
    comment,
    visitCount,
    averageScore,
    visits,
    foursquareId,
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
        <PriceLevelPicker priceLevel={priceLevel} providerId={foursquareId} />
        <Tags tags={tags} providerId={foursquareId} />
        <Comment comment={comment} providerId={foursquareId} />
      </UserPlaceInputs>
      {!hasVisited && (
        <WantToVisitButton
          providerId={foursquareId}
          wantToVisit={wantToVisit}
        />
      )}
      <NavButton
        text="Nytt besök"
        variant="primary"
        to={addVisitRoute(foursquareId)}
      />
      <Info>
        <Text>Se {visitCount} besök nedan.</Text>
      </Info>
      <Visits visits={visits} />
    </Page>
  );
};
