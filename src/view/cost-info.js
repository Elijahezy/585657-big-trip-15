import AbstractView from './abstract';

const calculateCostInfo = (events) => {
  if (events.length) {
    return events.map((event) => event.price)
      .reduce((a, b) => a + b);
  } return 'Add an event';
};

const createCostInfoTemplate = (events) => `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateCostInfo(events)}</span>
</p>`;

export default class CostInfo extends AbstractView {
  constructor(eventsModel) {
    super();
    this._events = eventsModel;
  }

  getTemplate() {
    return createCostInfoTemplate(this._events);
  }
}
