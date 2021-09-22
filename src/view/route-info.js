import AbstractView from './abstract';

const getRouteDestinationList = (events) => {
  const routeNames = events.map((event) => event.destination.name);
  const filteredRouteNames = routeNames.filter((name, index) => routeNames.indexOf(name) === index);
  return filteredRouteNames;
};

const createRouteInfoTemplate = (events) =>
  `<div class="trip-info__main">
        <h1 class="trip-info__title">${getRouteDestinationList(events).join('&nbsp;&mdash;&nbsp;')}</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>`;

export default class RouteInfo extends AbstractView {
  constructor(eventsModel) {
    super();
    this._events = eventsModel;
  }

  getTemplate() {

    return createRouteInfoTemplate(this._events);
  }
}
