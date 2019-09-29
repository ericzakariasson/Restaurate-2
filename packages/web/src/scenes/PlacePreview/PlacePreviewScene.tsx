import { useCreatePlaceMutation, usePreviewPlaceQuery } from 'graphql/types';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { addVisitRoute, myPlaceRoute, PlaceProviderIdParam } from 'routes';
import { GeneralError, NotFoundScene } from 'scenes';
import { PlaceMap } from 'scenes/Place/components/Map';
import { Phone } from 'scenes/Place/components/Phone';
import { WantToVisitButton } from 'scenes/Place/components/WantToVisitButton';
import { Website } from 'scenes/Place/components/Website';
import styled from 'styled-components';
import { Button, Loading, NavButton, Page } from '../../components';

const CreatePlace = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: #f5f5f5;
  margin: 15px 0 30px;
`;

const CreateText = styled.p`
  color: #444;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const Contact = styled.div`
  margin-bottom: 15px;
`;

interface PlacePreviewSceneProps
  extends RouteComponentProps<PlaceProviderIdParam> {}

export const PlacePreviewScene = ({
  match: {
    params: { providerId }
  }
}: PlacePreviewSceneProps) => {
  const options = {
    variables: {
      providerId
    }
  };

  const { data: previewData, loading, error } = usePreviewPlaceQuery(options);

  const [
    createPlace,
    { data: createPlaceData, loading: saving }
  ] = useCreatePlaceMutation(options);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const preview = previewData && previewData.previewPlace;

  if (!preview) {
    return <NotFoundScene />;
  }

  const {
    details: { name, location, contact },
    wantToVisit,
    placeId
  } = preview;

  const { website, phone } = contact;

  if (
    placeId ||
    (createPlaceData &&
      createPlaceData.createPlace &&
      createPlaceData.createPlace.id)
  ) {
    return <Redirect to={myPlaceRoute({ providerId })} />;
  }

  const handleCreatePlace = () => createPlace();

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
      <CreatePlace>
        <CreateText>
          För att spara info om stället som prisklass och taggar behöver du
          lägga till det i dina ställen.
        </CreateText>
        <Button
          variant="secondary"
          color="black"
          text="Lägg till i mina ställen"
          onClick={handleCreatePlace}
          loading={saving}
          size="normal"
        />
      </CreatePlace>
      <WantToVisitButton providerId={providerId} wantToVisit={wantToVisit} />
      <NavButton
        text="Nytt besök"
        variant="primary"
        to={addVisitRoute(providerId)}
      />
    </Page>
  );
};
