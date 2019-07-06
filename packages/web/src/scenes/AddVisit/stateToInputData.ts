import { ReducerState } from './addVisitReducer';
import { AddVisitInput } from '../../graphql/types';

export function toInputData(state: ReducerState): AddVisitInput {
  if (state.foursquareId === '' || state.priceLevel === null) {
    throw new Error();
  }

  return {
    place: {
      foursquareId: state.foursquareId,
      priceLevel: state.priceLevel,
      types: state.types,
      tags: state.tags
    },
    visit: {
      orders: state.orders,
      visitDate: state.date,
      comment: state.comment,
      ratings: []
    }
  };
}
