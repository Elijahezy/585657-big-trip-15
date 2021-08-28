import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import BoardView from '../view/board.js';
import NoEventsView from '../view/no-events.js';
import { render, RenderPosition } from '../utils/render.js';
import EventPresenter from './event.js';
import { updateItem } from '../utils/common.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/event.js';
import { SortType } from '../consts.js';

export default class Route {
  constructor(routeContainer) {
    this._routeContainer = routeContainer;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventsView();
    this._eventListComponent = new EventListView();
    this._eventPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(routeEvents) {
    this._routeEvents = routeEvents.slice();

    this._sourcedRouteEvents = routeEvents.slice();

    render(this._routeContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._eventListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);
    this._clearEventList();
    this._renderEventsList();
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._routeEvents = updateItem(this._routeEvents, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
    this._sourcedRouteEvents = updateItem(this._sourcedRouteEvents, updatedEvent);
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._routeEvents.sort(sortByDay);
        break;
      case SortType.TIME:
        this._routeEvents.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._routeEvents.sort(sortByPrice);
        break;
      default:
        this._routeEvents = this._sourcedRouteEvents.slice();
    }

    this._currentSortType = sortType;
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
