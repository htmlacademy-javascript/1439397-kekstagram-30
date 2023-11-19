import { getData } from './fetch.js';
import { renderThumbnails } from './thumbnails.js';
import { showError, ERROR_ELEMENTS } from './utils.js';
import { setUserFormSubmit } from './pristine.js';
import './upload-form.js';
import { closeEditPictureForm } from './upload-form.js';

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
  })
  .catch(() => showError(ERROR_ELEMENTS.LOAD_DATA_ERROR_ELEMENT));

setUserFormSubmit(closeEditPictureForm);
