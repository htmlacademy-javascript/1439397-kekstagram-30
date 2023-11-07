import './thumbnails.js';
import { container } from './thumbnails.js';
import { photoDescriptionCollection } from './photo-description.js';

const bigPictureModalElement = document.querySelector('.big-picture');
const bigPictureElement = bigPictureModalElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureModalElement.querySelector('.likes-count');
const commentShownElement = bigPictureModalElement.querySelector('.social__comment-shown-count');
const commentTotalElement = bigPictureModalElement.querySelector('.social__comment-total-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCaption = document.querySelector('.social__caption');

const cancelButton = document.querySelector('.big-picture__cancel');

const pictures = photoDescriptionCollection();
console.log(pictures)

const createComment = (pictures) => {
  const comment = socialComment.cloneNode(true);

  comment.querySelector('.social__picture').src = pictures.avatar;
  comment.querySelector('.social__picture').alt = pictures.name;
  comment.querySelector('.social__text').textContent = pictures.message;

  return comment;
}

const renderComment = (obj) => {
  const commentFragment = document.createDocumentFragment();

  obj.forEach((obj) => {
    const comment = createComment(obj);
    commentFragment.append(comment);
  });

  socialComments.append(commentFragment);
};

container.addEventListener('click', (evt) => {
  if (evt.target.className === 'picture__img') {
    bigPictureModalElement.classList.remove('hidden');
    bigPictureElement.src = evt.target.src;
    likesCountElement.textContent = evt.target.nextElementSibling.lastElementChild.textContent;
    commentShownElement.textContent = 5;
    commentTotalElement.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
    socialCaption.textContent = evt.target.alt;

    const index = evt.target.src.split('').slice(29).find(item => parseInt(item, 10));
    console.log(index);
    const obj = pictures[index - 1].comments;
    console.log(obj)
    socialComments.innerHTML = '';
    renderComment(obj);
  }

});

cancelButton.addEventListener('click', () => {
  bigPictureModalElement.classList.add('hidden');
})



export { pictures }


