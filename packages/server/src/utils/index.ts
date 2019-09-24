export * from './slugify';
export * from './logger';

export function round(value: number): number {
  return Math.round(value * 10) / 10;
}
