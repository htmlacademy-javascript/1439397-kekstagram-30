import { uploadPicturePreview } from './upload-form.js';

const fileChooser = document.querySelector('.img-upload__input');
const effectPreviews = document.querySelectorAll('.effects__preview');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    uploadPicturePreview.src = URL.createObjectURL(file);
    effectPreviews.forEach((effect) => {
      effect.style.backgroundImage = `url('${uploadPicturePreview.src}')`;
    });
  }
});
