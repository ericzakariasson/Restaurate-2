import { trackEvent } from 'analytics/trackEvent';
import { Button, Loading, Page } from 'components';
import { useVisitForm } from 'components/VisitForm/useVisitForm';
import { VisitForm } from 'components/VisitForm/VisitForm';
import {
  ImageType,
  MePlacesDocument,
  MeVisitsDocument,
  useAddVisitMutation,
  usePlaceDetailsQuery,
  useSignImagesDataMutation,
  VisitImageInput
} from 'graphql/types';
import * as React from 'react';
import Helmet from 'react-helmet';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { myPlaceRoute, PlaceProviderIdParam } from 'routes';
import { GeneralError } from 'scenes/Error/GeneralError';
import { transformToInput } from '../../components/VisitForm/rateHelper';
import { transformPreviewToPromise } from './transformPreviewToPromise';

interface AddVisitSceneProps
  extends RouteComponentProps<PlaceProviderIdParam> {}

export const AddVisitScene = ({
  match: {
    params: { providerId }
  }
}: AddVisitSceneProps) => {
  const { data, loading, error } = usePlaceDetailsQuery({
    variables: { providerId }
  });

  const [saving, setSaving] = React.useState(false);

  const { values, handlers, isValid } = useVisitForm();

  const [addVisit, { data: addVisitData }] = useAddVisitMutation({
    refetchQueries: [{ query: MeVisitsDocument }, { query: MePlacesDocument }]
  });

  const [signImages] = useSignImagesDataMutation();

  const handleSave = async () => {
    setSaving(true);
    const { data } = await signImages({
      variables: {
        data: {
          images: values.images.map(preview => ({
            type: ImageType.Visit,
            tags: preview.orders,
            placeProviderId: providerId
          }))
        }
      }
    });

    if (data && data.signImagesData) {
      const imagePromises = data.signImagesData.map((signedData, i) =>
        transformPreviewToPromise(signedData, values.images[i])
      );

      const uploadResult = await Promise.all(imagePromises);

      const visitImages: VisitImageInput[] = uploadResult.map(result => ({
        publicId: result.public_id,
        orders: result.tags,
        url: result.secure_url
      }));

      addVisit({
        variables: {
          data: {
            providerPlaceId: providerId,
            visitDate: values.visitDate,
            comment: values.comment,
            orders: values.orders,
            ratings: transformToInput(values.rateState),
            isPrivate: values.isPrivate,
            isTakeAway: values.isTakeAway,
            images: visitImages
          }
        }
      });

      trackEvent({
        category: 'Form',
        action: 'Add Visit'
      });

      setSaving(false);
    }
  };

  if (addVisitData && addVisitData.addVisit.saved) {
    return <Redirect to={myPlaceRoute({ providerId })} />;
  }

  if (loading) {
    return <Loading />;
  }

  const place = data && data.placeDetails;

  if (!place || error) {
    return <GeneralError error={error} />;
  }

  const { name, location } = place!;

  return (
    <Page title={name} subTitle={location.address.formatted}>
      <Helmet>
        <title>Nytt besök</title>
      </Helmet>
      <VisitForm handlers={handlers} values={values} />
      <Button
        variant="primary"
        onClick={handleSave}
        text={'Lägg till besök'}
        size="large"
        loading={saving}
        disabled={!isValid}
      />
    </Page>
  );
};
