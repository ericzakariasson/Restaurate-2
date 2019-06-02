import * as React from 'react';
import styled from 'styled-components';
import { RateNode } from '../../../types/visit';

import { Node } from './RateNode';
import { Rate } from '../addVisitActions';
import { SmallLabel } from '../../../components/Label';

interface RateVisitProps {
  nodes: RateNode[];
  setRate: (rate: Rate) => void;
  setMoving: (value: boolean) => void;
}

export const RateVisit = ({ nodes, setMoving, setRate }: RateVisitProps) => (
  <div>
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
    </section>
  </div>
);
