import { Button, Loading, Page } from 'components';
import { transformToInput } from 'components/VisitForm/rateHelper';
import { useVisitForm } from 'components/VisitForm/useVisitForm';
import { VisitForm } from 'components/VisitForm/VisitForm';
import {
  useEditVisitMutation,
  useVisitQuery,
  VisitDocument
} from 'graphql/types';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { visitRoute, WithVisitId } from 'routes';
import { formatDate } from 'utils/format';
import { GeneralError } from '..';
import { trackEvent } from 'analytics/trackEvent';

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

  const handleSave = () => {
    trackEvent({ category: 'Form', action: 'Save Edit Visit' });
    editVisit();
  };

  if (editVisitDate && editVisitDate.editVisit.saved) {
    return <Redirect to={visitRoute(id)} />;
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
      />
    </Page>
  );
};
