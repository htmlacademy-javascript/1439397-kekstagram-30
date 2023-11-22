const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;

const errorElement = {
  loadData: 'data-error',
  sendData: 'error',
  successfulSending: 'success',
};

const effects = [
  {
    name: 'effect-none',
    filterName: 'none',
  },
  {
    name: 'effect-chrome',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filterName: 'grayscale',
  },
  {
    name: 'effect-sepia',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filterName: 'sepia',
  },
  {
    name: 'effect-marvin',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    postfix: '%',
    filterName: 'invert',
  },
  {
    name: 'effect-phobos',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    postfix: 'px',
    filterName: 'blur',
  },
  {
    name: 'effect-heat',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filterName: 'brightness',
  },
];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showError = (element) => {
  const dataErrorTemplate = document.querySelector(`#${element}`).content.cloneNode(true);
  const dataErrorNode = dataErrorTemplate.querySelector(`.${element}`);
  document.body.append(dataErrorNode);

  if (element === errorElement.loadData) {
    setTimeout(() => {
      dataErrorNode.remove();
    }, ALERT_SHOW_TIME);
  } else {
    const errorButtonNode = dataErrorNode.querySelector('[class*="button"]');

    const onDocumentKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        dataErrorNode.remove();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    errorButtonNode.addEventListener('click', () => {
      dataErrorNode.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    });

    document.addEventListener('keydown', onDocumentKeydown);

    dataErrorNode.addEventListener('click', (evt) => {
      if (!(evt.target.className !== dataErrorNode.className)) {
        dataErrorNode.remove();
        document.removeEventListener('keydown', onDocumentKeydown);
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

export { isEscapeKey, showError, errorElement, debounce, effects, RERENDER_DELAY };
