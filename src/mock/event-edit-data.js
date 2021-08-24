import { POINTS } from '../consts';

const isChecked = (type, currentType) => type === currentType ? 'checked' : '';

const createEventType = (type, currentType) => (
  `<div class="event__type-item">
  <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${isChecked(type.toLowerCase(), currentType.toLowerCase())}>
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`
);

const createEventTypeList = (currentType) => POINTS.map((point) => createEventType(point, currentType));

const createEventOffer = (offerTitle, offerPrice, offerName) => (
  `<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-1" type="checkbox" name="event-offer-${offerName}" checked>
<label class="event__offer-label" for="event-offer-${offerName}-1">
  <span class="event__offer-title">${offerTitle}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offerPrice}</span>
</label>
</div>`
);

const createOfferList = (offerType) => offerType.offers.map((offer) => createEventOffer(offer.title, offer.price));

export { createEventTypeList, createOfferList };
