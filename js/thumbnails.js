import { photoDescriptionCollection } from './photo-description.js';


const pictures = photoDescriptionCollection();
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const container = document.querySelector('.pictures');

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
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

  container.append(thumbnailFragment);
};


renderThumbnails(pictures);

export { renderThumbnails, container, pictures };
