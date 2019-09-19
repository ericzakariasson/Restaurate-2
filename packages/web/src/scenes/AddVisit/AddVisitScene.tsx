import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import {
  Page,
  Loading,
  ListInput,
  Label,
  Textarea,
  DateInput,
  Button
} from 'components';
import Helmet from 'react-helmet';
import {
  useAddVisitMutation,
  MeVisitsDocument,
  MePlacesDocument,
  usePlaceDetailsQuery
} from 'graphql/types';
import { useArray } from 'hooks';
import { rateNodes } from './constants';
import {
  createInitialRateState,
  calculateAverageScore,
  transformToInput
} from './rateHelper';
import { rateReducer, SetRatePayload } from './rateReducer';
import { GeneralError } from 'scenes/Error/GeneralError';
import { RateSliderParent, RateHeader } from './components/RateParent';
import styled from 'styled-components';
import { routes, ProviderPlaceIdParam } from 'routes';

const RateTotal = styled.article`
  margin-top: 30px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

interface AddVisitSceneProps
  extends RouteComponentProps<ProviderPlaceIdParam> {}

export const AddVisitScene = ({
  match: {
    params: { providerPlaceId }
  }
}: AddVisitSceneProps) => {
  const { data, loading, error } = usePlaceDetailsQuery({
    variables: { providerId: providerPlaceId }
  });

  const [orders, addOrder, removeOrder] = useArray<string>();
  const [comment, setComment] = React.useState('');
  const [visitDate, setVisitDate] = React.useState(new Date());

  const initialRateState = createInitialRateState(rateNodes);
  const [rateState, dispatch] = React.useReducer(rateReducer, initialRateState);

  const [
    addVisit,
    { loading: saving, data: addVisitData }
  ] = useAddVisitMutation({
    variables: {
      data: {
        providerPlaceId,
        visitDate,
        comment,
        orders,
        ratings: transformToInput(rateState)
      }
    },
    refetchQueries: [{ query: MeVisitsDocument }, { query: MePlacesDocument }]
  });

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

  const averageScore = calculateAverageScore(rateState);

  const setScore = (payload: SetRatePayload) =>
    dispatch({ type: 'SET_RATE', payload });

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);

  return (
    <Page title={name} subTitle={location.address.formatted}>
      <Helmet>
        <title>Nytt besök</title>
      </Helmet>
      <Section>
        <ListInput
          label="Beställningar"
          items={orders}
          addItem={addOrder}
          removeItem={removeOrder}
          placeholder="Tikka Masala, nr. 5 ..."
        />
      </Section>
      <Section>
        <Label text="Betyg" />
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
        <RateTotal>
          <RateHeader label="Betyg" score={averageScore} />
        </RateTotal>
      </Section>
      <Section>
        <Label text="Kommentar" />
        <Textarea
          placeholder="Något som kan vara värt att minnas till nästa gång?"
          rows={3}
          value={comment}
          maxLength={300}
          onChange={handleCommentChange}
        />
      </Section>
      <Section>
        <Label text="Datum" />
        <DateInput onChange={setVisitDate} />
      </Section>
      <Button
        variant="primary"
        onClick={() => addVisit()}
        text={'Lägg till besök'}
        size="large"
        loading={saving}
      />
    </Page>
  );
};
