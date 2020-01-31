import { trackEvent } from 'analytics/trackEvent';
import { Image, Label, Loading, NavButton, Page, Score } from 'components';
import { rateNodes } from 'constants/rate.constants';
import { Rate, useVisitLazyQuery } from 'graphql/types';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { editVisitRoute, myPlaceRoute } from 'routes';
import styled from 'styled-components';
import { formatDate, translateRateName } from 'utils/format';
import { GeneralError } from '..';

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
  font-size: ${p => p.theme.fontSize.large};
`;

const Ratings = styled.ul`
  list-style: none;
`;

const RatingText = styled.h3`
  font-size: ${p => p.theme.fontSize.xl};
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
  font-size: ${p => p.theme.fontSize.large};
  font-weight: 400;
  color: #222;
`;

const Private = styled.h4`
  background: #222;
  color: #fff;
  border-radius: 4px;
  padding: 8px 13px;
  margin-bottom: 20px;
  align-self: flex-start;
`;

const Images = styled.section`
  margin: 0 -20px;
  overflow-x: scroll;
`;

const ImageList = styled.ul`
  display: flex;
  padding: 0 20px;
  list-style: none;
`;

const sortRatings = (a: Rate, b: Rate) => {
  const aNode = rateNodes.find(node => node.name === a.name);

  if (!aNode) {
    return 1;
  }

  const bNode = rateNodes.find(node => node.name === b.name);

  if (!bNode) {
    return 1;
  }

  return aNode.order > bNode.order ? 1 : -1;
};

export const VisitScene = () => {
  const { id } = useParams();

  const [getVisit, { data, loading, error }] = useVisitLazyQuery();

  React.useEffect(() => {
    if (id) {
      getVisit({ variables: { id } });
    }
  }, [id, getVisit]);

  if (!id) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  return (
    <Page
      title={data?.visit?.place?.details?.name ?? '–'}
      subTitle={formatDate(data?.visit?.visitDate)}
    >
      {data?.visit?.private && <Private>Privat</Private>}
      <Block>
        <Label text="Beställningar" />
        {(data?.visit?.orders.length ?? 0) > 0 ? (
          <OrderList>
            {data?.visit?.orders.map(order => (
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
          {[...(data?.visit?.ratings || [])].sort(sortRatings).map(rate => {
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
        <Score score={data?.visit?.score} />
      </Block>
      <Block>
        <Label text="Bilder" />
        <Images>
          <ImageList>
            {data?.visit?.images.map(image => (
              <li>
                {image.orders && image.orders.join(', ')}
                <Image key={image.id} publicId={image.publicId} />
              </li>
            ))}
          </ImageList>
        </Images>
      </Block>
      <Block>
        <Label text="Kommentar" />
        <Comment>{data?.visit?.comment || '–'}</Comment>
      </Block>
      <Block>
        <Label text="Övrigt" />
        {data?.visit?.takeAway ? (
          <OrderList>
            <OrderItem>
              <OrderTitle>– Take away</OrderTitle>
            </OrderItem>
          </OrderList>
        ) : (
          '–'
        )}
      </Block>
      {data?.visit?.place.providerId && (
        <NavButton
          variant="secondary"
          color="white"
          to={myPlaceRoute({ providerId: data.visit.place.providerId })}
          text={data.visit.place.details?.name ?? '—'}
          size="large"
          margin={['bottom']}
        />
      )}
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
