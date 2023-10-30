const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
]

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

const makeIdCounter = () => {
  let count = 1;

  return function () {
    return count++;
  };
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
}

const createRandomNumberFromRange = (min, max) => {
  const previousValues = [];

  if (previousValues.length >= (max - min + 1)) {
    console.error(`Перебраны все числа из диапазона от ${min} до ${max}`)
    return null;
  }

  return () => {
    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  }
}

const createComment = () => {
  return {
    id: getRandomInteger(1, Number.MAX_SAFE_INTEGER),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES)
  };
}

const createMessage = () => {
  const messageCount = getRandomInteger(1, 2);
  const uniqueMessageArrayIndex = createRandomNumberFromRange(0, 7)
  const result = Array.from({ length: messageCount }, () => MESSAGES[uniqueMessageArrayIndex()]).join(' ');
  return result;
}

const createPhotoDescription = () => {
  return {
    id: photoDescriptionId(),
    url: `photos/${urlPhotoId()}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTION_LIST),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
  };
}

const photoDescriptionId = makeIdCounter();
const urlPhotoId = makeIdCounter();

const photoDescriptionCollection = Array.from({ length: 25 }, createPhotoDescription);

console.log(photoDescriptionCollection);
