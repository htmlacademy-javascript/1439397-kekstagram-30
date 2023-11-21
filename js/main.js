import { setUserFormSubmit } from './pristine.js';
import { closeEditPictureForm } from './upload-form.js';
import './upload-photo.js';
import { getData } from './fetch.js';
import { renderThumbnails } from './thumbnails.js';
import { showError, ERROR_ELEMENTS } from './utils.js';
import { initFilters } from './filters.js';

setUserFormSubmit(closeEditPictureForm);

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
    initFilters(pictures);
  })
  .catch(() => showError(ERROR_ELEMENTS.LOAD_DATA_ERROR_ELEMENT));
