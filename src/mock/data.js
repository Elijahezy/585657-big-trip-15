import { getRandomArrayElement, getRandomInteger, getRandomIntegerEqualTen } from './utils';
import { POINTS, CITIES } from '../consts';
import dayjs from 'dayjs';

const MAX_DESCRIPTIONS = 5;
const MAX_PHOTOS = 3;
const MAX_HOURS_GAP = 22;
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
  const hoursGap = getRandomInteger(2, MAX_HOURS_GAP);
  return dayjs().add(hoursGap, 'hour').toDate();
};

const generateDays = () => {
  const daysGap = getRandomInteger(-7, MAX_DAYS_GAP);
  return dayjs().add(daysGap, 'day').toDate();
};

const generateRandomDescriptions = (elements) => {
  const descriptionsCurrent = [];
  const descriptionsLength = getRandomInteger(1, MAX_DESCRIPTIONS);
  for (let i = 0; i < descriptionsLength; i++) {
    const singleDescription = getRandomArrayElement(elements);
    descriptionsCurrent.push(singleDescription);
  }
  return descriptionsCurrent;
};

const getRandomPhotos = () => {
  const photosCurrent = [];
  const randomInteger = getRandomInteger(1, MAX_PHOTOS);
  for (let i = 0; i < randomInteger; i++) {
    const randomNumber = getRandomInteger(1, 10);
    photosCurrent.push(`http://picsum.photos/248/152?r=${randomNumber}`);
  }
  return photosCurrent;
};

const generateEventCity = () => (
  `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${getRandomArrayElement(CITIES)}" list="destination-list-1">
  <datalist id="destination-list-1">
    <option value="${CITIES[0]}"></option>
    <option value="${CITIES[1]}"></option>
    <option value="${CITIES[2]}"></option>
  </datalist>`
);

const flightOffers = {
  type: 'Flight',
  offers: [
    {
      title: 'Choose meal',
      price: '180',
      name: 'meal',
    },
    {
      title: 'Switch to comfort class',
      price: '100',
      name: 'comfort',
    },
    {
      title: 'Add luggage',
      price: '30',
      name: 'luggage',
    },
    {
      title: 'Choose seats',
      price: '25',
      name: 'seats',
    },
    {
      title: 'Take pet on board',
      price: '50',
      name: 'pet',
    },
  ],
};

const generateDestination = () => {
  const type = getRandomArrayElement(POINTS);
  const startTime = generateHours();
  let endTime = generateHours();
  while (startTime > endTime) {
    endTime = generateHours();
  }

  return {
    type,
    destination: generateEventCity(),
    description: generateRandomDescriptions(DESCRIPTIONS),
    pictures: getRandomPhotos(),
    offer: flightOffers,
    price: getRandomIntegerEqualTen(20, 400, 10),
    start: dayjs(startTime).format('HH:mm'),
    end: dayjs(endTime).format('HH:mm'),
    diffTime: dayjs(endTime).diff(startTime, 'hour'),
    day: dayjs(generateDays()).format('DD MMM'),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};

export { generateDestination };

