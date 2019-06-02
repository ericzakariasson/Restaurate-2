import * as React from 'react';

import { PageTitle, ListInput } from '../../../components';
import { RateVisit } from './RateVisit';
import { rateNodes } from '@restaurate/web/src/constants';

import { Rate } from '../addVisitActions';

interface VisitFormProps {
  orders: string[];
  addOrder: (order: string) => void;
  removeOrder: (order: string) => void;
  setRate: (rate: Rate) => void;
  setMoving: (value: boolean) => void;
}

export const VisitForm = ({
  orders,
  addOrder,
  removeOrder,
  setRate,
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
      <RateVisit nodes={rateNodes} setRate={setRate} setMoving={setMoving} />
    </>
  );
};
