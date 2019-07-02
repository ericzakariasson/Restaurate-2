export interface RateNode {
  order: number;
  name: string;
  label: string;
  score: number | null;
  children?: RateNode[];
}
