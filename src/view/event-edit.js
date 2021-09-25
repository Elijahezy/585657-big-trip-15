import { humanizeEventHoursDate } from '../utils/event.js';
import { POINTS } from '../consts.js';
// import { createEventTypeList } from '../mock/event-edit-data.js';
import SmartView from './smart.js';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

const BLANK_EVENT = {
  type: 'taxi',
  destination: '',
  offers: [{title: 'Upgrade to a business class', price: 190},
    {title: 'Choose the radio station', price: 30},
    {title: 'Choose temperature', price: 170},
    {title: 'Drive quickly, I\'m in a hurry', price: 100},
    {title: 'Drive slowly', price: 110}],
  price: 600,
  start: dayjs().toDate(),
  end: dayjs().toDate(),
  isFavorite: false,
};

const isChecked = (type, currentType) => type === currentType ? 'checked' : '';

const isCheckedOffers = (offer, checkedOffers) => checkedOffers.find((checkedOffer) => checkedOffer.title === offer.title) ? 'checked' : '';

const createDestinationPhotos = (destination) => destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`);

const createDestinationPhotosContainer = (destination) =>
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${createDestinationPhotos(destination)}
    </div>
  </div>`;


const createSingleDestinationOption = (typesOfDestinations) => typesOfDestinations.map((destination) => `<option value="${destination.name}"></option>`).join(' ');

const createDestinationOptions = (typesOfDestinations) =>
  `<datalist id="destination-list-1">
    ${createSingleDestinationOption(typesOfDestinations)}
  </datalist>`;

const createEventOffer = (offer, checkedOffers) => (
  `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.toLowerCase()}-1" type="checkbox" name="event-offer-${offer.title.toLowerCase()}" data-offer-title="${offer.title}" ${isCheckedOffers(offer, checkedOffers)}>
  <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase()}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
  </div>`
);

const createOfferList = (type, allAvailableOffersOfType, checkedOffers) => {
  const requiredOffer = allAvailableOffersOfType.find((offer) => type === offer.type);
  return requiredOffer.offers.map((offer) => createEventOffer(offer, checkedOffers));
};

const createEventType = (type, currentType) => (
  `<div class="event__type-item">
  <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${isChecked(type.toLowerCase(), currentType.toLowerCase())} data-event-type="${type}">
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`
);

const createEventTypeList = (currentType) => POINTS.map((point) => createEventType(point, currentType));

const createEditModuleTemplate = (data, availableDestinations, availableOffers) => {
  const {type, start, end, price, offers, destination, isDisabled, isSaving, isDeleting } = data;

  const startHour = humanizeEventHoursDate(start);

  const endHour = humanizeEventHoursDate(end);


  return `<form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group" ${isDisabled ? 'disabled' : ''}>
        <legend class="visually-hidden">Event type</legend>
        ${createEventTypeList(type).join('')}
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" onkeyup="this.value = this.value.replace(/[^]/g,'');" value="${destination ? destination.name : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
    ${createDestinationOptions(availableDestinations)}
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startHour}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endHour}">
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" onkeyup="this.value = this.value.replace(/[^0-9]/g,'');" value="${price}">
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
  <button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>
<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${createOfferList(type, availableOffers, offers).join(' ')}
    </div>
  </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination ? destination.description : ''}</p>
    ${destination ? createDestinationPhotosContainer(destination) : ''}
  </section>

</section>
</form>`;
};


export default class EventEdit extends SmartView {
  constructor(destinations, offers, event = BLANK_EVENT) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._startDayPicker = null;
    this._endDayPicker = null;
    this._destinations = destinations;
    this._offers = offers;

    this._addNewEventButton = document.querySelector('.trip-main__event-add-btn');

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeEventType = this._changeEventType.bind(this);
    this._changeDestinationType = this._changeDestinationType.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  reset(event) {
    this.updateData(EventEdit.parseEventToData(event));
  }

  getTemplate() {
    return createEditModuleTemplate(this._data, this._destinations, this._offers);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setCloseButtonClickHandler(this._callback.closeEditForm);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.event__save-btn').addEventListener('click', this._formSubmitHandler);
  }

  removeElement() {
    super.removeElement();

    if (this._startDayPicker) {
      this._startDayPicker.destroy();
      this._startDayPicker = null;
    }

    if (this._endDayPicker) {
      this._endDayPicker.destroy();
      this._endDayPicker = null;
    }
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeEditForm = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  _formCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeEditForm();
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._addNewEventButton.disabled = false;
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._data));
  }

  _setDatepicker() {
    if (this._startDayPicker) {
      this._startDayPicker.destroy();
      this._startDayPicker = null;
    }

    if (this._endDayPicker) {
      this._endDayPicker.destroy();
      this._endDayPicker = null;
    }

    this._startDayPicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'j m Y H i',
        defaultDate: this._data.start,
        onChange: this._startDateChangeHandler,
      },
    );
    this._endDayPicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'j m Y H i',
        defaultDate: this._data.end,
        onChange: this._endDateChangeHandler,
      },
    );

  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._changeDestinationType);
    this.getElement().querySelectorAll('.event__type-input').forEach((item) => item.addEventListener('change', this._changeEventType));
    this.getElement().querySelector('.event__available-offers').addEventListener('change', this._offerChangeHandler);
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    let newOffers = this._data.offers;
    this._offers.find((offer) => offer.offers.find((item) => {
      if(item.title === evt.target.dataset.offerTitle) {
        if (evt.target.checked) {
          return newOffers.push(item);
        }
        return newOffers = newOffers.filter((itemsToKeep) => itemsToKeep.title !== item.title);
      }
    }));
    this.updateData({
      offers: newOffers,
    });

  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      start: userDate,
    });
  }

  _endDateChangeHandler([userDate]) {
    if(userDate < this._data.start) {
      userDate = this._data.start;
    }
    this.updateData({
      end: userDate,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._addNewEventButton.disabled = false;
    this.updateData({
      price: +this.getElement().querySelector('.event__input--price').value,
    });
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  _getNewDestination(requiredPoint) {
    const requiredDestination = this._destinations.find((point) => point.name === requiredPoint);
    return requiredDestination;
  }

  _getNewOffer(offerName) {
    const requiredOffer = this._offers.find((offer) => offer.type === offerName);
    return requiredOffer;
  }

  _changeDestinationType(evt) {
    evt.preventDefault();
    this.updateData({
      destination: this._getNewDestination(evt.target.value),
    });
  }

  _changeEventType(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.dataset.eventType.toLowerCase(),
      offers: [],
    });
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign(
      {},
      data,
      {
        isFavorite: false,
      },
    );

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}


