import { Tag } from '../../types/place';
import { RateNode } from '../../types/visit';
import { rateNodes } from '../../constants';

import {
  SET_PLACE,
  RESET_PLACE,
  SET_PRICE_LEVEL,
  RESET_PRICE_LEVEL,
  ADD_TAG,
  REMOVE_TAG,
  ADD_ORDER,
  REMOVE_ORDER,
  ADD_RATE
} from './addVisitActions';

const initialNodeState = (rest: any) => ({
  open: false,
  score: null,
  ...rest
});

function createInitialRateState(nodes: RateNode[]): RateInterface {
  return nodes
    .sort(node => node.order)
    .reduce((tree: any, { name, children, ...rest }: RateNode) => {
      if (!tree[name]) {
        tree[name] = initialNodeState({
          name,
          children: children ? createInitialRateState(children) : undefined,
          ...rest
        });
      }
      return tree;
    }, {});
}

interface RateInterface {
  [key: string]: {
    open: boolean;
    score: number | null;
    children?: RateInterface;
  };
}

interface ReducerState {
  place: google.maps.places.PlaceResult | null;
  priceLevel: number | undefined;
  tags: string[];
  orders: string[];
  rate: RateInterface;
}

interface ReducerAction {
  type: string;
  payload: any;
}

export const initialState = {
  place: null,
  priceLevel: undefined,
  tags: [],
  orders: [],
  rate: createInitialRateState(rateNodes)
};

export function addVisitReducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case SET_PLACE:
      return {
        ...state,
        place: action.payload
      };
    case RESET_PLACE:
      return {
        ...state,
        place: initialState.place
      };
    case SET_PRICE_LEVEL:
      return {
        ...state,
        priceLevel: action.payload
      };
    case RESET_PRICE_LEVEL:
      return {
        ...state,
        priceLevel: initialState.priceLevel
      };
    case ADD_TAG:
      return {
        ...state,
        tags: state.tags.includes(action.payload.toLowerCase())
          ? state.tags
          : [...state.tags, action.payload.toLowerCase()]
      };
    case REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag: string) => tag !== action.payload)
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: state.orders.includes(action.payload.toLowerCase())
          ? state.orders
          : [...state.orders, action.payload.toLowerCase()]
      };
    case REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order: string) => order !== action.payload)
      };
    case ADD_RATE:
      const { name, score, parent } = action.payload;

      if (parent) {
        const oldParentValue = state.rate[parent];

        const newParentValue = {
          ...oldParentValue,
          children: {
            ...oldParentValue.children,
            [name]: { score }
          }
        };

        return {
          ...state,
          rate: {
            ...state.rate,
            [parent]: newParentValue
          }
        };
      }

      return {
        ...state,
        rate: {
          ...state.rate,
          [name]: { score }
        }
      };
    default:
      throw new Error();
  }
}
