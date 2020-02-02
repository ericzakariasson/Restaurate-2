import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatScore } from 'utils/format';

export const Card = styled.div`
  padding: 15px;
  background: #fefefe;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 8px;

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

export const CardLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: unset;
`;

const ScoreText = styled.h4<{ light?: boolean }>`
  font-size: 2rem;
  font-weight: ${p => (p.light ? 400 : 500)};
  white-space: pre;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.125rem;
  color: ${p => p.theme.colors.black.default};
`;
interface ScoreProps {
  score: number | null | undefined;
  light?: boolean;
}

export const Score = ({ score, light }: ScoreProps) => (
  <ScoreText light={light}>{formatScore(score)}</ScoreText>
);
