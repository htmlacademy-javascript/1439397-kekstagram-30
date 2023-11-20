import { setContainerClickHandler } from './big-picture.js';
// import { compareCommentsAmount } from './filters.js'
const filterElement = document.querySelector('.img-filters');

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const container = document.querySelector('.pictures');

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.dataset.thumbnailId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (picturesArray) => {
  const thumbnailFragment = document.createDocumentFragment();

  picturesArray.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnailFragment.append(thumbnail);
  });
  setContainerClickHandler(picturesArray);
  const thumbnailsArray = document.querySelectorAll('.picture');
  for (const thumbnail of thumbnailsArray) {
    thumbnail.remove();
  }
  container.append(thumbnailFragment);
  filterElement.classList.remove('img-filters--inactive');
};

export { renderThumbnails, container };
