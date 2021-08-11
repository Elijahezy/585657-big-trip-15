import { createElement } from '../mock/utils';

const getRouteDestinationList = (elements) => {
  const result = elements.map((item) => item.destination.name);
  const filteredResult = result.filter((item, index) => result.indexOf(item) === index);
  return filteredResult;
};


const createRouteInfoTemplate = (events) =>
  `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRouteDestinationList(events)}</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

    </section>`;

export default class RouteInfo {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createRouteInfoTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

