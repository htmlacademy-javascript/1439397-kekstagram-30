import { MESSAGES, PHOTO_DESCRIPTION_LIST, NAMES } from './data.js';
import { getRandomInteger, getRandomArrayElement, createRandomNumberFromRange, makeIdCounter } from './utils.js';

const photoID = makeIdCounter();

const createMessage = () => {
  const messageCount = getRandomInteger(1, 2);
  const uniqueMessageArrayIndex = createRandomNumberFromRange(0, 7);
  const result = Array.from({ length: messageCount }, () => MESSAGES[uniqueMessageArrayIndex()]).join(' ');
  return result;
};

const createComment = () => ({
  id: getRandomInteger(1, Number.MAX_SAFE_INTEGER),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => {
  const id = photoID();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTION_LIST),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
  };
};

const photoDescriptionCollection = () => Array.from({ length: 25 }, createPhotoDescription);

export { photoDescriptionCollection };
