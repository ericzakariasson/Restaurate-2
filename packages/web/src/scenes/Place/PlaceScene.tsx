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
  useToggleWantToVisitMutation
} from '../../graphql/types';
import { PlaceMap } from './components/Map';
import { Visits } from './components/Visits';
import { UserStat } from './components/UserStat';
import { Website } from './components/Website';
import { ProviderIdParam, addVisitRoute } from 'routes';
import { Check, CheckCircle, X } from 'react-feather';
import { WantToVisitButton } from './components/WantToVisitButton';

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

const PlaceInput = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

const PlaceInputText = styled.h4`
  font-size: 1.375rem;
  font-weight: 400;
`;

const TagList = styled.ul``;

const TagItem = styled.li``;

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
    { called, loading: togglingWantToVisit }
  ] = useToggleWantToVisitMutation({
    variables: { providerId },
    update(cache, other) {
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
    }
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
        <LabelWrapper label="Prisklass">
          <PlaceInputText>
            {!!priceLevel ? formatPriceLevel(priceLevel) : '–'}
          </PlaceInputText>
        </LabelWrapper>
        <LabelWrapper label="Taggar">
          <PlaceInputText>
            {tags && tags.length > 0 ? (
              <TagList>
                {tags.map(tag => (
                  <TagItem id={tag.id}>{tag.name}</TagItem>
                ))}
              </TagList>
            ) : (
              '–'
            )}
          </PlaceInputText>
        </LabelWrapper>
        <LabelWrapper label="Kommentar">
          <PlaceInputText>–</PlaceInputText>
        </LabelWrapper>
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

interface LabelWrapperProps {
  label: string;
  children: React.ReactNode;
}

const LabelWrapper = ({ children, label }: LabelWrapperProps) => (
  <PlaceInput>
    <Label text={label} noMargin />
    {children}
  </PlaceInput>
);
