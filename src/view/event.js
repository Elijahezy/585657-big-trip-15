import dayjs from 'dayjs';
import { humanizeEventHoursDate, humanizeEventDueDate } from '../mock/utils';

const createEventList = () =>
  (
    '<ul class="trip-events__list"></ul>'
  );

const createOfferTemplate = (offerTitle, offerPrice) => (
  `<li class="event__offer">
    <span class="event__offer-title">${offerTitle.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offerPrice.price}</span>
  </li>`
);

const createOfferTemplateList = (elements) => {
  const result = [];
  for (let i = 0; i < elements.offers.length; i++) {
    const element = createOfferTemplate(elements.offers[i], elements.offers[i]);
    result.push(element);
  }
  return result;
};

const createEvent = (event) => {
  const {type, start, end, price, offer, isFavorite, day, destination } = event;
  const startHour = start !== 0
    ? humanizeEventHoursDate(start)
    : '';
  const endHour = end !== 0
    ? humanizeEventHoursDate(end)
    : '';
  const dueDate = day !== 0
    ? humanizeEventDueDate(day)
    : '';
  const diffHour = () => {
    if (dayjs(end).diff(start, 'hour') !== 0) {
      return `${dayjs(end).diff(start, 'hour')  }H`;
    }
    return `${dayjs(end).diff(start, 'minute')  }M`;
  };

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${day}">${dueDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${start}">${startHour}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${end}">${endHour}</time>
                  </p>
                  <p class="event__duration">${diffHour()}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createOfferTemplateList(offer).join('')}
                </ul>
                <button class="event__favorite-btn event__favorite-btn--${isFavorite === true ? 'active' : null}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
`;
};

export { createEventList, createEvent };

