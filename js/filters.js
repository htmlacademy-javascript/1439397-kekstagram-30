import { renderThumbnails } from './thumbnails.js';
import { applyDebounce, RERENDER_DELAY } from './utils.js';

const RANDOM_ELEMENTS_COUNT = 10;

const filtersNode = document.querySelector('.img-filters__form');
const defaultFilterButton = filtersNode.querySelector('#filter-default');
const randomtFilterButton = filtersNode.querySelector('#filter-random');
const discussedFilterButton = filtersNode.querySelector('#filter-discussed');

const getRandomThumbnailsArray = (thumbnails) => thumbnails.sort(() => 0.5 - Math.random()).slice(0, RANDOM_ELEMENTS_COUNT);
const getThumbnailCommentsLength = (thumbnail) => thumbnail.comments.length;
const compareCommentsAmount = (thumbnailA, thumbnailB) => getThumbnailCommentsLength(thumbnailB) - getThumbnailCommentsLength(thumbnailA);

const createDebouncedThumbnails = applyDebounce(renderThumbnails, RERENDER_DELAY);

const setActiveButtonClass = (evt) => {
  const buttons = filtersNode.querySelectorAll('.img-filters__button');
  buttons.forEach((button) => {
    button.classList.toggle('img-filters__button--active', button === evt.target);
  });
};

const initializeFilters = (pictures) => {
  const instanceOfPictures = pictures.slice();

  filtersNode.addEventListener('click', (evt) => {
    switch (evt.target) {
      case discussedFilterButton:
        createDebouncedThumbnails(instanceOfPictures.sort(compareCommentsAmount));
        break;
      case randomtFilterButton:
        createDebouncedThumbnails(getRandomThumbnailsArray(instanceOfPictures));
        break;
      case defaultFilterButton:
        createDebouncedThumbnails(pictures);
        break;
    }
    setActiveButtonClass(evt);
  });
};

export { initializeFilters };
