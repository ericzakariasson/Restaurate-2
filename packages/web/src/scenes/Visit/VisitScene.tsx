import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import { Visit, VisitVariables } from '../../queries/types/Visit';

import { loader } from 'graphql.macro';
import { Loading, PageTitle } from '../../components';
import { formatDate, formatRate } from '../../utils/format';
const visitQuery = loader('../../queries/visit.gql');

const Page = styled.section`
  padding: 20px 30px;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

const Label = styled.span`
  font-family: ${p => p.theme.fonts.monospace};
  display: block;
  color: #ccc;
  margin-bottom: 10px;
`;

const Block = styled.article`
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const OrderList = styled.ol`
  /* list-style: none; */
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const OrderItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const OrderTitle = styled.span`
  margin-left: 10px;
  display: block;
  padding: 10px 13px;
  border-radius: 3px;
  border: 1px solid #eee;
  box-shadow: ${p => p.theme.boxShadow};
`;

const Comment = styled.p`
  line-height: 1.5;
`;

const RateList = styled.ul`
  list-style: none;
`;

const RateItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #eee;
  box-shadow: ${p => p.theme.boxShadow};
  font-size: 1.25rem;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const RateLabel = styled.span``;

const RateScore = styled.span`
  font-weight: 700;
`;

const ScoreItem = styled(RateItem)`
  color: #fff;
  background: #222;

  ${RateScore} {
    font-size: 1.5rem;
    color: ${p => p.theme.colors.primary.hues[0]};
  }
`;

type WithVisitId = { id: string };

export const VisitScene = ({
  match: {
    params: { id }
  }
}: RouteComponentProps<WithVisitId>) => {
  const { data, loading } = useQuery<Visit, VisitVariables>(visitQuery, {
    variables: { id }
  });

  console.log(id, data);

  if (loading) {
    return <Loading />;
  }

  if (data && data.visit) {
    const { visit } = data;

    const formattedRate = formatRate(visit.rate);

    return (
      <Page>
        <PageTitle
          text={visit.place.name}
          subTitle={formatDate(visit.visitDate)}
        />
        <Block>
          <Label>Beställningar</Label>
          <OrderList>
            {visit.orders &&
              visit.orders.map(order => (
                <OrderItem key={order.id}>
                  <OrderTitle>{order.title}</OrderTitle>
                </OrderItem>
              ))}
          </OrderList>
        </Block>
        <Block>
          <Label>Betyg</Label>
          <RateList>
            {formattedRate.map(rate => (
              <RateItem key={rate.label}>
                <RateLabel>{rate.label}</RateLabel>
                <RateScore>{rate.score || '-'}</RateScore>
              </RateItem>
            ))}
            <ScoreItem>
              <RateLabel>Total</RateLabel>
              <RateScore>{visit.rate.score}</RateScore>
            </ScoreItem>
          </RateList>
        </Block>
        <Block>
          <Label>Kommentar</Label>
          <Comment>{visit.comment || '-'}</Comment>
        </Block>
      </Page>
    );
  }

  return <span>Ej hitta</span>;
};
