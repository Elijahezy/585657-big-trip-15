import dayjs from 'dayjs';

export const humanizeEventDueDate = (dueDate) => dayjs(dueDate).format('D MMM');

export const humanizeEventHoursDate = (dueDate) => dayjs(dueDate).format('HH:mm');

export const isEventExpired = (dueDate) => dueDate === null ? false : dayjs().isAfter(dueDate, 'D');
