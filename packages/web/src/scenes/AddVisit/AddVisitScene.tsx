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
import { usePlaceBasicDetailsQuery, useAddVisitMutation } from 'graphql/types';
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
import { routes, ProviderIdParam } from 'routes';

const RateTotal = styled.article`
  margin-top: 30px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

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
        providerId,
        visitDate,
        comment,
        orders,
        ratings: transformToInput(rateState)
      }
    }
  });

  if (addVisitData && addVisitData.addVisit.saved) {
    return <Redirect to={routes.dashboard} />;
  }

  if (loading) {
    return <Loading />;
  }

  const place = data && data.placeBasicDetails;

  if (!place || error) {
    return <GeneralError error={error} />;
  }

  const { name, address } = place!;

  const averageScore = calculateAverageScore(rateState);

  const setScore = (payload: SetRatePayload) =>
    dispatch({ type: 'SET_RATE', payload });

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);

  return (
    <Page title={name} subTitle={address}>
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
        text={saving ? 'Sparar' : 'Lägg till besök'}
        size="large"
      />
    </Page>
  );
};
