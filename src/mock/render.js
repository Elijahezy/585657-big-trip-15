import { showRouteInfo } from '../view/route-info.js';
import { showCostInfo } from '../view/cost-info.js';
import { showMenu } from '../view/menu.js';
import { showFilters } from '../view/filters.js';
import { showSortingMethods } from '../view/sort.js';
import { showEditModule } from '../view/event-edit';
import { createEventList, createEvent  } from '../view/event.js';
import { generateRoutePoints } from './data.js';
import dayjs from 'dayjs';

const DEFAULT_EVENTS = 18;

const events = new Array(DEFAULT_EVENTS).fill().map(generateRoutePoints);

events.sort((a, b) => {
  if (dayjs(a.day).format('DD') > dayjs(b.day).format('DD')) {
    return a.day - b.day;
  }
  if (dayjs(a.day).format('DD') < dayjs(b.day).format('DD')) {
    return a.day - b.day;
  }
  return 0;
});

const containerRouteAndCost = document.querySelector('.trip-main');
const containerMenu = document.querySelector('.trip-controls__navigation');
const containerFilters = document.querySelector('.trip-controls__filters');
const containerEvents = document.querySelector('.trip-events');

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

render(containerRouteAndCost, 'afterbegin', showRouteInfo(events));

const containerTripInfo = document.querySelector('.trip-info__main');

render(containerTripInfo, 'afterend', showCostInfo(events));
render(containerMenu, 'beforeend', showMenu());
render(containerFilters, 'beforeend', showFilters());
render(containerEvents, 'beforeend', showSortingMethods());
render(containerEvents, 'beforeend', createEventList());

const containerEventList = document.querySelector('.trip-events__list');

events.forEach((event) => {render(containerEventList, 'beforeend', createEvent(event));});

const eventEditButtons = document.querySelectorAll('.event__rollup-btn');
const eventItems = document.querySelectorAll('.trip-events__item');

const editEvent = (item, i) => {
  const onRollUpButtonClose = () => {
    const currentEventItem = eventItems[i].querySelector('.event');
    const closeButton = document.querySelector('.event--edit .event__rollup-btn');
    const eventEditModule = document.querySelector('.event--edit');
    closeButton.addEventListener('click', () => {
      eventEditModule.remove();
      currentEventItem.insertAdjacentElement('beforeend', item);
    });

  };
  const onRollUpButtonOpen = () => {
    if(eventItems[i].nextSibling !== document.querySelector('.event--edit')) {
      render(eventItems[i], 'afterend', showEditModule(events[i]));
      onRollUpButtonClose();
    }
  };
  item.addEventListener('click', onRollUpButtonOpen);
};

eventEditButtons.forEach(editEvent);

export { events };
