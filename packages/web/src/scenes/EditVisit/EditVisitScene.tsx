import { Button, Loading, Page } from 'components';
import { transformToInput } from 'components/VisitForm/rateHelper';
import { useVisitForm } from 'components/VisitForm/useVisitForm';
import { VisitForm } from 'components/VisitForm/VisitForm';
import {
  useEditVisitMutation,
  useVisitQuery,
  VisitDocument,
  useDeleteVisitMutation,
  MeVisitsDocument
} from 'graphql/types';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { visitRoute, WithVisitId, routes } from 'routes';
import { formatDate } from 'utils/format';
import { GeneralError } from '..';
import { trackEvent } from 'analytics/trackEvent';
import { notify } from 'components/Notification';

export const EditVisitScene = ({
  match: {
    params: { id }
  }
}: RouteComponentProps<WithVisitId>) => {
  const { data, loading, error } = useVisitQuery({
    variables: { id }
  });

  const { handlers, values, isValid } = useVisitForm(data && data.visit);

  const [
    editVisit,
    { data: editVisitDate, loading: saving }
  ] = useEditVisitMutation({
    variables: {
      data: {
        visitId: id,
        visitDate: values.visitDate,
        comment: values.comment,
        orders: values.orders,
        ratings: transformToInput(values.rateState),
        isPrivate: values.isPrivate,
        isTakeAway: values.isTakeAway
      }
    },
    refetchQueries: [{ query: VisitDocument, variables: { id } }],
    awaitRefetchQueries: true
  });

  const [
    deleteVisit,
    { data: deleteVisitData, loading: deleting }
  ] = useDeleteVisitMutation({
    variables: { id },
    refetchQueries: [{ query: MeVisitsDocument }],
    awaitRefetchQueries: true
  });

  const handleSave = () => {
    trackEvent({ category: 'Form', action: 'Edit Visit' });
    editVisit();
  };

  if (editVisitDate && editVisitDate.editVisit.saved) {
    notify({
      title: 'Ändringar sparade',
      level: 'success',
      options: { autoClose: 3000 }
    });
    return <Redirect to={visitRoute(id)} />;
  }

  if (deleteVisitData && deleteVisitData.deleteVisit) {
    notify({
      title: 'Besök raderat',
      level: 'success',
      options: { autoClose: 3000 }
    });
    return <Redirect to={routes.visits} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const visit = data && data.visit;
  const { place, visitDate } = visit!;

  return (
    <Page
      title={`Redigerar: ${place.details.name}`}
      subTitle={formatDate(visitDate)}
    >
      <Helmet>
        <title>Redigera besök</title>
      </Helmet>
      <VisitForm handlers={handlers} values={values} />
      <Button
        variant="primary"
        onClick={handleSave}
        text={'Spara ändringar'}
        size="large"
        loading={saving}
        disabled={!isValid}
        margin={['bottom']}
      />
      <Button
        text="Radera besök"
        color="error"
        variant="secondary"
        onClick={() => deleteVisit()}
        loading={deleting}
      />
    </Page>
  );
};
