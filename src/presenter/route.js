import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import BoardView from '../view/board.js';
import NoEventsView from '../view/no-events.js';
import { render, RenderPosition } from '../utils/render.js';
import EventPresenter from './event.js';
import { updateItem } from '../utils/common.js';

export default class Route {
  constructor(routeContainer) {
    this._routeContainer = routeContainer;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventsView();
    this._eventListComponent = new EventListView();
    this._eventPresenter = new Map();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(routeEvents) {
    this._routeEvents = routeEvents.slice();

    render(this._routeContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._eventListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._routeEvents = updateItem(this._routeEvents, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents() {
    this._routeEvents
      .forEach((routeEvent) => this._renderEvent(routeEvent));
  }

  _clearEventList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
  }

  _renderNoEvents() {
    render(this._boardComponent, this._noEventComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventsList() {
    this._renderEvents();
  }

  _renderBoard() {
    if (this._routeEvents.every((task) => !task)) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();

    this._renderEventsList();
  }
}
