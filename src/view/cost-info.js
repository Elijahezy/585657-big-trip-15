
import { createElement } from '../mock/utils';

const calculateCostInfo = (events) =>
  events.map((event) => event.price)
    .reduce((a, b) => a + b);



const createCostInfoTemplate = (elements) => (

  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateCostInfo(elements)}</span>
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

