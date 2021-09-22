import EventEditView from '../view/event-edit.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../consts.js';

export default class EventNew {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;

    this._eventEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._addNewEventButton = document.querySelector('.trip-main__event-add-btn');
  }

  init(destinations, offers) {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventEditView(destinations, offers);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventListContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
    this._addNewEventButton.disabled = true;
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(event) {
    this._changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event,
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      this._addNewEventButton.disabled = false;
    }
  }
}
