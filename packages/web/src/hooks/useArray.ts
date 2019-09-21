import React from 'react';

type UseArray<T> = [
  T[],
  (item: T) => void,
  (item: T) => void,
  (item: T[]) => void
];

export function useArray<T>(initialState: T[] = []): UseArray<T> {
  const [items, setItems] = React.useState<T[]>(initialState);

  const addItem = (item: T) => setItems(state => [...state, item]);
  const removeItem = (item: T) =>
    setItems(state => state.filter(x => x !== item));

  return [items, addItem, removeItem, setItems];
}
