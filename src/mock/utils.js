import dayjs from 'dayjs';


export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  AFTEREND: 'afterend',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => {
  const result = Math.floor(Math.random() * elements.length);
  return elements[result];
};

const humanizeEventDueDate = (dueDate) => dueDate ? dayjs(dueDate).format('D MMM') : '';

const humanizeEventHoursDate = (dueDate) => dueDate ? dayjs(dueDate).format('HH:mm') : '';

const isEventExpired = (dueDate) => dueDate === null ? false : dayjs().isAfter(dueDate, 'D');

export { getRandomInteger, getRandomArrayElement, humanizeEventDueDate, humanizeEventHoursDate, isEventExpired };
