import * as React from 'react';
import { Visit } from 'graphql/types';
import styled from 'styled-components';
import { Card, CardLink, Score } from './Card';
import { PlaceInfo } from './PlaceInfo';
import { visitRoute } from '../routes';

const PlaceArea = styled.div`
  margin-right: 0.5rem;
`;

const VisitArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCardLink = styled(CardLink)`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

interface ScoreBarProps {
  score: number;
}

const ScoreBar = styled.div<ScoreBarProps>`
  margin-top: 0.25rem;
  height: 0.25rem;
  background: #eee;
  border-radius: 0.25rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${p => p.theme.colors.primary.default};
    transform: scaleX(${p => p.score / 10});
    transform-origin: 0 100%;
    border-radius: 0.25rem;
  }
`;

export const InfoText = styled.p`
  color: #666;
  font-size: ${p => p.theme.fontSize.small};
  font-weight: 600;
  margin-top: 0.5rem;
`;

interface VisitCardProps {
  visit: Visit;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>; // From Styled Components source
}

export const VisitCard: React.FC<VisitCardProps> = ({ visit, as = 'li' }) => {
  const info = visitInfo(visit);

  return (
    <Card as={as}>
      <StyledCardLink to={visitRoute(visit.id)}>
        <Wrapper>
          <PlaceArea>
            <PlaceInfo
              name={visit.place.details?.name}
              address={visit.place.details?.location.address.formatted}
            />
          </PlaceArea>
          <VisitArea>
            <Score score={visit.score} />
            <ScoreBar score={visit.score} />
          </VisitArea>
        </Wrapper>
        {info && <InfoText>{info}</InfoText>}
      </StyledCardLink>
    </Card>
  );
};

export const visitInfo = (visit: Visit) => {
  const orders =
    visit.orders.length > 0
      ? `${visit.orders.length} ${plural(
          'beställning',
          'ar',
          visit.orders.length > 1
        )}`
      : null;

  const comment = visit.comment ? 'kommentar' : null;

  const images =
    visit.images.length > 0
      ? `${visit.images.length} ${plural(
          'bild',
          'er',
          visit.images.length > 1
        )}`
      : null;

  return [orders, comment, images].filter(Boolean).join(' • ');
};

const plural = (word: string, suffix: string, condition: boolean) =>
  `${word}${condition ? suffix : ''}`;
