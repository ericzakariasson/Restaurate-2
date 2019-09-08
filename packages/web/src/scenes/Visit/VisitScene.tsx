import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { GeneralError } from '..';
import { Loading, Page } from 'components';
import { useVisitQuery } from 'graphql/types';
import { placeRoute } from 'routes';
import { formatDate } from 'utils/format';

const PlaceLink = styled(Link)`
  padding: 15px;
  display: block;
  margin-bottom: 20px;
  background: ${p => p.theme.colors.primary.hues[9]};
  border: 1px solid #ccc;
  text-align: center;
  color: #222;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: ${p => p.theme.boxShadow};
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

// const RateList = styled.ul`

// const RateItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 15px;
//   border-radius: 5px;
//   border: 1px solid #eee;
//   box-shadow: ${p => p.theme.boxShadow};
//   font-size: 1.125rem;

//   &:not(:last-child) {
//     margin-bottom: 15px;
//   }
// `;

// const RateLabel = styled.span``;

// const RateScore = styled.span`
//   font-weight: 700;
// `;

// const ScoreItem = styled(RateItem)`
//   color: #fff;
//   background: #222;

//   ${RateScore} {
//     font-size: 1.5rem;
//     color: ${p => p.theme.colors.primary.hues[0]};
//   }
// `;

type WithVisitId = { id: string };

export const VisitScene = ({
  match: {
    params: { id }
  }
}: RouteComponentProps<WithVisitId>) => {
  const { data, loading, error } = useVisitQuery({
    variables: { id }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const visit = data && data.visit;
  const { place, visitDate, orders, comment } = visit!;

  // const formattedRate = formatRate(rate);

  return (
    <Page title={place.data.name} subTitle={formatDate(visitDate)}>
      <Block>
        <Label>Beställningar</Label>
        {orders && orders.length > 0 ? (
          <OrderList>
            {orders.map(order => (
              <OrderItem key={order.id}>
                <OrderTitle>{order.title}</OrderTitle>
              </OrderItem>
            ))}
          </OrderList>
        ) : (
          'Inga beställningar'
        )}
      </Block>
      <Block>
        <Label>Betyg</Label>
        {/* <RateList>
          {formattedRate.map(rate => (
            <RateItem key={rate.label}>
              <RateLabel>{rate.label}</RateLabel>
              <RateScore>{rate.score || '-'}</RateScore>
            </RateItem>
          ))}
          <ScoreItem>
            <RateLabel>Total</RateLabel>
            <RateScore>{rate.score}</RateScore>
          </ScoreItem>
        </RateList> */}
      </Block>
      <Block>
        <Label>Kommentar</Label>
        <Comment>{comment || 'Ingen kommentar'}</Comment>
      </Block>
      <PlaceLink to={placeRoute(place.foursquareId)}>
        Visa stället {place.data.name}
      </PlaceLink>
    </Page>
  );
};
