const POINTS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const CITIES = ['Berlin', 'New-York', 'Paris'];

const OFFER_LIST = {
  flight: {
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
    ]},
  taxi: {
    type: 'Taxi',
    offers: [
      {
        title: 'Kid\'s sit',
        price: '20',
        name: 'sit',
      },
      {
        title: 'With pet',
        price: '10',
        name: 'pet',
      },
      {
        title: 'Comfort',
        price: '30',
        name: 'comfort',
      },
    ],
  },
  bus: {
    type: 'Bus',
    offers: [
      {
        title: 'Front seat',
        price: '20',
        name: 'seat',
      },
      {
        title: 'Free food',
        price: '10',
        name: 'food',
      },
    ],
  },
  train: {
    type: 'Train',
    offers: [
      {
        title: 'Large seats',
        price: '20',
        name: 'seats',
      },
    ],
  },
  ship: {
    type: 'Ship',
    offers: [
      {
        title: 'Luxury food',
        price: '50',
        name: 'lfood',
      },
      {
        title: 'With pet',
        price: '10',
        name: 'pet',
      },
    ],
  },
  drive: {
    type: 'Drive',
    offers: [
      {
        title: 'Mercedes',
        price: '20',
        name: 'mercedes',
      },
      {
        title: 'Toll road',
        price: '50',
        name: 'road',
      },
    ],
  },
  checkin: {
    type: 'Check-in',
    offers: [
      {
        title: '2 bedroom',
        price: '20',
        name: 'bedroom',
      },
      {
        title: 'Breakfast',
        price: '50',
        name: 'breakfast',
      },
    ],
  },
  sightseeing: {
    type: 'Sightseeing',
    offers: [
      {
        title: 'Red Square',
        price: '20',
        name: 'square',
      },
      {
        title: 'Shop',
        price: '50',
        name: 'shop',
      },
    ],
  },
  restaurant: {
    type: 'Restaurant',
    offers: [
      {
        title: 'Kid\'s sit',
        price: '20',
        name: 'sit',
      },
      {
        title: 'Stake',
        price: '30',
        name: 'stake',
      },
    ],
  },
};


export { POINTS, CITIES, OFFER_LIST };
