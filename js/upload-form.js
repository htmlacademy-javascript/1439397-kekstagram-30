import { isEscapeKey } from "./utils.js";

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
  let pictureScaleValue = parseInt(pictureScaleControl.getAttribute('value'), 10);
  return pictureScaleValue;
}

const increaseScaleValue = () => {
  const newScalePictureValue = getCurrentPictureScaleValue() + 25;
  if (newScalePictureValue > 100) return;
  pictureScaleControl.setAttribute('value', `${newScalePictureValue}%`);
  applyPictureScaleValue(newScalePictureValue);
}
const decreaseScaleValue = () => {
  const newScalePictureValue = getCurrentPictureScaleValue() - 25;
  if (newScalePictureValue < 25) return;
  pictureScaleControl.setAttribute('value', `${newScalePictureValue}%`);
  applyPictureScaleValue(newScalePictureValue);
}

const applyPictureScaleValue = (value) => {
  uploadPicturePreview.style.transform = `scale(${value / 100})`;
}

pictureScaleBiggerControl.addEventListener('click', increaseScaleValue);
pictureScaleSmallerControl.addEventListener('click', decreaseScaleValue);

// Фильтры
const EFFECTS = [
  {
    name: "effect-none",
    filterName: 'none',
  },
  {
    name: "effect-chrome",
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
    name: "effect-sepia",
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
    name: "effect-marvin",
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
    name: "effect-phobos",
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
    name: "effect-heat",
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
]

noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
})

const createFilter = (obj) => {
  const filterName = obj.filterName;
  let postfix = obj?.postfix;
  postfix === undefined ? postfix = '' : postfix;

  sliderContainer.noUiSlider.on('update', () => {
    effectLevelValue.setAttribute('value', sliderContainer.noUiSlider.get());
    uploadPicturePreview.style.filter = `${filterName}(${sliderContainer.noUiSlider.get()}${postfix})`;
  });
}

effectsList.addEventListener('change', (evt) => {
  const effect = EFFECTS.find(item => item.name === evt.target.id);
  if (effect.filterName !== 'none') {
    sliderContainer.classList.remove('hidden');
    sliderContainer.noUiSlider.updateOptions(effect.options);
    createFilter(effect);
  } else {
    uploadPicturePreview.style.filter = null;
    effectLevelValue.setAttribute('value', '');
    sliderContainer.classList.add('hidden');
  }
})

//Открытие модалки
uploadPictureControl.addEventListener('change', () => {
  editPictureForm.classList.remove('hidden');
  sliderContainer.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
})

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditPictureForm();
  }
}

const closeEditPictureForm = () => {
  editPictureForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadPictureControl.value = '';
  uploadPicturePreview.removeAttribute('style');
  pictureScaleControl.setAttribute('value', '100%');
};

closeEditPictureFormButton.addEventListener('click', closeEditPictureForm)

