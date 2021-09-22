import AbstractObserver from '../utils/abstract-observer.js';

export default class Events extends AbstractObserver {
  constructor() {
    super();
    this._events = [];
    this._destinations = [];
    this._offers = [];
  }

  setEvents(updateType, events) {
    this._events = events.slice();

    this._notify(updateType);
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getEvents() {
    return this._events;
  }

  getDestinations() {
    return this._destinations;
  }

  getOffers() {
    return this._offers;
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === event.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  adaptToClient(event) {
    const adaptedTask = Object.assign(
      {},
      event,
      {
        start: event['date_from'],
        end: event['date_to'],
        isFavorite: event['is_favorite'],
        price: event['base_price'],
      },
    );

    delete adaptedTask['base_price'];
    delete adaptedTask['date_from'];
    delete adaptedTask['is_favorite'];
    delete adaptedTask['date_to'];

    return adaptedTask;
  }

  adaptToServer(event) {
    const adaptedTask = Object.assign(
      {},
      event,
      {
        'date_from': event.start,
        'date_to': event.end,
        'is_favorite': event.isFavorite,
        'base_price': event.price,
      },
    );

    delete adaptedTask.start;
    delete adaptedTask.end;
    delete adaptedTask.isFavorite;
    delete adaptedTask.price;

    return adaptedTask;
  }
}
