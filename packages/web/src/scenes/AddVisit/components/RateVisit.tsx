import * as React from 'react';
import styled from 'styled-components';
import { RateNode } from '../types/visit';

import { Node } from './RateNode';
import { Rate } from '../addVisitActions';
import { SmallLabel } from '../../../components/Label';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const AverageScore = styled.article`
  border-radius: 3px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #222;
  box-shadow: ${p => p.theme.boxShadow};
`;

const Score = styled.h2`
  font-size: 1.375rem;
  font-weight: 600;
  color: #222;
`;

const Label = styled(Score)``;

interface RateVisitProps {
  nodes: RateNode[];
  setRate: (rate: Rate) => void;
  setMoving: (value: boolean) => void;
  averageScore: number | null;
}

export const RateVisit = ({
  nodes,
  setMoving,
  setRate,
  averageScore
}: RateVisitProps) => (
  <Wrapper>
    <SmallLabel text="Betyg" />
    <section>
      {nodes.map(node => (
        <Node
          key={node.name}
          node={node}
          setMoving={setMoving}
          setRate={setRate}
        />
      ))}
      <AverageScore>
        <Label>Betyg</Label>
        <Score>{averageScore || '–'}</Score>
      </AverageScore>
    </section>
  </Wrapper>
);
