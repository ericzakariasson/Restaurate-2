import * as React from 'react';
import { useArray } from 'hooks';
import { rateNodes } from 'constants/rate.constants';
import {
  rateReducer,
  SetRatePayload,
  ReducerState,
  SetStatePayload,
  RateNode
} from './rateReducer';
import { createInitialRateState, calculateAverageScore } from './rateHelper';
import { VisitRateFragment, Rate } from 'graphql/types';

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

interface UseVisitFormInitialValues {
  orders: string[];
  ratings: Rate[];
  comment: string;
  visitDate: Date;
}

const transformRateToRateNode = (rate: Rate): RateNode => {
  const children =
    rate.children && rate.children !== null
      ? rate.children.map(transformRateToRateNode)
      : undefined;

  const n = rateNodes.find(n => n.name === rate.name);

  const node: RateNode = {
    order: n!.order,
    name: rate.name,
    label: n!.label,
    score: rate.score,
    children
  };

  return node;
};

export function useVisitForm(
  initialValues?: UseVisitFormInitialValues
): UseVisitForm {
  const [orders, addOrder, removeOrder, setOrders] = useArray<string>();
  const [comment, setComment] = React.useState('');
  const [visitDate, setVisitDate] = React.useState(new Date());

  const initialRateState = createInitialRateState(rateNodes);
  const [rateState, dispatch] = React.useReducer(rateReducer, initialRateState);

  const setRateState = (payload: SetStatePayload) =>
    dispatch({ type: 'SET_STATE', payload });

  const setScore = (payload: SetRatePayload) =>
    dispatch({ type: 'SET_RATE', payload });

  const averageScore = calculateAverageScore(rateState);

  React.useEffect(() => {
    if (initialValues) {
      setOrders(initialValues.orders);
      setComment(initialValues.comment);
      setVisitDate(initialValues.visitDate);
      const rateNodes = initialValues.ratings.map(transformRateToRateNode);
      const rs = createInitialRateState(rateNodes);
      setRateState({ rateState: rs });
    }
  }, [initialValues]);

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
