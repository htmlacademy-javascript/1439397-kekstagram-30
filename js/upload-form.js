import { isEscapeKey } from "./utils.js";

const uploadPictureControl = document.querySelector('.img-upload__input');
const editPictureForm = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const closeEditPictureFormButton = document.querySelector('.img-upload__cancel');
const pictureScaleControl = document.querySelector('.scale__control--value');
const pictureScaleSmallerControl = document.querySelector('.scale__control--smaller');
const pictureScaleBiggerControl = document.querySelector('.scale__control--bigger');
const uploadPicturePreview = document.querySelector('.img-upload__preview');
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
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter() { uploadPicturePreview.style.filter = "none" },
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
    filter() { uploadPicturePreview.style.filter = "grayscale(1)" },
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
    filter() { uploadPicturePreview.style.filter = "sepia(1)" },
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
      pips: {
        format: {
          postfix: '%'
        }
      }
    },
    filter() { uploadPicturePreview.style.filter = "invert(100)" },
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
      pips: {
        format: {
          postfix: 'px'
        }
      }
    },
    filter() { uploadPicturePreview.style.filter = "blur(3)" },
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
    filter() { uploadPicturePreview.style.filter = "brightness(3)" },
  },
]

effectsList.addEventListener('change', (evt) => {
  const effect = EFFECTS.find(item => item.name === evt.target.id);
  effect.filter();
})

effectLevelValue.value = 100;

noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
})

sliderContainer.noUiSlider.on('update', () => {
  uploadPicturePreview.style.filter = `grayscale(1)`;
});





















uploadPictureControl.addEventListener('change', () => {
  editPictureForm.classList.remove('hidden');
  bodyElement.classList.add('moda-open');

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
};

closeEditPictureFormButton.addEventListener('click', closeEditPictureForm)


export { bodyElement }
