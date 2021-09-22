import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import BoardView from '../view/board.js';
import NoEventsView from '../view/no-events.js';
import RouteInfoView from '../view/route-info.js';
import CostInfoView from '../view/cost-info.js';
import LoadingView from '../view/loading.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { filter } from '../utils/filter.js';
import EventPresenter from './event.js';
import EventNewPresenter from './event-new.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/event.js';
import { FilterType, SortType, UpdateType, UserAction } from '../consts.js';

export default class Route {
  constructor(routeContainer, eventsModel, filterModel, containerRoute, containerCost, api) {
    this._routeContainer = routeContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._containerRoute = containerRoute;
    this._containerCost = containerCost;
    this._isLoading = true;
    this._api = api;
    this._sortComponent = null;

    this._boardComponent = new BoardView();
    this._noEventComponent = new NoEventsView();
    this._eventListComponent = new EventListView();
    this._loadingComponent = new LoadingView();
    this._eventPresenter = new Map();

    this._currentSortType = SortType.DAY;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._eventListComponent, this._handleViewAction);

    this._addNewEventButton = document.querySelector('.trip-main__event-add-btn');
  }

  init() {
    render(this._routeContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._eventListComponent, RenderPosition.BEFOREEND);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard();

    remove(this._eventListComponent);
    remove(this._boardComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(destinationsAndOffers) {
    this._destinations = destinationsAndOffers.getDestinations();
    this._offers = destinationsAndOffers.getOffers();
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init(this._destinations, this._offers);
  }

  renderCostInfo() {
    this._costInfo = new CostInfoView(this._getEvents());
    render(this._containerCost, this._costInfo, RenderPosition.BEFOREEND);
  }

  renderRouteInfo() {
    this._routeInfo = new RouteInfoView(this._getEvents());
    render(this._containerRoute, this._routeInfo, RenderPosition.AFTERBEGIN);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredTasks = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredTasks.sort(sortByDay);
      case SortType.TIME:
        return filtredTasks.sort(sortByTime);
      case SortType.PRICE:
        return filtredTasks.sort(sortByPrice);
    }

    return this._eventsModel.getEvents();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          });
        break;
      case UserAction.ADD_EVENT:
        this._api.addEvent(update)
          .then((response) => {
            this._eventsModel.addEvent(updateType, response);
          });
        break;
      case UserAction.DELETE_EVENT:
        this._api.deleteEvent(update)
          .then(() => {
            this._eventsModel.deleteEvent(updateType, update);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _renderLoading() {
    render(this._boardComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._eventsModel, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _clearBoard({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    remove(this._costInfo);
    remove(this._routeInfo);
    remove(this._sortComponent);
    remove(this._noEventComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderNoEvents() {
    render(this._boardComponent, this._noEventComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventsList() {
    const events = this._getEvents();

    this._renderEvents(events);
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!this._getEvents()) {
      this._renderNoEvents();
      return;
    }

    this.renderRouteInfo();
    this.renderCostInfo();
    this._renderSort();


    this._renderEventsList();
  }
}
