import { uploadPicturePreview } from './upload-form.js';

const fileChooser = document.querySelector('.img-upload__input');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    uploadPicturePreview.src = URL.createObjectURL(file);
  }
});
