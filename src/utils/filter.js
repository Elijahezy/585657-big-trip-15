import {FilterType} from '../consts.js';
import {isEventExpired} from './event';

export const filter = {
  [FilterType.EVERYTHING]: (events) => events.filter((event) => event),
  [FilterType.FUTURE]: (events) => events.filter((event) => !isEventExpired(event.day)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventExpired(event.day)),
};
