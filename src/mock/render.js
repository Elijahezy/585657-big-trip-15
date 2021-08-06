import { showRouteInfo } from '../view/route-info.js';
import { showCostInfo } from '../view/cost-info.js';
import { showMenu } from '../view/menu.js';
import { showFilters } from '../view/filters.js';
import { showSortingMethods } from '../view/sort.js';
import { createEventList, createEvent  } from '../view/event.js';
import { generateDestination } from './data.js';

const DEFAULT_EVENTS = 18;

const events = new Array(DEFAULT_EVENTS).fill().map(generateDestination);

const containerRouteAndCost = document.querySelector('.trip-main');
const containerMenu = document.querySelector('.trip-controls__navigation');
const containerFilters = document.querySelector('.trip-controls__filters');
const containerEvents = document.querySelector('.trip-events');

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

render(containerRouteAndCost, 'afterbegin', showRouteInfo());

const containerTripInfo = document.querySelector('.trip-info__main');

render(containerTripInfo, 'afterend', showCostInfo());
render(containerMenu, 'beforeend', showMenu());
render(containerFilters, 'beforeend', showFilters());
render(containerEvents, 'beforeend', showSortingMethods());
render(containerEvents, 'beforeend', createEventList());

const containerEventList = document.querySelector('.trip-events__list');

for (let i = 0; i < DEFAULT_EVENTS; i++) {
  render(containerEventList, 'beforeend', createEvent(events[i]));
}

export { render, events };
