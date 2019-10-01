import * as React from 'react';
import { Page, Label, Loading } from 'components';
import styled from 'styled-components';
import { useMetricsQuery } from 'graphql/types';
import { NotFoundScene } from 'scenes/NotFound/NotFoundScene';

const GroupTitle = styled.h2`
  margin-bottom: 20px;
`;

const Field = styled.article`
  margin-bottom: 30px;
`;

const Value = styled.h3`
  font-size: 1.5rem;
`;

export const MetricsScene = () => {
  const { data, loading } = useMetricsQuery();

  if (loading || !data) {
    return <Loading />;
  }

  if (!data.metrics) {
    return <NotFoundScene />;
  }

  const { metrics } = data;

  return (
    <Page title="Statistik">
      <GroupTitle>Användare</GroupTitle>
      <Field>
        <Label text="Registrerade" />
        <Value>{metrics.registeredUsers}</Value>
      </Field>
      <Field>
        <Label text="Bekräftade" />
        <Value>{metrics.confirmedUsers}</Value>
      </Field>
      <Field>
        <Label text="Aktiva" />
        <Value>{metrics.activeUsers}</Value>
      </Field>
    </Page>
  );
};
