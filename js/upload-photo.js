const effectPreviewNodes = document.querySelectorAll('.effects__preview');
const FileTypes = ['jpg', 'jpeg', 'png'];

const chooseFile = (inputFileNode, picturePreviewNode) => {
  const file = inputFileNode.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FileTypes.some((type) => fileName.endsWith(type));

  if (matches) {
    picturePreviewNode.src = URL.createObjectURL(file);
    effectPreviewNodes.forEach((effect) => {
      effect.style.backgroundImage = `url('${picturePreviewNode.src}')`;
    });
  }
};

export { chooseFile };
