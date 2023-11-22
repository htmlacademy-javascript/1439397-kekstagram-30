import { isEscapeKey, effects } from './utils.js';
import { pristine, uploadFormNode } from './pristine.js';
import { chooseFile } from './upload-photo.js';

const DEFAULT_SCALE_VALUE = 100;
const DEFAULT_SCALE_STEP = 25;

const sliderDefaultOptions = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
};

const pictureControlNode = document.querySelector('.img-upload__input');
const editPictureFormNode = document.querySelector('.img-upload__overlay');
const picturePreviewNode = editPictureFormNode.querySelector('.img-upload__preview img');
const sliderNode = editPictureFormNode.querySelector('.effect-level__slider');
const sliderContainerNode = editPictureFormNode.querySelector('.img-upload__effect-level');
const effectLevelValueNode = editPictureFormNode.querySelector('.effect-level__value');
const effectsListNode = editPictureFormNode.querySelector('.effects__list');
const scaleControlNode = editPictureFormNode.querySelector('.scale__control--value');
const scaleSmallerButton = editPictureFormNode.querySelector('.scale__control--smaller');
const scaleBiggerButton = editPictureFormNode.querySelector('.scale__control--bigger');
const closeEditPictureFormButton = editPictureFormNode.querySelector('.img-upload__cancel');

let scale = DEFAULT_SCALE_VALUE;

const applyPictureScaleValue = (value) => {
  picturePreviewNode.style.transform = `scale(${value / DEFAULT_SCALE_VALUE})`;
};

const increaseScaleValue = () => {
  if (!(scale === DEFAULT_SCALE_VALUE)) {
    scale += DEFAULT_SCALE_STEP;
  }
  scaleControlNode.setAttribute('value', `${scale}%`);
  applyPictureScaleValue(scale);
};
const decreaseScaleValue = () => {
  if (!(scale === DEFAULT_SCALE_STEP)) {
    scale -= DEFAULT_SCALE_STEP;
  }
  scaleControlNode.setAttribute('value', `${scale}%`);
  applyPictureScaleValue(scale);
};

scaleBiggerButton.addEventListener('click', increaseScaleValue);
scaleSmallerButton.addEventListener('click', decreaseScaleValue);

noUiSlider.create(sliderNode, sliderDefaultOptions);

const createEffect = (effect) => {
  const filterName = effect.filterName;
  let postfix = effect?.postfix;
  if (!postfix) {
    postfix = '';
  }

  sliderNode.noUiSlider.on('update', () => {
    let sliderValue = sliderNode.noUiSlider.get();

    if (filterName === 'effect-marvin') {
      sliderValue = parseInt(sliderValue, 10).toFixed();
    } else {
      sliderValue = parseFloat(sliderValue).toFixed(1);
    }

    if (sliderValue.endsWith('.0')) {
      sliderValue = Math.trunc(sliderValue);
    }
    effectLevelValueNode.setAttribute('value', sliderValue);
    picturePreviewNode.style.filter = `${filterName}(${sliderNode.noUiSlider.get()}${postfix})`;
  });
};

effectsListNode.addEventListener('change', (evt) => {
  const effectItem = effects.find((item) => item.name === evt.target.id);
  if (effectItem.filterName !== 'none') {
    sliderContainerNode.classList.remove('hidden');
    sliderNode.noUiSlider.updateOptions(effectItem.options);
    createEffect(effectItem);
  } else {
    picturePreviewNode.style.filter = null;
    effectLevelValueNode.setAttribute('value', '');
    sliderContainerNode.classList.add('hidden');
  }
});

const openEditPictureForm = () => {
  pictureControlNode.addEventListener('change', () => {
    editPictureFormNode.classList.remove('hidden');
    sliderContainerNode.classList.add('hidden');
    document.body.classList.add('modal-open');
    chooseFile(pictureControlNode, picturePreviewNode);

    document.addEventListener('keydown', pressKey);
    scale = DEFAULT_SCALE_VALUE;
  });
};

const closeEditPictureForm = () => {
  editPictureFormNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pictureControlNode.value = '';
  picturePreviewNode.removeAttribute('style');
  scaleControlNode.setAttribute('value', '100%');
  pristine.reset();
  uploadFormNode.reset();
};

function pressKey(evt) {
  if (isEscapeKey(evt) && !document.querySelector('.error')) {
    evt.preventDefault();
    closeEditPictureForm();
  }
}

openEditPictureForm();

closeEditPictureFormButton.addEventListener('click', closeEditPictureForm);

export { closeEditPictureForm };
