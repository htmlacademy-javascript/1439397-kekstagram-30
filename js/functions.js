//Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false


//Функция для проверки, является ли строка палиндромом
function isPalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }

  return string === reverseString;
}

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


//Функция полученияя целого положительного числа из строки
function getPositiveNumber(string) {
  string = string.toString();
  let number = '';

  for (let i = 0; i < string.length; i++) {

    for (let j = 0; j <= 9; j++) {
      if (parseInt(string[i], 10) !== j) {
        continue;
      }
      number += string[i];
    }
  }
  return parseInt(number, 10);
}

getPositiveNumber('2023 год'); // 2023
getPositiveNumber('ECMAScript 2022'); // 2022
getPositiveNumber('1 кефир, 0.5 батона'); // 105
getPositiveNumber('а я томат'); // NaN
getPositiveNumber(2023); // 2023
getPositiveNumber(-1); // 1
getPositiveNumber(1.5); // 15
