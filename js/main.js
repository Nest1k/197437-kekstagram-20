'use strict';
var PHOTO_NUMBER_MIN = 1;
var PHOTO_NUMBER_MAX = 25;
var LIKE_NUMBER_MIN = 15;
var LIKE_NUMBER_MAX = 200;
//var AVATAR_NUMBER_MIN = 1;
//var AVATAR_NUMBER_MAX = 6;


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomArray (elementsArray) {
  var randomElement = elementsArray[Math.floor(Math.random() * elementsArray.length)];
  return randomElement;
};

var messages = ['Всё отлично!', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
//var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var massUser = [];
var genUser = function() {
  var usersObject =
    {
      url: 'photos/' + randomInteger(PHOTO_NUMBER_MIN, PHOTO_NUMBER_MAX) + '.jpg',
      description: "",
      likes: randomInteger(LIKE_NUMBER_MIN, LIKE_NUMBER_MAX),
      comments: randomArray(messages)
      // [
      //   {
      //   avatar: 'img/avatar-' + randomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.svg',
      //   message: randomArray(messages),
      //   name: randomArray(names)
      //   }
      // ]
    }
  return usersObject;
};

function genMassUsers(user) {
  massUser.push(user);
};

for (var i = 0; i < PHOTO_NUMBER_MAX; i++) {
  genMassUsers(genUser(i))
};

var pictures = document.querySelector('.pictures');
var picture = document.querySelector('#picture').content.querySelector('.picture');

var fragment = document.createDocumentFragment();

var drawUser = function (user) {
  var usersElement = picture.cloneNode(true);
  usersElement.querySelector('.picture__img').src = user.url;
  usersElement.querySelector('.picture__likes').textContent = user.likes;
  usersElement.querySelector('.picture__comments').textContent = user.comments;

  return usersElement;
};

for (var j = 0; j < PHOTO_NUMBER_MAX; j++) {
  fragment.appendChild(drawUser(massUser[j]));
};

pictures.appendChild(fragment);
