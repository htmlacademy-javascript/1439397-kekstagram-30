import { setUserFormSubmit } from './pristine.js';
import { closeEditPictureForm } from './upload-form.js';
import { getData } from './fetch.js';
import { renderThumbnails } from './thumbnails.js';
import { showError, errorElement } from './utils.js';
import { initFilters } from './filters.js';
import './upload-photo.js';

setUserFormSubmit(closeEditPictureForm);

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
    initFilters(pictures);
  })
  .catch(() => showError(errorElement.loadData));
