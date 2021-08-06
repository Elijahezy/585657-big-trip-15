import { POINTS } from '../consts';
import { getRandomInteger } from './utils';

const generateEventType = (eventType) => (
  `<div class="event__type-item">
  <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}">
  <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
  </div>`
);

const generateEventTypeList = () => {
  const eventList = [];
  for (let i = 0; i < POINTS.length; i++) {
    eventList.push(generateEventType(POINTS[i]));
  }
  return eventList;
};

const generateEventOffer = (offerTitle, offerPrice, offerName) => (
  `<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-1" type="checkbox" name="event-offer-${offerName}" ${Boolean(getRandomInteger(0,1)) === true ? 'checked' : null}>
<label class="event__offer-label" for="event-offer-${offerName}-1">
  <span class="event__offer-title">${offerTitle}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offerPrice}</span>
</label>
</div>`
);

const generateOfferList = (node) => {
  const offerList = [];
  for (let i = 0; i < node.offers.length; i++) {
    offerList.push(generateEventOffer(node.offers[i].title, node.offers[i].price, node.offers[i].name));
  }
  return offerList;
};

export { generateEventTypeList, generateOfferList };
