'use strict';
var PHOTO_NUMBER_MIN = 1;
var PHOTO_NUMBER_MAX = 25;
var LIKE_NUMBER_MIN = 15;
var LIKE_NUMBER_MAX = 200;
var AVATAR_NUMBER_MIN = 1;
var AVATAR_NUMBER_MAX = 6;


function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomArray (elementsArray) {
  var randomElement = elementsArray[Math.floor(Math.random() * elementsArray.length)];
  return randomElement;
};

var messages = ['Всё отлично!', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var massUser = [];
function genUser () {
  var usersObject =
    {
      url: 'photos/' + randomInteger(PHOTO_NUMBER_MIN, PHOTO_NUMBER_MAX) + '.jpg',
      description: "Xnotik",
      likes: randomInteger(LIKE_NUMBER_MIN, LIKE_NUMBER_MAX),
      comments:
      [
        {
        avatar: 'img/avatar-' + randomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.svg',
        message: randomArray(messages),
        name: randomArray(names)
        },
        {
          avatar: 'img/avatar-' + randomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.svg',
          message: randomArray(messages),
          name: randomArray(names)
        }
      ]
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

function drawUser (user) {
  var usersElement = picture.cloneNode(true);
  usersElement.querySelector('.picture__img').src = user.url;
  usersElement.querySelector('.picture__likes').textContent = user.likes;
  usersElement.querySelector('.picture__comments').textContent = user.comments.length;

  return usersElement;
};

for (var j = 0; j < PHOTO_NUMBER_MAX; j++) {
  fragment.appendChild(drawUser(massUser[j]));
};

pictures.appendChild(fragment);


var massUserComment = massUser[0].comments[0];
document.querySelector('.big-picture').classList.remove('hidden');

document.querySelector('.big-picture__img').children[0].src = massUser[0].url;
document.querySelector('.likes-count').textContent = massUser[0].likes;
document.querySelector('.comments-count').textContent = massUser[0].comments.length;

var socialComments = document.querySelector('.social__comments');


function commentUser () {
  var newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  var newCommentAvatar = document.createElement('img');
  newCommentAvatar.classList.add('social__picture');
  newCommentAvatar.src = massUserComment.avatar;
  newCommentAvatar.alt = massUserComment.name;
  newCommentAvatar.style = 'width: 35px; height: 35px';
  newComment.append(newCommentAvatar);
  var newCommentText = document.createElement('p');
  newCommentText.classList.add('social__text');
  newCommentText.textContent = massUserComment.message;
  newComment.append(newCommentText);

  return socialComments.append(newComment);
};

commentUser();

document.querySelector('.social__caption').textContent = massUser[0].description;
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
