import { container } from './thumbnails.js';
import { isEscapeKey } from './utils.js';

const pictureModalElement = document.querySelector('.big-picture');
const bigPictureElement = pictureModalElement.querySelector('.big-picture__img img');
const likesCountElement = pictureModalElement.querySelector('.likes-count');
const commentShownElement = pictureModalElement.querySelector('.social__comment-shown-count');
const commentTotalElement = pictureModalElement.querySelector('.social__comment-total-count');
const commentsContainer = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');
const captionElement = document.querySelector('.social__caption');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const commentsLoaderButton = pictureModalElement.querySelector('.comments-loader');

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (commentsArray) => {
  commentsContainer.innerHTML = '';
  const COMMENTS_COUNT_SHOWN = 5;
  let startCommentIndex = 0;
  let endCommentIndex = COMMENTS_COUNT_SHOWN;

  const renderFixNumberComments = () => {
    commentsLoaderButton.classList.remove('hidden');

    const numberOfCommentsShown = commentsContainer.children.length;
    const isCommentsContainerEmpty = !numberOfCommentsShown;
    commentsLoaderButton.removeEventListener('click', renderFixNumberComments);

    if (!isCommentsContainerEmpty) {
      startCommentIndex += COMMENTS_COUNT_SHOWN;
      endCommentIndex += COMMENTS_COUNT_SHOWN;
    }
    commentShownElement.textContent += numberOfCommentsShown;

    const commentFragment = document.createDocumentFragment();
    const fixNumberCommentsArray = commentsArray.slice(startCommentIndex, endCommentIndex);
    fixNumberCommentsArray.forEach((commentItem) => {
      const comment = createComment(commentItem);
      commentFragment.append(comment);
    });
    commentsContainer.append(commentFragment);
    commentShownElement.textContent = commentsContainer.children.length;

    if (commentsContainer.children.length === commentsArray.length) {
      commentsLoaderButton.classList.add('hidden');
      return;
    }

    commentsLoaderButton.addEventListener('click', renderFixNumberComments);
  };
  renderFixNumberComments();
};

const renderBigPicture = ({ url, likes, description, comments }) => {
  bigPictureElement.src = url;
  likesCountElement.textContent = likes;
  commentShownElement.textContent = 5;
  commentTotalElement.textContent = comments.length;
  captionElement.textContent = description;
};

const openPictureModalElement = () => {
  pictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const setContainerClickHandler = (pictures) => {
  container.addEventListener('click', (evt) => {
    if (evt.target.className === 'picture__img') {
      openPictureModalElement(evt);
    }

    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();

    const thumbnailId = parseInt(thumbnail.dataset.thumbnailId, 10);
    const thumbnailData = pictures.find(({ id }) => id === thumbnailId);
    const thumbnailCommentsArray = thumbnailData.comments;

    renderBigPicture(thumbnailData);
    renderComments(thumbnailCommentsArray);
  });
};

const closeBigPicture = () => {
  pictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

closeBigPictureButton.addEventListener('click', closeBigPicture);

export { setContainerClickHandler };


