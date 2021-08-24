import RouteInfoView from '../view/route-info.js';
import FiltersView from '../view/filters.js';
import SiteMenuView from '../view/menu.js';
import CostInfoView from '../view/cost-info.js';
import { generateRoutePoints } from './data.js';
import RoutePresenter from '../presenter/route.js';
import dayjs from 'dayjs';

import { render, RenderPosition } from '../utils/render.js';

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

const routeContainer = document.querySelector('.page-body__page-main > .page-body__container');

const routePresenter = new RoutePresenter(routeContainer);

routePresenter.init(events);

export { events };
