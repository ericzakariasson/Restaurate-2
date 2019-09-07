import { rateNodes } from './constants';
import { createInitialRateState } from './rateHelper';

export interface SetRatePayload {
  score: number;
  name: string;
  parent?: string;
}

export interface RateNode {
  order: number;
  name: string;
  label: string;
  score: number | null;
  children?: RateNode[];
}

export interface ReducerState {
  food: RateStateNode;
  service: RateStateNode;
  environment: RateStateNode;
  experience: RateStateNode;
  [key: string]: RateStateNode;
}

export interface RateStateNode {
  order: number;
  name: string;
  label: string;
  score: number | null;
  controlled: boolean;
  children?: {
    [key: string]: RateStateNode;
  };
}

type Payload = SetRatePayload;

interface ReducerAction {
  type: 'SET_RATE';
  payload: Payload;
}

export const initialState = createInitialRateState(rateNodes);

export function rateReducer(
  state: ReducerState,
  action: ReducerAction
): ReducerState {
  switch (action.type) {
    case 'SET_RATE':
      const { name, score, parent: parentName } = action.payload;

      if (parentName) {
        const parent = state[parentName];
        const child = parent.children && parent.children[name];

        const updatedChild = { ...child, score };

        const updatedParent = {
          ...parent,
          controlled: true,
          children: {
            ...parent.children,
            [name]: updatedChild
          }
        };

        return {
          ...state,
          [parentName]: updatedParent
        };
      }

      const node = state[name];

      const updatedNode = {
        ...node,
        controlled: false,
        score
      };

      return {
        ...state,
        [name]: updatedNode
      };
    default:
      throw new Error();
  }
}
