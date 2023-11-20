import { createRandomNumberFromRange } from './utils.js';
import { renderThumbnails } from './thumbnails.js';

const defaultFilterButton = document.querySelector('#filter-default');
const randomtFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const filterForm = document.querySelector('.img-filters__form');
const RANDOM_ELEMENTS_COUNT = 10;

const getRandomThumbnailsArray = (pictures) => {
  const uniqueMessageArrayIndex = createRandomNumberFromRange(0, 24);
  const result = Array.from({ length: RANDOM_ELEMENTS_COUNT }, () => pictures[uniqueMessageArrayIndex()]);
  return result;
};

const getThumbnailCommentsLength = (thumbnail) => thumbnail.comments.length;

const compareCommentsAmount = (thumbnailA, thumbnailB) => {
  const thumbnailCommentsLengthA = getThumbnailCommentsLength(thumbnailA);
  const thumbnailCommentsLengthB = getThumbnailCommentsLength(thumbnailB);
  return thumbnailCommentsLengthB - thumbnailCommentsLengthA;
};

const initFilters = (pictures) => {
  const instanceOfPictures = pictures.slice();

  filterForm.addEventListener('click', (evt) => {
    const buttons = filterForm.querySelectorAll('.img-filters__button');
    buttons.forEach((button) => {
      if (button !== evt.target) {
        button.classList.remove('img-filters__button--active');
      } else {
        button.classList.add('img-filters__button--active');
      }
    });

    switch (evt.target) {
      case discussedFilterButton:
        instanceOfPictures.sort(compareCommentsAmount);
        renderThumbnails(instanceOfPictures);
        break;
      case randomtFilterButton:
        renderThumbnails(getRandomThumbnailsArray(instanceOfPictures));
        break;
      case defaultFilterButton:
        renderThumbnails(pictures);
        break;
    }
  });
};

export { initFilters };
