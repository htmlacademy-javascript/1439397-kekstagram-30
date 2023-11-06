import { photoDescriptionCollection } from './photo-description.js';
import { renderThumbnails } from './thumbnails.js';

const photos = photoDescriptionCollection();
renderThumbnails(photos);
