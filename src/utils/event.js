import dayjs from 'dayjs';
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, UNIX_START_DAY } from '../consts.js';

export const humanizeEventDueDate = (dueDate) => dayjs(dueDate).format('D MMM');

export const humanizeEventHoursDate = (dueDate) => dayjs(dueDate).format('HH:mm');

export const isEventExpired = (dueDate) => dueDate === null ? false : dayjs().isAfter(dueDate, 'D');

export const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;
export const sortByDay = (eventA, eventB) => eventA.start - eventB.start;
export const sortByTime = (pointA, pointB) => (dayjs(pointB.end).diff(dayjs(pointB.start), 'millisecond')) -  (dayjs(pointA.end).diff(dayjs(pointA.start), 'millisecond'));

export const getDuration = (from, to) => {
  let duration = dayjs(to).diff(dayjs(from), 'millisecond');
  let formatString;

  switch (true) {
    case duration >= MILLISECONDS_IN_DAY:
      formatString = 'DD[D] HH[H] mm[M]';
      break;
    case duration >= MILLISECONDS_IN_HOUR:
      formatString = 'HH[H] mm[M]';
      break;
    default:
      formatString = 'mm[M]';
  }
  duration = duration + new Date(duration).getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  return dayjs(duration).subtract(UNIX_START_DAY, 'day').format(formatString);
};

export const isDatesEqual = (dateA, dateB) =>
  (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
