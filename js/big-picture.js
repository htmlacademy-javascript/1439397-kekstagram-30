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
const commentsLoaderButton = bigPictureModalElement.querySelector('.comments-loader');

const createComment = ({ avatar, name, message }) => {
  const comment = socialComment.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};



const renderComment = (commentsArray) => {
  console.log(commentsArray)
  let startIndexComment = 0;
  let endIndexComment = 5;

  const commentFragment = document.createDocumentFragment();
  const commentsArrayFix = commentsArray.slice(startIndexComment, endIndexComment);

  commentsArrayFix.forEach((commentItem) => {
    const comment = createComment(commentItem);
    commentFragment.append(comment);
  });

  socialComments.append(commentFragment);

  commentsArray.slice(endIndexComment);

  return renderComment;
  console.log(commentsArray)

};

const w = renderComment;
commentsLoaderButton.addEventListener('click', () => {
  w()
})






const openBigPicture = (evt) => {
  bigPictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  const thumbnailId = evt.target.closest('[data-thumbnail-id]').dataset.thumbnailId;
  const thumbnailDataObject = pictures[thumbnailId - 1];
  const thumbnailCommentsArray = thumbnailDataObject.comments;

  bigPictureElement.src = thumbnailDataObject.url;
  likesCountElement.textContent = thumbnailDataObject.likes;
  commentShownElement.textContent = 5;
  commentTotalElement.textContent = thumbnailCommentsArray.length;
  socialCaption.textContent = thumbnailDataObject.description;

  socialComments.innerHTML = '';
  // console.log(thumbnailCommentsArray)
  renderComment(thumbnailCommentsArray);
  // firstFiveComments(thumbnailCommentsArray)
};

const closeBigPicture = () => {
  bigPictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

container.addEventListener('click', (evt) => {
  if (evt.target.className === 'picture__img') {
    openBigPicture(evt);
  }
});

cancelButton.addEventListener('click', () => {
  closeBigPicture();
});
