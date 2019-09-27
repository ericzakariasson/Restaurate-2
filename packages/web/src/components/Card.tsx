import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatScore } from 'utils/format';

export const Card = styled.div`
  padding: 15px;
  background: #fefefe;
  border: 1px solid #eee;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 8px;

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

const NeutralLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #222;
`;

const Place = styled.div`
  margin-right: 10px;
`;

const Name = styled.h3`
  font-size: ${p => p.theme.fontSize.large};
  margin-bottom: 3px;
`;

const Address = styled.p`
  font-weight: 600;
  color: #aaa;
  font-size: ${p => p.theme.fontSize.small};
`;

const Numbers = styled.div`
  margin-right: 10px;
`;

const ScoreArea = styled.div`
  display: flex;
`;

interface ScoreBarProps {
  score: number;
}

const ScoreBar = styled.div<ScoreBarProps>`
  width: 3px;
  background: #eee;
  border-radius: 3px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${p => p.theme.colors.primary.default};
    transform: scaleY(${p => p.score / 10});
    transform-origin: 0 100%;
  }
`;

interface PlaceCardProps {
  name: string;
  address: string;
  score: number;
  to: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>; // From Styled Component source
}

export const CardWithScore = ({
  name,
  to,
  address,
  score,
  children,
  as = 'li'
}: PlaceCardProps) => (
  <Card as={as}>
    <NeutralLink to={to}>
      <Place>
        <Name>{name}</Name>
        <Address>{address}</Address>
      </Place>
      <ScoreArea>
        <Numbers>
          {children}
          <Score score={score} />
        </Numbers>
        <ScoreBar score={score || 0} />
      </ScoreArea>
    </NeutralLink>
  </Card>
);

const ScoreText = styled.h4`
  font-size: 2.4rem;
  font-weight: 400;
  white-space: pre;
`;

const ScoreCharacter = styled.span`
  display: inline-block;

  &:nth-child(1) {
    width: 24px;
    text-align: right;
  }

  &:nth-child(2) {
    width: 7px;
  }

  &:nth-child(3) {
    width: 24px;
  }
`;

interface ScoreProps {
  score: number;
}

export const Score = ({ score }: ScoreProps) => (
  <ScoreText>
    {score !== 0
      ? formatScore(score)
          .split('')
          .map(c => <ScoreCharacter key={c}>{c}</ScoreCharacter>)
      : '–'}
  </ScoreText>
);
