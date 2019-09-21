import { ReducerState, RateNode, RateStateNode } from './rateReducer';
import { RateInput, VisitRateFragment } from 'graphql/types';

function round(value: number, precision = 1) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

interface Score {
  totalScore: number;
  entries: number;
}

export function calculateAverageNodeScore(children: RateStateNode[]) {
  const score = children.reduce(
    (score: Score, node: RateStateNode) => {
      if (node.score) {
        score.totalScore += node.score;
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

export function calculateAverageScore(state: ReducerState) {
  const score = Object.entries(state).reduce(
    (score: Score, [key, node]: [string, RateStateNode]) => {
      if (node.score) {
        score.totalScore += node.score;
        score.entries += 1;
      } else if (node.children) {
        const childArray = Object.values(node.children);
        const averageNodeScore = calculateAverageNodeScore(childArray);

        score.totalScore += averageNodeScore!;
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

const initialNodeState = (rest: any) => ({
  score: null,
  ...rest
});

export function createInitialRateState(nodes: RateNode[]): ReducerState {
  return nodes.reduce((tree: any, { name, children, ...rest }: RateNode) => {
    if (!tree[name]) {
      tree[name] = initialNodeState({
        name,
        controlled: false,
        children: children ? createInitialRateState(children) : undefined,
        ...rest
      });
    }
    return tree;
  }, {});
}

type Node = { [key: string]: RateStateNode };

export function transformToInput(state: Node): RateInput[] {
  const inputs = Object.entries(state)
    .map(([key, node]) => {
      const calculatedScore =
        calculateAverageNodeScore(Object.values(node.children || {})) || 0;

      return {
        name: node.name,
        calculatedScore: node.controlled,
        score: node.controlled ? calculatedScore : node.score || 0,
        children: node.children ? transformToInput(node.children) : null
      };
    })
    .filter(rating => rating.score !== 0);

  return inputs;
}
