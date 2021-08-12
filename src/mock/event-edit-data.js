import { POINTS } from '../consts';

const createEventType = (eventType) => (
  `<div class="event__type-item">
  <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}">
  <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
  </div>`
);

const createEventTypeList = () => POINTS.map((point) => createEventType(point));

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
