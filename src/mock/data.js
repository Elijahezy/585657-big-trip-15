import { getRandomArrayElement, getRandomInteger } from './utils';
import { POINTS, OFFER_LIST, CITIES } from '../consts';
import dayjs from 'dayjs';

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

const MAX_PHOTOS = 3;

const DESCRIPTIONS = [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.' ];

const generateHours = () => {
  const hoursGap = getRandomInteger(timeGaps.hour.min, timeGaps.hour.max);
  const minutesGap = getRandomInteger(timeGaps.minute.min, timeGaps.minute.max);
  return dayjs().add(hoursGap, 'hour').add(minutesGap, 'minute').toDate();
};

const generateDays = () => {
  const daysGap = getRandomInteger(timeGaps.day.min, timeGaps.day.max);
  return dayjs().add(daysGap, 'day').toDate();
};

const getRandomPhoto = () => {
  const getPhoto = () => `http://picsum.photos/248/152?r=${getRandomInteger(1, MAX_PHOTOS)}`;
  const photos = new Array(getRandomInteger(1, MAX_PHOTOS)).fill().map(getPhoto);
  const filteredPhotos = photos.filter((photo, index) => photos.indexOf(photo) === index);
  return filteredPhotos;
};

const getOffer = (offerName) => {
  const offerTypes = Object.values(OFFER_LIST);
  const requiredOffer = offerTypes.find((offer) => offer.type === offerName);
  return requiredOffer;
};

const destination = (
  {
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS),
      },
    ],
  }
);

const generateRoutePoints = () => {
  const type = getRandomArrayElement(POINTS);
  const [start, end] = [generateHours(), generateHours()].sort((a, b) => a - b);
  return {
    type,
    destination,
    offer: getOffer(type),
    price: getRandomInteger(price.min, price.max),
    start,
    end,
    day: generateDays(),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};

export { generateRoutePoints };

