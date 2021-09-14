import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, UNIX_START_DAY } from '../consts';
import { isDatesEqual } from './event';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

const checkIfEventsExist = (events) => events.filter((event) => event.length !== 0);

const filterEvents = (events, point) => {
  const filteredArrays = [];
  events.forEach((array) => array.filter((event) => {
    event.type === point ? filteredArrays.push(event) : false;
  }));
  return filteredArrays;
};


export const countEventsPrice = (events, points) => {
  const finalPriceOfEvents = [];

  const existingEvents = checkIfEventsExist(events);

  points.forEach((point) => {
    const filtereEvents = filterEvents(existingEvents, point);

    if (filtereEvents.length !== 0) {
      const reducedEventsPrice = filtereEvents.reduce((sum, element) => sum + element.price, 0);
      finalPriceOfEvents.push(reducedEventsPrice);
    }

    if (filtereEvents.length === 0) {
      finalPriceOfEvents.push('0');
    }
  });

  return finalPriceOfEvents;
};

export const countEventsType = (events, points) => {
  const finalTypesOfEvents = [];

  const existingEvents = checkIfEventsExist(events);

  points.forEach((point) => {
    const filtereEvents = filterEvents(existingEvents, point);

    finalTypesOfEvents.push(filtereEvents.length);
  });

  return finalTypesOfEvents;
};

const getTimeInMilliSeconds = (from, to) => {
  const duration = dayjs(to).diff(dayjs(from), 'millisecond');
  return duration;
};

export const countEventsDurationInMilliSeconds = (events, points) => {
  const finalDurations = [];

  const existingEvents = checkIfEventsExist(events);

  points.forEach((point) => {
    const filtereEvents = filterEvents(existingEvents, point);

    const reducedEventsTime = filtereEvents.reduce((sum, event) => {
      const time = getTimeInMilliSeconds(event.start, event.end);
      return sum + time;
    }, 0);
    finalDurations.push(reducedEventsTime);
  });
  return finalDurations;
};

export const humanizeDurationOfEvents = (duration) => {
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

export const countEventsInDateRange = (dates, events) => dates.map((date) =>
  events.filter((event) => isDatesEqual(event.day, date)));

export const getDatesInRange = (dateFrom, dateTo) => {
  const dates = [];
  const stepDate = new Date(dateFrom);

  while (dayjs(stepDate).isSameOrBefore(dateTo)) {
    dates.push(new Date(stepDate));
    stepDate.setDate(stepDate.getDate() + 1);
  }

  return dates;
};

