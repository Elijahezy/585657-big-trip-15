import SiteMenuView from '../view/menu.js';
import StatsView from '../view/stats.js';
import FilterPresenter from '../presenter/filter.js';
import RoutePresenter from '../presenter/route.js';
import EventsModel from '../model/events-model.js';
import FilterModel from '../model/filter-model.js';
import Api from '../api.js';

import { render, RenderPosition, remove } from '../utils/render.js';
import { UpdateType, FilterType, MenuItem } from '../consts.js';

const AUTHORIZATION = 'Basic 5555555-big-trip-15';
const SERVER = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(SERVER, AUTHORIZATION);

const containerRoute = document.querySelector('.trip-main');
const containerTripNav = document.querySelector('.trip-controls__navigation');
const containerCost = document.querySelector('.trip-main__trip-info');
const routeContainer = document.querySelector('.page-body__page-main > .page-body__container');
const addNewEventButton = document.querySelector('.trip-main__event-add-btn');

const siteMenuComponent = new SiteMenuView();

render(containerTripNav, siteMenuComponent, RenderPosition.BEFOREEND);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

Promise.all([
  api.getDestinations(),
  api.getOffers(),
  api.getEvents(),
])
  .then(([destinations, offers, points]) => {
    eventsModel.setDestinations(destinations);
    eventsModel.setOffers(offers);
    eventsModel.setEvents(UpdateType.INIT, points.map((point) => eventsModel.adaptToClient(point)));
  });

const routePresenter = new RoutePresenter(routeContainer, eventsModel, filterModel, containerRoute, containerCost, api);
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
      routePresenter.renderRouteInfo();
      routePresenter.renderCostInfo();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

addNewEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  remove(statisticsComponent);
  routePresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  routePresenter.init();
  routePresenter.createEvent(eventsModel);
});


