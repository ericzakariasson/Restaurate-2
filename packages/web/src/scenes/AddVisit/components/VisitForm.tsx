import * as React from 'react';

import { PageTitle, ListInput } from '../../../components';
import { RateNodes } from './RateNodes';
import { rateNodes } from '@restaurate/web/src/constants';

import { Rate } from '../addVisitActions';

interface VisitFormProps {
  orders: string[];
  addOrder: (order: string) => void;
  removeOrder: (order: string) => void;
  addRate: (rate: Rate) => void;
  removeRate: (rate: Rate) => void;
  setMoving: (value: boolean) => void;
}

export const VisitForm = ({
  orders,
  addOrder,
  removeOrder,
  addRate,
  removeRate,
  setMoving
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
        addRate={addRate}
        removeRate={removeRate}
        setMoving={setMoving}
      />
    </>
  );
};
