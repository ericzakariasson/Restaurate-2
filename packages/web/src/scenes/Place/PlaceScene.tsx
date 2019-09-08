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
  PriceLevel
} from '../../graphql/types';
import { PlaceMap } from './components/Map';
import { Visits } from './components/Visits';
import { UserStat } from './components/UserStat';
import { Website } from './components/Website';
import { ProviderIdParam, addVisitRoute } from 'routes';
import { Check, CheckCircle, X, ChevronDown } from 'react-feather';
import { WantToVisitButton } from './components/WantToVisitButton';
import { DataProxy } from 'apollo-cache';
import { ActionButton } from './components/ActionButton';
import { PriceLevelPicker } from './components/PriceLevelPicker';
import { InputBlock } from './components/InputBlock';

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

const TagList = styled.ul``;

const TagItem = styled.li``;

const updateWantToVisit = (providerId: string) => (cache: DataProxy) => {
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
        wantToVisit: !place!.wantToVisit
      }
    }
  };

  cache.writeQuery(updatedQuery);
};

interface PlaceSceneProps extends RouteComponentProps<ProviderIdParam> {}

export const PlaceScene = ({
  match: {
    params: { providerId }
  }
}: PlaceSceneProps) => {
  const { data, loading, error } = usePlaceQuery({
    variables: { providerId }
  });

  const [
    addWantToVisit,
    { loading: togglingWantToVisit }
  ] = useToggleWantToVisitMutation({
    variables: { providerId },
    update: updateWantToVisit(providerId)
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
        <PriceLevelPicker value={priceLevel} providerId={foursquareId} />
        <InputBlock label="Taggar">
          {tags && tags.length > 0 ? (
            <TagList>
              {tags.map(tag => (
                <TagItem id={tag.id}>{tag.name}</TagItem>
              ))}
            </TagList>
          ) : (
            '–'
          )}
        </InputBlock>
        <InputBlock label="Kommentar">–</InputBlock>
      </UserPlaceInputs>
      {!hasVisited && (
        <WantToVisitButton
          wantToVisit={wantToVisit}
          toggleWantToVisit={addWantToVisit}
          loading={togglingWantToVisit}
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
