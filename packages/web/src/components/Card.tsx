import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Card = styled.div`
  padding: 15px;
  background: #fefefe;
  border: 1px solid #999;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 4px;

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

const Place = styled.div``;

const Name = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 3px;
`;

const Address = styled.p``;

const Score = styled.h4`
  font-size: 2.4rem;
  font-weight: 400;
`;

const Numbers = styled.div``;

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
      <Numbers>
        {children}
        <Score>{score}</Score>
      </Numbers>
    </NeutralLink>
  </Card>
);
