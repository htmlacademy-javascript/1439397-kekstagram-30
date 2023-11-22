import { sendData } from './fetch.js';
import { isEscapeKey, showError, errorElement } from './utils.js';

const HASHTAG_EXPRESSION = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const errorMessage = {
  notValidHashtag: 'Введён невалидный хэш-тег',
  repeatedHashtag: 'Хэш-теги повторяются',
  hashtagAmountExceeded: 'Превышено количество хэш-тегов',
  commentLengthExceeded: 'Длина комментария больше 140 символов',
};

const uploadFormNode = document.querySelector('.img-upload__form');
const userInputContainerNode = uploadFormNode.querySelector('.img-upload__text');
const hashtagInputNode = uploadFormNode.querySelector('.text__hashtags');
const commentInputNode = uploadFormNode.querySelector('.text__description');
const publishButton = uploadFormNode.querySelector('.img-upload__submit');


userInputContainerNode.addEventListener('keydown', (evt) => {
  if ((evt.target === hashtagInputNode || evt.target === commentInputNode) && isEscapeKey) {
    evt.stopPropagation();
  }
});

const pristine = new Pristine(uploadFormNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const setUserFormSubmit = (onSuccess) => {
  uploadFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(evt.target);
      publishButton.disabled = true;
      sendData(formData)
        .then(() => {
          onSuccess();
          showError(errorElement.successfulSending);
          evt.target.reset();
        })
        .catch(() => showError(errorElement.sendData))
        .finally(() => {
          publishButton.disabled = false;
        });
    }
  });
};

const normalizeHashtagValue = (value) => {
  value = hashtagInputNode.value;
  value = value.toLowerCase().replace(/\s+/g, ' ').trim();
  const hashtags = value.split(' ');
  return hashtags;
};

const validateHashtagByValue = (value) => {
  if (value) {
    const hashtags = normalizeHashtagValue(value);
    return hashtags.every((hashtag) => HASHTAG_EXPRESSION.test(hashtag));
  }
  return true;
};

const validateHashtagByDuplicates = (value) => {
  if (value) {
    const hashtags = normalizeHashtagValue(value);
    return new Set(hashtags).size === hashtags.length;
  }
  return true;
};

const validateHashtagByAmount = (value) => {
  if (value) {
    const hashtags = normalizeHashtagValue(value);
    return !(hashtags.length > MAX_HASHTAGS_COUNT);
  }
  return true;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagInputNode, validateHashtagByValue, errorMessage.notValidHashtag, 3, false);
pristine.addValidator(hashtagInputNode, validateHashtagByDuplicates, errorMessage.repeatedHashtag, 2, false);
pristine.addValidator(hashtagInputNode, validateHashtagByAmount, errorMessage.hashtagAmountExceeded, 1, false);
pristine.addValidator(commentInputNode, validateComment, errorMessage.commentLengthExceeded);

export { pristine, setUserFormSubmit, uploadFormNode };
