import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Page, Loading, ListInput, Label } from 'components';
import Helmet from 'react-helmet';
import { usePlaceBasicDetailsQuery } from 'graphql/types';
import { useArray } from 'hooks';
import { InputSlider } from 'components/Slider';
import { rateNodes } from './constants';
import { createInitialRateState } from './rateHelper';

type ProviderIdParam = { providerId: string };

interface AddVisitSceneProps extends RouteComponentProps<ProviderIdParam> {}

const initialRateState = createInitialRateState(rateNodes);

export const AddVisitScene = ({
  match: {
    params: { providerId }
  }
}: AddVisitSceneProps) => {
  const { data, loading } = usePlaceBasicDetailsQuery({
    variables: { id: providerId }
  });

  const [orders, addOrder, removeOrder] = useArray<string>();

  const [rate, setRate] = React.useState();

  if (loading) {
    return <Loading />;
  }

  const place = data && data.placeBasicDetails;
  const { name, address } = place!;

  console.log(initialRateState);

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
          <RateSlider label={node.label} />
        ))}
      </section>
    </Page>
  );
};

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

const Text = styled.h2`
  margin-bottom: 5px;
  font-size: ${p => p.theme.fontSize.xxl};
  font-weight: 400;
  color: #222;
`;

const Score = styled.span`
  font-size: 1.625rem;
  font-weight: 700;
  color: #222;
`;

interface RateSliderProps {
  label: string;
}

const RateSlider = ({ label }: RateSliderProps) => {
  const [score, setScore] = React.useState(0);

  return (
    <Wrapper>
      <Text>
        <span>{label} – </span>
        <Score>{score}</Score>
      </Text>
      <InputSlider value={score} onInput={setScore} />
    </Wrapper>
  );
};
