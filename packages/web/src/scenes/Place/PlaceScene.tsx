import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { Loading, Page, Label, Button, NavButton } from '../../components';
import { GeneralError } from '../Error/GeneralError';
import { formatURL, formatPriceLevel } from '../../utils/format';
import { usePlaceQuery } from '../../graphql/types';
import { PlaceMap } from './components/Map';
import { Visits } from './components/Visits';
import { UserStat } from './components/UserStat';
import { Website } from './components/Website';
import { ProviderIdParam, addVisitRoute } from 'routes';

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

const Buttons = styled.div``;

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
    visitCount,
    averageScore,
    visits,
    foursquareId,
    hasVisited
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
      <Buttons>
        {!hasVisited && (
          <Button
            text="Vill besöka"
            variant="secondary"
            color="white"
            margin={['bottom']}
          />
        )}
        <NavButton
          text="Nytt besök"
          variant="primary"
          to={addVisitRoute(foursquareId)}
        />
      </Buttons>
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
