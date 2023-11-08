import './thumbnails.js';
import { container } from './thumbnails.js';
import { photoDescriptionCollection } from './photo-description.js';
import { isEscapeKey } from './utils.js'

const bigPictureModalElement = document.querySelector('.big-picture');
const bigPictureElement = bigPictureModalElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureModalElement.querySelector('.likes-count');
const commentShownElement = bigPictureModalElement.querySelector('.social__comment-shown-count');
const commentTotalElement = bigPictureModalElement.querySelector('.social__comment-total-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCaption = document.querySelector('.social__caption');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentCount = bigPictureModalElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureModalElement.querySelector('.comments-loader');

const pictures = photoDescriptionCollection();

const renderBigPictureData = (evt) => {
  bigPictureElement.src = evt.target.src;
  likesCountElement.textContent = evt.target.nextElementSibling.lastElementChild.textContent;
  commentShownElement.textContent = 5;
  commentTotalElement.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
  socialCaption.textContent = evt.target.alt;

  const thumbnailIndex = parseInt((evt.target.src.split('').splice(29, 2).join('')), 10);
  const thumbnailCommentsArray = pictures[thumbnailIndex - 1].comments;
  socialComments.innerHTML = '';
  renderComment(thumbnailCommentsArray);
}

const createComment = ({ avatar, name, message }) => {
  const comment = socialComment.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
}

const renderComment = (commentsArray) => {
  const commentFragment = document.createDocumentFragment();

  commentsArray.forEach((commentItem) => {
    const comment = createComment(commentItem);
    commentFragment.append(comment);
  });

  socialComments.append(commentFragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  container.addEventListener('keydown', onDocumentKeydown)
}

const closeBigPicture = () => {
  bigPictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  container.removeEventListener('keydown', onDocumentKeydown)
}

container.addEventListener('click', (evt) => {
  if (evt.target.className === 'picture__img') {
    openBigPicture();
    renderBigPictureData(evt);
  }
});

cancelButton.addEventListener('click', () => {
  closeBigPicture();
});

export { pictures }


