import { setContainerClickHandler } from './big-picture.js';

const filterNode = document.querySelector('.img-filters');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const thumbnailsContainerNode = document.querySelector('.pictures');

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.dataset.thumbnailId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const thumbnailFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnailFragment.append(thumbnail);
  });
  setContainerClickHandler(pictures);
  const thumbnails = document.querySelectorAll('.picture');
  for (const thumbnail of thumbnails) {
    thumbnail.remove();
  }
  thumbnailsContainerNode.append(thumbnailFragment);
  filterNode.classList.remove('img-filters--inactive');
};

export { renderThumbnails, thumbnailsContainerNode };
