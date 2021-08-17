import { createElement } from '../mock/utils';
const calculateCostInfo = (events) => {
  if (events.length !== 0) {
    return events.map((event) => event.price)
      .reduce((a, b) => a + b);
  } return 'Add an event';
};

const createCostInfoTemplate = (events) => (
  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateCostInfo(events)}</span>
</p>`
);

export default class CostInfo {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createCostInfoTemplate(this._event);
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

