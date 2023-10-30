const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomNumberFromRange = (min, max) => {
  const previousValues = [];

  if (previousValues.length >= (max - min + 1)) {
    return null;
  }

  return () => {
    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const makeIdCounter = () => {
  let count = 1;

  return function () {
    return count++;
  };
};

export { getRandomInteger, getRandomArrayElement, createRandomNumberFromRange, makeIdCounter };
