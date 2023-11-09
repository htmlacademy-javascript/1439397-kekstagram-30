import { pictures, container } from './thumbnails.js';
import { isEscapeKey } from './utils.js';

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

const createComment = ({ avatar, name, message }) => {
  const comment = socialComment.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComment = (commentsArray) => {
  const commentFragment = document.createDocumentFragment();

  commentsArray.forEach((commentItem) => {
    const comment = createComment(commentItem);
    commentFragment.append(comment);
  });

  socialComments.append(commentFragment);
};

const renderBigPictureData = (evt) => {
  const thumbnailIndex = parseInt((evt.target.src.split('').splice(29, 2).join('')), 10);
  const thumbnailObject = pictures[thumbnailIndex - 1];
  const thumbnailCommentsArray = pictures[thumbnailIndex - 1].comments;

  bigPictureElement.src = thumbnailObject.url;
  likesCountElement.textContent = thumbnailObject.likes;
  commentShownElement.textContent = 5;
  commentTotalElement.textContent = thumbnailCommentsArray.length;
  socialCaption.textContent = thumbnailObject.description;

  socialComments.innerHTML = '';
  renderComment(thumbnailCommentsArray);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  container.addEventListener('keydown', onDocumentKeydown);
};


const closeBigPicture = () => {
  bigPictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  container.removeEventListener('keydown', onDocumentKeydown);
};


container.addEventListener('click', (evt) => {
  if (evt.target.className === 'picture__img') {
    openBigPicture();
    renderBigPictureData(evt);
  }
});

cancelButton.addEventListener('click', () => {
  closeBigPicture();
});
