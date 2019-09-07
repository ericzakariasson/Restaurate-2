import { rateNodes } from './constants';
import { createInitialRateState } from './rateHelper';

export interface RateNode {
  order: number;
  name: string;
  label: string;
  score: number | null;
  children?: RateNode[];
}

export interface ReducerState {
  [key: string]: RateNode;
}

type Payload = Pick<RateNode, 'name' | 'score'> & { parent: string };

interface ReducerAction {
  type: 'SET_RATE';
  payload: Payload;
}

export const initialState = createInitialRateState(rateNodes);

export function rateReducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case 'SET_RATE':
      const { name, score, parent } = action.payload;

      if (parent) {
        const oldParentValue = state[parent];

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
          [name]: score
        }
      };
    default:
      throw new Error();
  }
}
