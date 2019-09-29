const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const minutes = (value: number) => value * MINUTE;
export const days = (value: number) => value * DAY;
