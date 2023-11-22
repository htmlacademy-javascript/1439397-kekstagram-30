import { thumbnailsContainerNode } from './thumbnails.js';
import { isEscapeKey } from './utils.js';

const DEFAULT_COMMENTS_COUNT = 5;

const pictureModalNode = document.querySelector('.big-picture');
const bigPictureNode = pictureModalNode.querySelector('.big-picture__img img');
const likesCountNode = pictureModalNode.querySelector('.likes-count');
const commentShownNode = pictureModalNode.querySelector('.social__comment-shown-count');
const commentTotalNode = pictureModalNode.querySelector('.social__comment-total-count');
const commentsContainerNode = pictureModalNode.querySelector('.social__comments');
const commentNode = commentsContainerNode.querySelector('.social__comment');
const captionNode = pictureModalNode.querySelector('.social__caption');
const closeBigPictureButton = pictureModalNode.querySelector('.big-picture__cancel');
const commentsLoaderButton = pictureModalNode.querySelector('.comments-loader');

const createComment = ({ avatar, name, message }) => {
  const comment = commentNode.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const showComments = () => {
  const comments = Array.from(commentsContainerNode.children);
  comments.filter((comment) => comment.classList.contains('hidden')).slice(0, 5).forEach((comment) => comment.classList.remove('hidden'));
  commentShownNode.textContent = Array.from(commentsContainerNode.children).filter((comment) => !comment.classList.contains('hidden')).length;
  if (commentShownNode.textContent === commentTotalNode.textContent) {
    commentsLoaderButton.classList.add('hidden');
  }
};

const renderComments = (comments) => {
  commentsContainerNode.innerHTML = '';
  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const comment = createComment(comments[i]);
    commentFragment.append(comment);
    comment.classList.add('hidden');
  }
  commentsContainerNode.append(commentFragment);
  showComments();
};

commentsLoaderButton.addEventListener('click', showComments);

const renderBigPicture = ({ url, likes, description, comments }) => {
  bigPictureNode.src = url;
  likesCountNode.textContent = likes;
  commentShownNode.textContent = DEFAULT_COMMENTS_COUNT;
  commentTotalNode.textContent = comments.length;
  captionNode.textContent = description;
};

const openPictureModalElement = () => {
  pictureModalNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', pressKey);
  commentsLoaderButton.classList.remove('hidden');
};

const setContainerClickHandler = (pictures) => {
  thumbnailsContainerNode.addEventListener('click', (evt) => {
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
    const thumbnailComments = thumbnailData.comments;

    renderBigPicture(thumbnailData);
    renderComments(thumbnailComments);
  });
};

const closeBigPicture = () => {
  pictureModalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function pressKey(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

closeBigPictureButton.addEventListener('click', closeBigPicture);

export { setContainerClickHandler };


