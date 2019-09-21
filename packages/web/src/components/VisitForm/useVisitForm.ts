import * as React from 'react';
import { useArray } from 'hooks';
import { rateNodes } from 'constants/rate.constants';
import { rateReducer, SetRatePayload, ReducerState } from './rateReducer';
import { createInitialRateState, calculateAverageScore } from './rateHelper';

export interface Handlers {
  addOrder: (name: string) => void;
  removeOrder: (name: string) => void;
  setComment: (text: string) => void;
  setVisitDate: (date: Date) => void;
  setScore: (payload: SetRatePayload) => void;
}

export interface Values {
  orders: string[];
  comment: string;
  visitDate: Date;
  rateState: ReducerState;
  averageScore: number | null;
}

interface UseVisitForm {
  handlers: Handlers;
  values: Values;
}

export function useVisitForm(): UseVisitForm {
  const [orders, addOrder, removeOrder] = useArray<string>();
  const [comment, setComment] = React.useState('');
  const [visitDate, setVisitDate] = React.useState(new Date());

  const initialRateState = createInitialRateState(rateNodes);
  const [rateState, dispatch] = React.useReducer(rateReducer, initialRateState);

  const averageScore = calculateAverageScore(rateState);

  const setScore = (payload: SetRatePayload) =>
    dispatch({ type: 'SET_RATE', payload });

  const handlers: Handlers = {
    addOrder,
    removeOrder,
    setComment,
    setVisitDate,
    setScore
  };

  const values: Values = {
    orders,
    comment,
    visitDate,
    rateState,
    averageScore
  };

  return { handlers, values };
}
