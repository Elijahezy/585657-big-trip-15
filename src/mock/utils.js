const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => {
  const result = Math.floor(Math.random() * elements.length);
  return elements[result];
};

const getRandomIntegerEqualTen = (min,max,num) =>Math.floor(Math.floor(Math.random()*(max-min+1)+min) / num) * num;

export { getRandomInteger, getRandomArrayElement, getRandomIntegerEqualTen };
