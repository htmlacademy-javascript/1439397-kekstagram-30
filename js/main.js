const message = `Всё отлично!
  В целом всё неплохо. Но не всё.
  Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
  Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
  Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
  Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`;

const PHOTO_DESCRIPTION_LIST = [
  'Котенок забавно спит на спине.',
  'Пушистый кот с цветком в зубах.',
  'Полосатый охотник выглядывает из травы.',
  'Кот на вершине мира - на холодильнике.',
  'Зевок во всю ширину кошачьей души.',
  'Бесконечный день в глазах сонного кота.',
  'Кот-йог в замысловатой позе.',
  'Мохнатый тигренок притаился в кустах.',
  'Кот и его собственное отражение.',
  'Кот-тучка на окне: спит, укутавшись в занавеску.',
  'Рыжий хитрюга с мышкой в лапах.',
  'Кот-путешественник: на крыше машины.',
  'Нежность и ласка в объятиях кота.',
  'Кот-звезда: после фотосессии.',
  'Кот, который всегда падает на лапы.'
];

const NAMES = ['София', 'Полина', 'Михаил', 'Арина', 'Марсель', 'Алиса', 'Ева', 'Лидия', 'Фёдор', 'Константин', 'Марк', 'Анна', 'Ярослав', 'Артём', 'Маргарита', 'Даниил', 'Таисия', 'Антон', 'Мадина', 'Кристина', 'Лев', 'Мирослав', 'Эмилия', 'Елизавета', 'Софья'];

//Приведение строки с сообщениями к массиву
const draftMessageArray = message.replaceAll('\n', '').replaceAll('  ', ' ').split('!').join('.').split('. ');
const middleMessageArrayElements = draftMessageArray.slice(1, draftMessageArray.length - 1).map((item) => `${item}.`);
const firstMessageArrayElement = `${draftMessageArray[0]}!`;
const lastMessageArrayElement = `${draftMessageArray[draftMessageArray.length - 1].replace('.', '!')}`;
const messageArray = [firstMessageArrayElement, ...middleMessageArrayElements, lastMessageArrayElement];

const photoDescriptionId = makeIdCounter();
const urlPhotoId = makeIdCounter();

const photoDescriptionCollection = Array.from({ length: 25 }, createPhotoDescription);

function makeIdCounter() {
  let count = 1;

  return function () {
    return count++;
  };
}

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

function createPhotoDescription() {
  return {
    id: photoDescriptionId(),
    url: `photos/${urlPhotoId()}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTION_LIST),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
  };
}

function createComment() {
  return {
    id: getRandomInteger(1, Number.MAX_SAFE_INTEGER),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: creatMessage(),
    name: getRandomArrayElement(NAMES)
  };
}

function creatMessage() {
  return Math.random() > 0.5 ? messageArray[getRandomInteger(0, messageArray.length - 1)] : `${messageArray[getRandomInteger(0, messageArray.length - 1)]} ${messageArray[getRandomInteger(0, messageArray.length - 1)]}`;
}


photoDescriptionCollection();
