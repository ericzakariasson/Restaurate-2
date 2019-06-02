import * as React from 'react';
import { RateNode } from '../../../types/visit';

import { Node } from './RateNode';
import { Rate } from '../addVisitActions';

interface RateNodesProps {
  nodes: RateNode[];
  addRate: (rate: Rate) => void;
  removeRate: (rate: Rate) => void;
  setMoving: (value: boolean) => void;
}

export const RateNodes = ({ nodes, setMoving, addRate }: RateNodesProps) => (
  <section>
    {nodes.map(node => (
      <Node
        key={node.name}
        node={node}
        setMoving={setMoving}
        addRate={addRate}
        // enableRateNode={enableRateNode}
        // disableRateNode={disableRateNode}
      />
    ))}
  </section>
);
