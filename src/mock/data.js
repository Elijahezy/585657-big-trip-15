import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { POINTS, OFFER_LIST } from '../consts';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const timeGaps = {
  day: {
    max: 7,
    min: -7,
  },
  hour: {
    max: 12,
    min: -12,
  },
  minute: {
    max: 30,
    min: -30,
  },
};

const price = {
  min: 20,
  max: 400,
};

const MAX_PHOTOS = 10;

const getRandomPhotos = () => {
  const getPhoto = () => `http://picsum.photos/248/152?r=${getRandomInteger(1, MAX_PHOTOS)}`;
  const photos = new Array(getRandomInteger(1, MAX_PHOTOS)).fill().map(getPhoto);
  const filteredPhotos = photos.filter((photo, index) => photos.indexOf(photo) === index);
  return filteredPhotos;
};

export const DESTINATIONS = {
  Berlin: {
    name: 'Berlin',
    description:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    photos: getRandomPhotos(),
  },
  NewYork: {
    name: 'New-York',
    description: 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    photos: getRandomPhotos(),
  },
  Moscow: {
    name: 'Moscow',
    description: 'Aliquam erat volutpat.',
    photos: getRandomPhotos(),
  },
};

const getRandomDestination = () => {
  const destinations = Object.values(DESTINATIONS);
  const finalDestination = getRandomArrayElement(destinations);
  return finalDestination;
};

const generateHours = () => {
  const hoursGap = getRandomInteger(timeGaps.hour.min, timeGaps.hour.max);
  const minutesGap = getRandomInteger(timeGaps.minute.min, timeGaps.minute.max);
  return dayjs().add(hoursGap, 'hour').add(minutesGap, 'minute').toDate();
};

const generateDays = () => {
  const daysGap = getRandomInteger(timeGaps.day.min, timeGaps.day.max);
  return dayjs().add(daysGap, 'day').toDate();
};

export const getOffer = (offerName) => {
  const offerTypes = Object.values(OFFER_LIST);
  const requiredOffer = offerTypes.find((offer) => offer.type === offerName);
  return requiredOffer;
};

const generateRoutePoints = () => {
  const type = getRandomArrayElement(POINTS);
  const [start, end] = [generateHours(), generateHours()].sort((a, b) => a - b);
  return {
    id: nanoid(),
    type,
    destination: getRandomDestination(),
    offer: getOffer(type),
    price: getRandomInteger(price.min, price.max),
    start,
    end,
    day: generateDays(),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};

export { generateRoutePoints };

