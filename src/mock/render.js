import RouteInfoView from '../view/route-info.js';
import FiltersView from '../view/filters.js';
import SiteMenuView from '../view/menu.js';
import CostInfoView from '../view/cost-info.js';
import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import EventView from '../view/event.js';
import EditModuleView from '../view/event-edit.js';
import NoEventsView from '../view/no-events.js';
import { generateRoutePoints } from './data.js';
import dayjs from 'dayjs';

import { render, RenderPosition, replace } from '../utils/render.js';

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
const containerTripNav = document.querySelector('.trip-controls__navigation');

render(containerRouteAndCost, new RouteInfoView(events), RenderPosition.AFTERBEGIN);

const routeAndCostContainer = document.querySelector('.trip-main__trip-info');

render(routeAndCostContainer, new CostInfoView(events), RenderPosition.BEFOREEND);

render(containerTripNav, new SiteMenuView(), RenderPosition.BEFOREEND);
render(containerTripNav, new FiltersView(), RenderPosition.BEFOREEND);

const renderEvent = (renderListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EditModuleView(event);

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };


  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(renderListElement, eventComponent, RenderPosition.BEFOREEND);
};

const boardComponent = document.querySelector('.trip-events');
const renderBoard = (boardContainer, boardTasks) => {

  const taskListComponent = new EventListView();

  render(boardContainer, taskListComponent, RenderPosition.BEFOREEND);

  render(boardContainer, new SortView(), RenderPosition.AFTERBEGIN);

  if (boardTasks.every((task) => !task)) {
    render(boardContainer, new NoEventsView(), RenderPosition.BEFOREEND);
    return;
  }

  boardTasks
    .forEach((boardTask) => renderEvent(taskListComponent.getElement(), boardTask));
};

renderBoard(boardComponent, events);


export { events };
