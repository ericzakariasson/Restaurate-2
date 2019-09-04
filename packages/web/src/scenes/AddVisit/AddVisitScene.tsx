import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Page, Loading, ListInput, Label } from 'components';
import Helmet from 'react-helmet';
import { usePlaceQuery, usePlaceBasicDetailsQuery } from 'graphql/types';
import { useArray } from 'hooks';

type ProviderIdParam = { providerId: string };

interface AddVisitSceneProps extends RouteComponentProps<ProviderIdParam> {}

export const AddVisitScene = ({
  history,
  match: {
    params: { providerId }
  }
}: AddVisitSceneProps) => {
  const { data, loading } = usePlaceBasicDetailsQuery({
    variables: { id: providerId }
  });

  const [orders, addOrder, removeOrder] = useArray<string>();

  if (loading) {
    return <Loading />;
  }

  const place = data && data.placeBasicDetails;
  const { name, address } = place!;

  return (
    <Page title={name} subTitle={address}>
      <Helmet>
        <title>Nytt besök</title>
      </Helmet>
      <ListInput
        label="Beställningar"
        items={orders}
        addItem={addOrder}
        removeItem={removeOrder}
        placeholder="Tikka Masala, nr. 5 ..."
      />
      <Label text="Betyg" />
    </Page>
  );
};
