import dayjs from 'dayjs';

const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => {
  const result = Math.floor(Math.random() * elements.length);
  return elements[result];
};

const humanizeEventDueDate = (dueDate) => dayjs(dueDate).format('D MMM');

const humanizeEventHoursDate = (dueDate) => dayjs(dueDate).format('HH:mm');

const isEventExpired = (dueDate) => dueDate === null ? false : dayjs().isAfter(dueDate, 'D');

export { getRandomInteger, getRandomArrayElement, humanizeEventDueDate, humanizeEventHoursDate, isEventExpired };
