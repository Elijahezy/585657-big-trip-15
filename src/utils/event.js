import dayjs from 'dayjs';

export const humanizeEventDueDate = (dueDate) => dayjs(dueDate).format('D MMM');

export const humanizeEventHoursDate = (dueDate) => dayjs(dueDate).format('HH:mm');

export const isEventExpired = (dueDate) => dueDate === null ? false : dayjs().isAfter(dueDate, 'D');

export const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;
export const sortByDay = (eventA, eventB) => eventA.day - eventB.day;
export const sortByTime = (pointA, pointB) => (pointB.end - pointB.start) - (pointA.end - pointA.start);
