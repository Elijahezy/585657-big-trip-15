import { getRandomArrayElement, getRandomInteger, getRandomIntegerEqualTen } from './utils';
import { POINTS, OFFER_LIST } from '../consts';
import dayjs from 'dayjs';

const MAX_PHOTOS = 3;
const MAX_HOURS_GAP = 5;
const MAX_DAYS_GAP = 7;

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
  const hoursGap = getRandomInteger(-2, MAX_HOURS_GAP);
  const mitesGap = getRandomInteger(-60, 60);
  return dayjs().add(hoursGap, 'hour').add(mitesGap, 'minute').toDate();
};

const generateDays = () => {
  const daysGap = getRandomInteger(-7, MAX_DAYS_GAP);
  return dayjs().add(daysGap, 'day').toDate();
};

const getRandomPhoto = () => {
  const photosCurrent = [];
  const randomInteger = getRandomInteger(1, MAX_PHOTOS);
  for (let i = 0; i < randomInteger; i++) {
    const randomNumber = getRandomInteger(1, 10);
    photosCurrent.push(`http://picsum.photos/248/152?r=${randomNumber}`);
  }
  return photosCurrent[getRandomInteger(0,2)];
};

const getOffer = (offerName) => {
  const values = Object.values(OFFER_LIST);
  const result = values.find((item) => item.type === offerName);
  return result;
};

const destination = (
  {
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Berlin',
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
  const start = generateHours();
  let end = generateHours();
  while (start > end) {
    end = generateHours();
  }

  return {
    type,
    destination,
    offer: getOffer(type),
    price: getRandomIntegerEqualTen(20, 400, 10),
    start,
    end,
    day: generateDays(),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};

export { generateRoutePoints };

