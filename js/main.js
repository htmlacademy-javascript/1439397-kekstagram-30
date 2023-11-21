import { getData } from './fetch.js';
import { renderThumbnails } from './thumbnails.js';
import { showError, ERROR_ELEMENTS } from './utils.js';
import { setUserFormSubmit } from './pristine.js';
import './upload-form.js';
import { closeEditPictureForm } from './upload-form.js';
import { initFilters } from './filters.js';
import './upload-photo.js';

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
    initFilters(pictures);
  })
  .catch(() => showError(ERROR_ELEMENTS.LOAD_DATA_ERROR_ELEMENT));

setUserFormSubmit(closeEditPictureForm);

