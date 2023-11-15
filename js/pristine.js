import { isEscapeKey } from './utils.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');

hashtagInputElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});

commentInputElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});

const pristine = new Pristine(uploadFormElement);

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  commentInputElement.value = commentInputElement.value.trim();
  hashtagInputElement.value = hashtagInputElement.value.replace(/\s+/g, ' ').trim();
  pristine.validate();
});

const hasDuplicates = (array) => (new Set(array)).size !== array.length;
const validateHashtag = (value) => {
  if (value) {
    const hashtagExp = /^#[a-zа-яё0-9]{1,19}$/i;
    const hashtagsArray = value.split(' ');

    if (hasDuplicates(hashtagsArray) || hashtagsArray.length > 5) {
      return false;
    }

    let isValidHashtag = true;
    for (const hashtag of hashtagsArray) {
      if (!hashtagExp.test(hashtag)) {
        isValidHashtag = false;
      }
    }
    return isValidHashtag;
  } else {
    return true;
  }
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(hashtagInputElement, validateHashtag);
pristine.addValidator(commentInputElement, validateComment);
