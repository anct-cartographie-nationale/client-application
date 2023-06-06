const DAYS_IN_YEAR: 365 = 365 as const;
const MILLISECONDS_IN_DAY: number = 24 * 60 * 60 * 1000;
const DATE_LIMIT_OFFSET: number = DAYS_IN_YEAR * MILLISECONDS_IN_DAY;

export const isTooOld = (now: Date) => (date: Date) => date.getTime() < now.getTime() - DATE_LIMIT_OFFSET;
