export interface RateNode {
  name: string;
  score: number;
  children?: RateNode[];
}
