import { renderThumbnails } from "./thumbnails.js";
import { showError } from "./utils.js";

let pictures = null;

fetch('https://30.javascript.pages.academy/kekstagram/dat')
  .then((response) => response.json())
  .then((thumbnails) => {
    renderThumbnails(thumbnails);
    pictures = thumbnails;
  }).catch(() => showError())

export { pictures }
