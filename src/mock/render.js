import RouteInfoView from '../view/route-info.js';
import SiteMenuView from '../view/menu.js';
import CostInfoView from '../view/cost-info.js';
import StatsView from '../view/stats.js';
import { generateRoutePoints } from './data.js';
import { MenuItem } from '../consts.js';
import FilterPresenter from '../presenter/filter.js';
import RoutePresenter from '../presenter/route.js';
import EventsModel from '../model/events-model.js';
import FilterModel from '../model/filter-model.js';
import dayjs from 'dayjs';

import { render, RenderPosition, remove } from '../utils/render.js';
import { UpdateType, FilterType } from '../consts.js';

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

const siteMenuComponent = new SiteMenuView();


render(routeAndCostContainer, new CostInfoView(events), RenderPosition.BEFOREEND);
render(containerTripNav, siteMenuComponent, RenderPosition.BEFOREEND);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const routeContainer = document.querySelector('.page-body__page-main > .page-body__container');

const routePresenter = new RoutePresenter(routeContainer, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(containerTripNav, filterModel, eventsModel);

filterPresenter.init();
routePresenter.init();

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      routePresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      routePresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      routePresenter.destroy();
      remove(statisticsComponent);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      statisticsComponent = new StatsView(eventsModel.getEvents());
      render(routeContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  remove(statisticsComponent);
  routePresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  routePresenter.init();
  routePresenter.createEvent();
  siteMenuComponent.getElement().querySelector('.trip-main__event-add-btn').disabled = true;
});

export { events };
