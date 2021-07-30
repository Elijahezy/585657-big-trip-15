import { showRouteInfo } from './view/route-info';
import { showCostInfo } from './view/cost-info';
import { showMenu } from './view/menu';
import { showFilters } from './view/filters';
import { showSortingMethods } from './view/sort';
import { showEditModule } from './view/event-edit';
import { createEventList, createEvent  } from './view/event';

const DEFAULT_EVENTS = 3;

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
  render(containerEventList, 'beforeend', createEvent());
}

const firstEventInList = containerEventList.querySelector('li:nth-child(1)');

render(firstEventInList, 'afterend', showEditModule());
