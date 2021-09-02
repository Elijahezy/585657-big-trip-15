import { humanizeEventHoursDate } from '../utils/event.js';
import { createEventTypeList, createOfferList } from '../mock/event-edit-data.js';
import SmartView from './smart.js';
import { DESTINATIONS } from '../mock/data.js';
import { OFFER_LIST } from '../consts.js';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

const createDestinationPhotos = (destination) => destination.photos.map((item) => `<img class="event__photo" src="${item}" alt="Event photo"></img>`);

const createDestinationPhotosContainer = (destination) =>
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${createDestinationPhotos(destination)}
    </div>
  </div>`;


const createSingleDestinationOption = (typesOfDestinations) => {
  const options = Object.values(typesOfDestinations);
  return options.map((destination) => `<option value="${destination.name}"></option>`).join(' ');
};
const createDestinationOptions = (typesOfDestinations) =>
  `<datalist id="destination-list-1">
    ${createSingleDestinationOption(typesOfDestinations)}
  </datalist>`;

const createEditModuleTemplate = (data = {}) => {
  const {type, start, end, price, offer, destination } = data;

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
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${createEventTypeList(type).join('')}
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
    ${createDestinationOptions(DESTINATIONS)}
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
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>
<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${createOfferList(offer).join('')}
    </div>
  </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    ${createDestinationPhotosContainer(destination)}
  </section>

</section>
</form>`;
};


export default class EventEdit extends SmartView {
  constructor(event) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._startDayPicker = null;
    this._endDayPicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeEventType = this._changeEventType.bind(this);
    this._changeDestinationType = this._changeDestinationType.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);


    this._setInnerHandlers();
    this._setDatepicker();
  }

  reset(event) {
    this.updateData(EventEdit.parseEventToData(event));
  }

  getTemplate() {
    return createEditModuleTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.event__save-btn').addEventListener('submit', this._formSubmitHandler);
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
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  _getNewDestination(requiredPoint) {
    const destinationTypes = Object.values(DESTINATIONS);
    const requiredDestination = destinationTypes.find((point) => point.name === requiredPoint);
    return requiredDestination;
  }

  _getNewOffer(offerName) {
    const offerTypes = Object.values(OFFER_LIST);
    const requiredOffer = offerTypes.find((offer) => offer.type === offerName);
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
      offer: this._getNewOffer(evt.target.dataset.eventType),
    });
  }

  static parseEventToData(event) {
    return {...event};
  }

  static parseDataToEvent(data) {
    return {...data};
  }
}


