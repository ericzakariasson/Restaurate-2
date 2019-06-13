import { AddVisitInput } from '../../types/graphql-global-types';
import { ReducerState } from './addVisitReducer';

export function toInputData(state: ReducerState): AddVisitInput {
  if (state.place === null || state.place.place_id === undefined) {
    throw new Error();
  }

  return {
    providerPlaceId: state.place!.place_id,
    priceLevel: state.priceLevel,
    tags: state.tags,
    orders: state.orders,
    rating: state.rating,
    comment: state.comment,
    visitDate: state.date
  };
}
