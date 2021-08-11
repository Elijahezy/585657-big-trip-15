import { createElement } from '../mock/utils';

const createSiteMenuTemplate = () =>
  (`<nav class="trip-controls__trip-tabs  trip-tabs">
<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
<a class="trip-tabs__btn" href="#">Stats</a>
</nav>`);

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate(events) {
    return createSiteMenuTemplate(events);
  }

  getElement(events) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(events));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
