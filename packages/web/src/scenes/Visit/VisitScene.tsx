import { Label, Loading, NavButton, Page } from 'components';
import { rateNodes } from 'constants/rate.constants';
import { Rate, useVisitQuery } from 'graphql/types';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { editVisitRoute, placeRoute, WithVisitId } from 'routes';
import styled from 'styled-components';
import { formatDate, translateRateName } from 'utils/format';
import { GeneralError } from '..';
import { trackEvent } from 'analytics/trackEvent';

const Block = styled.article`
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

const OrderList = styled.ol`
  list-style: none;
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
  display: block;
  font-size: ${p => p.theme.fontSize.large};
`;

const Comment = styled.p`
  line-height: 1.5;
`;

const Ratings = styled.ul`
  list-style: none;
`;

const RatingText = styled.h3`
  font-size: ${p => p.theme.fontSize.xxl};
  font-weight: 400;
  color: #222;
`;

const RatingScore = styled.span`
  font-weight: 700;
`;

const RatingWrapper = styled.div`
  display: flex;
`;

const ChildRatings = styled(Ratings)`
  margin-left: 10px;
  margin-top: 10px;
`;

const Rating = styled.li`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const ChildRating = styled(Rating)`
  display: flex;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const ChildRatingText = styled.h4`
  font-size: ${p => p.theme.fontSize.xl};
  font-weight: 400;
  color: #222;
`;

const sortRatings = (a: Rate, b: Rate) => {
  const aNode = rateNodes.find(node => node.name === a.name)!;
  const bNode = rateNodes.find(node => node.name === b.name)!;
  return aNode.order > bNode.order ? 1 : -1;
};

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
  const { place, visitDate, orders, comment, ratings } = visit!;

  return (
    <Page title={place.details.name} subTitle={formatDate(visitDate)}>
      <Block>
        <Label text="Beställningar" />
        {orders && orders.length > 0 ? (
          <OrderList>
            {orders.map(order => (
              <OrderItem key={order.id}>
                <OrderTitle>– {order.title}</OrderTitle>
              </OrderItem>
            ))}
          </OrderList>
        ) : (
          '–'
        )}
      </Block>
      <Block>
        <Label text="Betyg" />
        <Ratings>
          {ratings.sort(sortRatings).map(rate => {
            return (
              <Rating key={rate.name}>
                <RatingWrapper>
                  <RatingText>
                    {translateRateName(rate.name)} –{' '}
                    <RatingScore>{rate.score}</RatingScore>
                  </RatingText>
                </RatingWrapper>
                {rate.children && (
                  <ChildRatings>
                    {rate.children.map(child => (
                      <ChildRating>
                        <ChildRatingText>
                          {translateRateName(child.name)} –{' '}
                          <RatingScore>{child.score}</RatingScore>
                        </ChildRatingText>
                      </ChildRating>
                    ))}
                  </ChildRatings>
                )}
              </Rating>
            );
          })}
        </Ratings>
      </Block>
      <Block>
        <Label text="Kommentar" />
        <Comment>{comment || '–'}</Comment>
      </Block>
      <NavButton
        variant="secondary"
        color="white"
        to={placeRoute(place.providerId)}
        text={`${place.details.name}`}
        size="large"
        margin={['bottom']}
      />
      <NavButton
        onClick={() => trackEvent({ category: 'Form', action: 'Edit Visit' })}
        text="Redigera"
        color="gray"
        variant="secondary"
        to={editVisitRoute(id)}
        size="normal"
      />
    </Page>
  );
};
