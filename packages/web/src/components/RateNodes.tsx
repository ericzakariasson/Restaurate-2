import * as React from 'react';
import { RateNode } from '../types/visit';

import { Node } from './RateNode';

interface RateNodesProps {
  nodes: RateNode[];
  // addRate: any;
  // enableRateNode: (name: string) => void;
  // disableRateNode: (name: string) => void;
}

export const RateNodes = ({
  nodes
}: // addRate,
// enableRateNode,
// disableRateNode
RateNodesProps) => (
  <section>
    {nodes.map(node => (
      <Node
        key={node.name}
        node={node}
        // addRate={addRate}
        // enableRateNode={enableRateNode}
        // disableRateNode={disableRateNode}
      />
    ))}
  </section>
);
