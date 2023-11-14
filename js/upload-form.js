import { isEscapeKey } from './utils.js';

const uploadPictureControl = document.querySelector('.img-upload__input');
const editPictureForm = document.querySelector('.img-upload__overlay');
const closeEditPictureFormButton = document.querySelector('.img-upload__cancel');
const pictureScaleControl = document.querySelector('.scale__control--value');
const pictureScaleSmallerControl = document.querySelector('.scale__control--smaller');
const pictureScaleBiggerControl = document.querySelector('.scale__control--bigger');
const uploadPicturePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');


//Изменение масштаба
const getCurrentPictureScaleValue = () => {
  const pictureScaleValue = parseInt(pictureScaleControl.getAttribute('value'), 10);
  return pictureScaleValue;
};

const applyPictureScaleValue = (value) => {
  uploadPicturePreview.style.transform = `scale(${value / 100})`;
};

const increaseScaleValue = () => {
  const newScalePictureValue = getCurrentPictureScaleValue() + 25;
  if (newScalePictureValue > 100) {
    return;
  }
  pictureScaleControl.setAttribute('value', `${newScalePictureValue}%`);
  applyPictureScaleValue(newScalePictureValue);
};
const decreaseScaleValue = () => {
  const newScalePictureValue = getCurrentPictureScaleValue() - 25;
  if (newScalePictureValue < 25) {
    return;
  }
  pictureScaleControl.setAttribute('value', `${newScalePictureValue}%`);
  applyPictureScaleValue(newScalePictureValue);
};

pictureScaleBiggerControl.addEventListener('click', increaseScaleValue);
pictureScaleSmallerControl.addEventListener('click', decreaseScaleValue);

// Фильтры
const EFFECTS = [
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

noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const createEffect = (obj) => {
  const filterName = obj.filterName;
  let postfix = obj?.postfix;
  if (postfix === undefined) {
    postfix = '';
  }

  sliderContainer.noUiSlider.on('update', () => {
    effectLevelValue.setAttribute('value', sliderContainer.noUiSlider.get());
    uploadPicturePreview.style.filter = `${filterName}(${sliderContainer.noUiSlider.get()}${postfix})`;
  });
};

effectsList.addEventListener('change', (evt) => {
  const effectItem = EFFECTS.find((item) => item.name === evt.target.id);
  if (effectItem.filterName !== 'none') {
    sliderContainer.classList.remove('hidden');
    sliderContainer.noUiSlider.updateOptions(effectItem.options);
    createEffect(effectItem);
  } else {
    uploadPicturePreview.style.filter = null;
    effectLevelValue.setAttribute('value', '');
    sliderContainer.classList.add('hidden');
  }
});

//Открытие модалки
uploadPictureControl.addEventListener('change', () => {
  editPictureForm.classList.remove('hidden');
  sliderContainer.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
});

const closeEditPictureForm = () => {
  editPictureForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadPictureControl.value = '';
  uploadPicturePreview.removeAttribute('style');
  pictureScaleControl.setAttribute('value', '100%');
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditPictureForm();
  }
}

closeEditPictureFormButton.addEventListener('click', closeEditPictureForm);

