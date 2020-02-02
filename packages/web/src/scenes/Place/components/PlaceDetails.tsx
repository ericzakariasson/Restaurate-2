import { Loading } from 'components';
import { usePlaceDetailsQuery } from 'graphql/types';
import * as React from 'react';
import styled from 'styled-components';
import { PlaceMap } from './Map';
import { Phone } from './Phone';
import { Website } from './Website';

const Wrapper = styled.section``;

const Contact = styled.div`
  margin-bottom: 15px;
`;

interface PlaceDetailsProps {
  providerId: string;
}

export const PlaceDetails = ({ providerId }: PlaceDetailsProps) => {
  const { data, loading } = usePlaceDetailsQuery({ variables: { providerId } });

  const details = data && data.placeDetails;

  if (loading) {
    return <Loading fullscreen={false} />;
  }

  if (!details) {
    return null;
  }

  const {
    location,
    contact: { website, phone }
  } = details;

  return (
    <Wrapper>
      <PlaceMap lat={location.position.lat!} lng={location.position.lng} />
      {(website || phone) && (
        <Contact>
          {website && website.map(w => <Website key={w.value} url={w.value} />)}
          {website && ' — '}
          {phone && phone.map(w => <Phone key={w.value} nr={w.value} />)}
        </Contact>
      )}
    </Wrapper>
  );
};
