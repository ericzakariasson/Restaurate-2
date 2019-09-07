import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page, Loading, ListInput, Label } from 'components';
import Helmet from 'react-helmet';
import { usePlaceBasicDetailsQuery } from 'graphql/types';
import { useArray } from 'hooks';
import { rateNodes } from './constants';
import { createInitialRateState } from './rateHelper';
import { rateReducer, SetRatePayload } from './rateReducer';
import { GeneralError } from 'scenes/Error/GeneralError';
import { RateSliderParent } from './components/RateParent';

type ProviderIdParam = { providerId: string };

interface AddVisitSceneProps extends RouteComponentProps<ProviderIdParam> {}

export const AddVisitScene = ({
  match: {
    params: { providerId }
  }
}: AddVisitSceneProps) => {
  const { data, loading, error } = usePlaceBasicDetailsQuery({
    variables: { id: providerId }
  });

  const [orders, addOrder, removeOrder] = useArray<string>();

  const initialRateState = createInitialRateState(rateNodes);
  const [rateState, dispatch] = React.useReducer(rateReducer, initialRateState);

  if (loading) {
    return <Loading />;
  }

  const place = data && data.placeBasicDetails;

  if (!place || error) {
    return <GeneralError error={error} />;
  }

  const { name, address } = place!;

  const setScore = (payload: SetRatePayload) =>
    dispatch({ type: 'SET_RATE', payload });

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
      <section>
        {rateNodes.map(node => (
          <RateSliderParent
            key={node.name}
            label={node.label}
            name={node.name}
            score={rateState[node.name].score}
            controlled={!!rateState[node.name].controlled}
            setScore={setScore}
            children={
              node.children
                ? node.children.map(child => ({
                    ...child,
                    controlled: false,
                    score: rateState[node.name].children![child.name].score,
                    children: undefined
                  }))
                : undefined
            }
          />
        ))}
      </section>
    </Page>
  );
};
