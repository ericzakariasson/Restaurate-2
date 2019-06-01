import * as React from 'react';

import { PageTitle, ListInput } from './';

interface VisitFormProps {
  orders: string[];
  addOrder: (order: string) => void;
  removeOrder: (order: string) => void;
}

export const VisitForm = ({
  orders,
  addOrder,
  removeOrder
}: VisitFormProps) => {
  return (
    <>
      <PageTitle text="Besök" />
      <ListInput
        label="Beställnigar"
        items={orders}
        addItem={addOrder}
        removeItem={removeOrder}
      />
    </>
  );
};
