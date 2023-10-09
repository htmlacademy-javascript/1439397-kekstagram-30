//Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

//Функция для проверки, является ли строка палиндромом
function isPalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }

  return string === reverseString;
}

//Функция полученияя целого положительного числа из строки
function getPositiveNumber(string) {
  string = string.toString();
  let number = '';

  for (let i = 0; i < string.length; i++) {

    for (let j = 0; j <= 9; j++) {
      if (parseInt(string[i]) !== j) continue;
      number += string[i];
    }
  }
  return parseInt(number);
}
