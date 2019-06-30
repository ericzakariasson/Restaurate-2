import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import { Place, PlaceVariables } from '../../queries/types/Place';

import { loader } from 'graphql.macro';
import { Loading, PageTitle } from '../../components';
import {
  formatPriceLevel,
  formatDate,
  formatPlaceType,
  formatURL
} from '../../utils/format';
import { staticMapboxMapUrl } from '../../utils';
import { visitRoute } from '../../routes';
const placeQuery = loader('../../queries/place.gql');

const Page = styled.section`
  padding: ${p => p.theme.page.padding};
`;

const Info = styled.div`
  margin-bottom: 20px;
`;

const Text = styled.p`
  text-align: center;
`;

const PlaceText = styled(Text)`
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #222;
  margin-bottom: 20px;
`;

const Website = styled.a`
  text-align: center;
  padding: 10px;
  display: block;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1rem;
  color: #222;
  font-weight: 700;
  text-decoration: none;
`;

interface MapCardProps {
  url: string;
}

const MapCard = styled.div<MapCardProps>`
  background: url(${p => p.url});
  width: 100%;
  height: 100px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  box-shadow: ${p => p.theme.boxShadow};
  border: 1px solid #aaa;
  margin-bottom: 40px;
`;

const TagList = styled.ul``;

const TagItem = styled.li``;

const VisitList = styled.ul`
  list-style: none;
`;

const VisitItem = styled.li`
  padding: 15px;
  border-radius: 4px;
  box-shadow: ${p => p.theme.boxShadow};
  border: 1px solid #ccc;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const VisitLink = styled(Link)`
  text-decoration: none;
  color: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VisitDate = styled.span``;

const VisitScore = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
`;

type WithPlaceSlug = { slug: string };

export const PlaceScene = ({
  match: {
    params: { slug }
  }
}: RouteComponentProps<WithPlaceSlug>) => {
  const { data, loading } = useQuery<Place, PlaceVariables>(placeQuery, {
    variables: { slug }
  });

  if (loading) {
    return <Loading />;
  }

  if (data && data.place) {
    const { place } = data;

    const { lat, lng } = place;

    const mapUrl = staticMapboxMapUrl({
      lat,
      lng,
      zoom: 14,
      width: window.innerWidth - 40,
      height: window.innerHeight / 2
    });

    return (
      <Page>
        <PageTitle
          text={place.name}
          subTitle={`${place.address.street} ${place.address.streetNumber}, ${
            place.address.city
          } `}
        />
        <PlaceText>
          {place.types.map(formatPlaceType).join(',')}
          {` `}—{` `}
          {formatPriceLevel(place.priceLevel)}
        </PlaceText>
        {place.url && (
          <Website href={place.url} target="_blank">
            {formatURL(place.url)}
          </Website>
        )}
        <MapCard url={mapUrl} />
        <TagList>
          {place.tags &&
            place.tags.map(tag => <TagItem id={tag.id}>{tag.title}</TagItem>)}
        </TagList>
        <Info>
          <Text>Se {place.visitCount} besök nedan.</Text>
        </Info>
        <VisitList>
          {place.visits.map(visit => (
            <VisitItem key={visit.id}>
              <VisitLink to={visitRoute(visit.id)}>
                <VisitDate>{formatDate(visit.visitDate)}</VisitDate>
                <VisitScore>{visit.rate.score}</VisitScore>
              </VisitLink>
            </VisitItem>
          ))}
        </VisitList>
      </Page>
    );
  }

  return <span>Hitta ej</span>;
};
