export * from './slugify';
export * from './logger';
export * from './sendEmail';
export * from './env.helper';

export function round(value: number): number {
  return Math.round(value * 10) / 10;
}
