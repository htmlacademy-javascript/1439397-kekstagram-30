const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const ERROR_ELEMENTS = {
  LOAD_DATA_ERROR_ELEMENT: 'data-error',
  SEND_DATA_ERROR_ELEMENT: 'error',
  SUCCESSFUL_SENDING: 'success',
};

const showError = (element) => {
  const dataErrorTemplate = document.querySelector(`#${element}`).content.cloneNode(true);
  const dataErrorElement = dataErrorTemplate.querySelector(`.${element}`);
  document.body.append(dataErrorElement);

  if (element === ERROR_ELEMENTS.LOAD_DATA_ERROR_ELEMENT) {
    setTimeout(() => {
      dataErrorElement.remove();
    }, ALERT_SHOW_TIME);
  } else {
    const button = dataErrorElement.querySelector('[class*="button"]');

    button.addEventListener('click', () => dataErrorElement.remove());

    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        dataErrorElement.remove();
      }
    });

    document.addEventListener('click', (evt) => {
      if (!(evt.target.className !== dataErrorElement.className)) {
        dataErrorElement.remove();
      }
    });
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, getRandomArrayElement, createRandomNumberFromRange, makeIdCounter, isEscapeKey, showError, ERROR_ELEMENTS, debounce, RERENDER_DELAY };
