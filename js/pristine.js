import { isEscapeKey, showError, ERROR_ELEMENTS } from './utils.js';
import { sendData } from './fetch.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagAndCommentContainer = uploadFormElement.querySelector('.img-upload__text');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const publishButton = uploadFormElement.querySelector('.img-upload__submit');


hashtagAndCommentContainer.addEventListener('keydown', (evt) => {
  if ((evt.target === hashtagInputElement || evt.target === commentInputElement) && isEscapeKey) {
    evt.stopPropagation();
  }
});

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const setUserFormSubmit = (onSuccess) => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    commentInputElement.value = commentInputElement.value.trim();
    hashtagInputElement.value = hashtagInputElement.value.replace(/\s+/g, ' ').trim();
    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(evt.target);
      publishButton.disabled = true;
      sendData(formData)
        .then(() => {
          onSuccess();
          showError(ERROR_ELEMENTS.SUCCESSFUL_SENDING);
          evt.target.reset();
        })
        .catch(() => showError(ERROR_ELEMENTS.SEND_DATA_ERROR_ELEMENT))
        .finally(() => {
          publishButton.disabled = false;
        });
    }
  });
};

const VALIDATE_ERRORS_MESSAGES = {
  NOT_VALID_HASHTAG: 'Введён невалидный хэш-тег',
  REPEATED_HASHTAG: 'Хэш-теги повторяются',
  HASHTAG_AMOUNT_EXCEEDED: 'Превышено количество хэш-тегов',
  COMMENT_LENGTH_EXCEEDED: 'Длина комментария больше 140 символов',
};

const normalizeHashtagValue = (value) => {
  value = hashtagInputElement.value;
  value = value.toLowerCase().replace(/\s+/g, ' ').trim();
  const hashtagsArray = value.split(' ');
  return hashtagsArray;
};

const validateHashtagByValue = (value) => {
  if (value) {
    const hashtagsArray = normalizeHashtagValue(value);
    const hashtagExp = /^#[a-zа-яё0-9]{1,19}$/i;
    return hashtagsArray.every((hashtag) => hashtagExp.test(hashtag));
  }
  return true;
};

const validateHashtagByDuplicates = (value) => {
  if (value) {
    const hashtagsArray = normalizeHashtagValue(value);
    return new Set(hashtagsArray).size === hashtagsArray.length;
  }
  return true;
};

const validateHashtagByAmount = (value) => {
  if (value) {
    const hashtagsArray = normalizeHashtagValue(value);
    return !(hashtagsArray.length > 5);
  }
  return true;
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(hashtagInputElement, validateHashtagByValue, VALIDATE_ERRORS_MESSAGES.NOT_VALID_HASHTAG, 3, false);
pristine.addValidator(hashtagInputElement, validateHashtagByDuplicates, VALIDATE_ERRORS_MESSAGES.REPEATED_HASHTAG, 2, false);
pristine.addValidator(hashtagInputElement, validateHashtagByAmount, VALIDATE_ERRORS_MESSAGES.HASHTAG_AMOUNT_EXCEEDED, 1, false);
pristine.addValidator(commentInputElement, validateComment, VALIDATE_ERRORS_MESSAGES.COMMENT_LENGTH_EXCEEDED);

export { pristine, setUserFormSubmit, uploadFormElement };
