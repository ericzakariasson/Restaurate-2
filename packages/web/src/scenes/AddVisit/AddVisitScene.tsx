import { trackEvent } from 'analytics/trackEvent';
import { Button, Loading, Page } from 'components';
import { useVisitForm } from 'components/VisitForm/useVisitForm';
import { VisitForm } from 'components/VisitForm/VisitForm';
import {
  MePlacesDocument,
  MeVisitsDocument,
  useAddVisitMutation,
  usePlaceDetailsQuery,
  useSignImagesDataMutation
} from 'graphql/types';
import * as React from 'react';
import Helmet from 'react-helmet';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { myPlaceRoute, PlaceProviderIdParam } from 'routes';
import { GeneralError } from 'scenes/Error/GeneralError';
import { transformToInput } from '../../components/VisitForm/rateHelper';
import { format } from 'date-fns';

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

  const { values, handlers, isValid } = useVisitForm();

  const [
    addVisit,
    { loading: saving, data: addVisitData }
  ] = useAddVisitMutation({
    variables: {
      data: {
        providerPlaceId: providerId,
        visitDate: values.visitDate,
        comment: values.comment,
        orders: values.orders,
        ratings: transformToInput(values.rateState),
        isPrivate: values.isPrivate,
        isTakeAway: values.isTakeAway
      }
    },
    refetchQueries: [{ query: MeVisitsDocument }, { query: MePlacesDocument }]
  });

  const [signImages] = useSignImagesDataMutation();

  const handleSave = async () => {
    const { data } = await signImages({
      variables: {
        data: {
          images: values.images.map(() => ({
            name: `${providerId}-visit-${format(new Date(), 'yyyyMMdd')}`,
            tags: values.orders,
            placeProviderId: providerId
          }))
        }
      }
    });

    if (data && data.signImagesData) {
      const imagePromises = data.signImagesData.map((signedData, i) => {
        const formData = new FormData();

        const { file } = values.images[i];
        formData.append('file', file);

        const params = JSON.parse(signedData.query);
        Object.entries<string | Blob>(params).forEach(([key, value]) =>
          formData.append(key, value)
        );

        return fetch(signedData.apiUrl, {
          method: 'POST',
          body: formData
        }).then(res => res.json());
      });

      const result = await Promise.all(imagePromises);
      console.log(result);

      // addVisit();

      trackEvent({
        category: 'Form',
        action: 'Add Visit'
      });
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
