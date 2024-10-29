/**
 * Converts a date to a human-readable relative time string (e.g., "2 hours ago").
 * The function automatically selects the most appropriate time unit (years, months, weeks, etc.)
 * based on the time difference between the input date and current time.
 *
 * @param {Date} createdAt - The date to convert to relative time
 * @returns {string} A human-readable string representing the elapsed time (e.g., "2 days ago", "1 month ago")
 *
 * @example
 * ```typescript
 * // Using with current date
 * getTimeAgo(new Date()); // "0 seconds ago"
 *
 * // Using with past date
 * getTimeAgo(new Date('2023-01-01')); // "1 year ago"
 *
 * // Using with date few hours ago
 * getTimeAgo(new Date(Date.now() - 2 * 60 * 60 * 1000)); // "2 hours ago"
 * ```
 */

export function getTimeAgo(createdAt: Date): string {
  const now = Date.now();
  const postTime = new Date(createdAt).getTime();
  const differenceInMilliseconds = now - postTime;

  const timeUnits = {
    seconds: Math.floor(differenceInMilliseconds / 1000),
    minutes: Math.floor(differenceInMilliseconds / (1000 * 60)),
    hours: Math.floor(differenceInMilliseconds / (1000 * 60 * 60)),
    days: Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)),
    weeks: Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7)),
    months: Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30)),
    years: Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)),
  };

  if (timeUnits.years > 0) {
    return formateDate(timeUnits.years, 'years');
  } else if (timeUnits.months > 0) {
    return formateDate(timeUnits.months, 'months');
  } else if (timeUnits.weeks > 0) {
    return formateDate(timeUnits.weeks, 'weeks');
  } else if (timeUnits.days > 0) {
    return formateDate(timeUnits.days, 'days');
  } else if (timeUnits.hours > 0) {
    return formateDate(timeUnits.hours, 'hours');
  } else if (timeUnits.minutes > 0) {
    return formateDate(timeUnits.minutes, 'minutes');
  } else {
    return formateDate(timeUnits.seconds, 'seconds');
  }
}
const formateDate = (unit: number, value: string): string =>
  `${unit} ${value}${unit > 1 ? 's' : ''} ago`;
