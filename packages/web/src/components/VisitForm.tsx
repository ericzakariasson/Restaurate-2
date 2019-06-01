import * as React from 'react';

import { PageTitle, ListInput } from './';
import { RateNodes } from './RateNodes';
import { rateNodes } from '../constants';

interface VisitFormProps {
  orders: string[];
  addOrder: (order: string) => void;
  removeOrder: (order: string) => void;
  addRate: (rate: { name: string; score: number; parent?: string }) => void;
  enableRateNode: (name: string) => void;
  disableRateNode: (name: string) => void;
}

export const VisitForm = ({
  orders,
  addOrder,
  removeOrder,
  addRate,
  enableRateNode,
  disableRateNode
}: VisitFormProps) => {
  return (
    <>
      <PageTitle text="Besök" />
      <ListInput
        label="Beställningar"
        items={orders}
        addItem={addOrder}
        removeItem={removeOrder}
      />
      <RateNodes
        nodes={rateNodes}
        // addRate={addRate}
        // enableRateNode={enableRateNode}
        // disableRateNode={disableRateNode}
      />
    </>
  );
};
