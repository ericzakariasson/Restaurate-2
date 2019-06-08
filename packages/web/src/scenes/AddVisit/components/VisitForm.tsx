import * as React from 'react';
import { rateNodes } from '../../../constants';

import { PageTitle, ListInput } from '../../../components';
import { RateVisit } from './RateVisit';
import { Comment } from './Comment';
import { VisitDate } from './VisitDate';

import { FieldArray } from 'formik';

import { Rate } from '../addVisitActions';

interface VisitFormProps {
  orders: string[];
  setRate: (rate: Rate) => void;
  setMoving: (value: boolean) => void;
  averageScore: number | null;
  setComment: (value: string) => void;
  setDate: (date: Date) => void;
}

export const VisitForm = ({
  orders,
  setRate,
  setMoving,
  averageScore,
  setComment,
  setDate
}: VisitFormProps) => {
  return (
    <>
      <PageTitle text="Besök" />
      <FieldArray name="orders">
        {({ push, remove }) => (
          <ListInput
            label="Beställningar"
            removeItem={remove}
            items={orders}
            addItem={push}
          />
        )}
      </FieldArray>
      <RateVisit
        nodes={rateNodes}
        setRate={setRate}
        setMoving={setMoving}
        averageScore={averageScore}
      />
      <Comment setComment={setComment} />
      <VisitDate setDate={setDate} />
    </>
  );
};
