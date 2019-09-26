import { Button, Loading, Page } from 'components';
import { useVisitForm } from 'components/VisitForm/useVisitForm';
import { VisitForm } from 'components/VisitForm/VisitForm';
import {
  MePlacesDocument,
  MeVisitsDocument,
  useAddVisitMutation,
  usePlaceDetailsQuery
} from 'graphql/types';
import * as React from 'react';
import Helmet from 'react-helmet';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { ProviderPlaceIdParam, routes } from 'routes';
import { GeneralError } from 'scenes/Error/GeneralError';
import { transformToInput } from '../../components/VisitForm/rateHelper';
import { trackEvent } from 'analytics/trackEvent';

interface AddVisitSceneProps
  extends RouteComponentProps<ProviderPlaceIdParam> { }

export const AddVisitScene = ({
  match: {
    params: { providerPlaceId }
  }
}: AddVisitSceneProps) => {
  const { data, loading, error } = usePlaceDetailsQuery({
    variables: { providerId: providerPlaceId }
  });

  const { values, handlers } = useVisitForm();

  const [
    addVisit,
    { loading: saving, data: addVisitData }
  ] = useAddVisitMutation({
    variables: {
      data: {
        providerPlaceId,
        visitDate: values.visitDate,
        comment: values.comment,
        orders: values.orders,
        ratings: transformToInput(values.rateState)
      }
    },
    refetchQueries: [{ query: MeVisitsDocument }, { query: MePlacesDocument }]
  });

  const handleSave = () => {
    trackEvent({
      category: "Form",
      action: "Add Visit"
    });
    addVisit();
  }

  if (addVisitData && addVisitData.addVisit.saved) {
    return <Redirect to={routes.dashboard} />;
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
      />
    </Page>
  );
};
