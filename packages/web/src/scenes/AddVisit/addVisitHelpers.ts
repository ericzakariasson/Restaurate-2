import { RateNode } from './types/visit';
import { ReducerState, RateNodeState } from './addVisitReducer';

function round(value: number, precision = 1) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

interface Score {
  totalScore: number;
  entries: number;
}

export function calculateAverageScore(state: ReducerState) {
  const score = Object.entries(state.rate).reduce(
    (score: Score, [key, value]: [string, number]) => {
      if (value) {
        score.totalScore += value;
        score.entries += 1;
      }

      return score;
    },
    { totalScore: 0, entries: 0 }
  );

  const average = round(score.totalScore / score.entries);

  if (Number.isFinite(average)) {
    return average;
  }

  return null;
}

const initialNodeState = (rest: any) => null; /* ({
  score: null,
  ...rest
}); */

export function createInitialRateState(nodes: RateNode[]): RateNodeState {
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
