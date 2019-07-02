import { ReducerState } from './addVisitReducer';
import { AddVisitInput } from '../../graphql/types';

export function toInputData(state: ReducerState): AddVisitInput {
  if (state.place === null || state.place.place_id === undefined) {
    throw new Error();
  }

  return {
    providerPlaceId: state.place!.place_id,
    priceLevel: state.priceLevel,
    tags: state.tags,
    orders: state.orders,
    rate: state.rate,
    comment: state.comment,
    visitDate: state.date,
    types: state.place!.types!
  };
}
