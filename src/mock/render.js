import RouteInfoView from '../view/route-info.js';
import FiltersView from '../view/filters.js';
import SiteMenuView from '../view/menu.js';
import CostInfoView from '../view/cost-info.js';
import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import EventView from '../view/event.js';
import EditModuleView from '../view/event-edit.js';
import { generateRoutePoints } from './data.js';
import dayjs from 'dayjs';

import { render, RenderPosition } from './utils.js';

const DEFAULT_EVENTS = 18;

const events = new Array(DEFAULT_EVENTS).fill().map(generateRoutePoints);

events.sort((a, b) => {
  if (dayjs(a.day).format('DD') > dayjs(b.day).format('DD')) {
    return 1;
  }
  if (dayjs(a.day).format('DD') < dayjs(b.day).format('DD')) {
    return -1;
  }
  return 0;
});


const containerRouteAndCost = document.querySelector('.trip-main');
const containerTripNav = document.querySelector('.trip-controls__navigation');
const containerEvents = document.querySelector('.trip-events');


render(containerRouteAndCost, new RouteInfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const routeAndCostContainer = document.querySelector('.trip-main__trip-info');

render(routeAndCostContainer, new CostInfoView(events).getElement(), RenderPosition.BEFOREEND);

render(containerTripNav, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(containerTripNav, new FiltersView().getElement(), RenderPosition.BEFOREEND);

render(containerEvents, new SortView().getElement(), RenderPosition.BEFOREEND);
render(containerEvents, new EventListView().getElement(), RenderPosition.BEFOREEND);

const eventListContainer = document.querySelector('.trip-events__list');

events.forEach((it, i) => {
  const eventComponent = new EventView(events[i]);
  const eventEditComponent = new EditModuleView(events[i]);

  render(eventListContainer, eventComponent.getElement(), RenderPosition.BEFOREEND );

  const replaceCardToForm = (taskListElement) => {
    taskListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  eventComponent.getElement().querySelectorAll('.event__rollup-btn').forEach((item) => {})
});



export { events };
