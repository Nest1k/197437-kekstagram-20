'use strict';
var PHOTO_NUMBER_MIN = 1;
var PHOTO_NUMBER_MAX = 25;
var LIKE_NUMBER_MIN = 15;
var LIKE_NUMBER_MAX = 200;
var AVATAR_NUMBER_MIN = 1;
var AVATAR_NUMBER_MAX = 6;


function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArray(elementsArray) {
  var randomElement = elementsArray[Math.floor(Math.random() * elementsArray.length)];
  return randomElement;
};

var messages = ['Всё отлично!', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var massUser = [];
function genUser() {
  var usersObject =
  {
    url: 'photos/' + getRandomInteger(PHOTO_NUMBER_MIN, PHOTO_NUMBER_MAX) + '.jpg',
    description: "Xnotik",
    likes: getRandomInteger(LIKE_NUMBER_MIN, LIKE_NUMBER_MAX),
    comments:
      [
        {
          avatar: 'img/avatar-' + getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.svg',
          message: getRandomArray(messages),
          name: getRandomArray(names)
        },
        {
          avatar: 'img/avatar-' + getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.svg',
          message: getRandomArray(messages),
          name: getRandomArray(names)
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

function drawUser(user) {
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

// Для одной полноразмерной фотографии preview
var bigPicture = document.querySelector('.big-picture');

var createBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

var bigСommentsList = bigPicture.querySelector('.social__comments');
bigСommentsList.innerHTML = ' ';

var createComment = function (commentary) {
  var comment = document.createElement('li');
  comment.classList.add('social__comment');
  bigСommentsList.append(comment);

  var img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = commentary.avatar;
  img.alt = commentary.name;
  img.width = '35';
  img.height = '35';
  comment.append(img);

  var text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = commentary.message;
  comment.append(text);
};

var createCommentsPool = function (photo) {
  for (i = 0; i < photo.comments.length; i++) {
    createComment(photo.comments[i]);
  }
};

// Для всех полноразмерных фотографий

var thumbnailes = pictures.querySelectorAll('.picture');

var addClickHandler = function (thumbnail, photo) {
  thumbnail.addEventListener('click', function () {
    createBigPicture(photo);
    createCommentsPool(photo);
    openBigPhoto();
  });
};

for (i = 0; i < thumbnailes.length; i++) {
  addClickHandler(thumbnailes[i], massUser[i]);
}

var bigPhotoCancel = document.querySelector('#picture-cancel');

var onBigPhotoEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPhoto();
  }
};

var openBigPhoto = function () {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onBigPhotoEscPress);
};

var closeBigPhoto = function () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigСommentsList.innerHTML = ' ';

  document.removeEventListener('keydown', onBigPhotoEscPress);
};

bigPhotoCancel.addEventListener('click', function () {
  closeBigPhoto();
});

// открытие и закрытие редактирования картинки form
var PHOTO_SCALE_VALUE_MIN = '25%';
var PHOTO_SCALE_VALUE_MAX = '100%';
var uploadFile = document.querySelector('#upload-file');
var body = document.querySelector('body');
var imageEditingForm = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');
var originalEffect = imageEditingForm.querySelector('input[id=effect-none]');
var effectLevel = imageEditingForm.querySelector('.effect-level');

function openPopup() {
  body.classList.add('modal-open');
  imageEditingForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  controlValue.value = '100%';
  effectLevel.classList.add('hidden');
};

function closePopup() {
  body.classList.remove('modal-open');
  imageEditingForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  photoWithEffect.style.transform = 'scale(1)';
  uploadFile.value = '';
  originalEffect.checked = true;
  photoWithEffect.style.filter = '';
};

function onPopupEscPress(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

uploadFile.addEventListener('change', function () {
  openPopup();
  photoWithEffect.className = ('effects__preview--none');
});

uploadCancel.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup();
});

// Масштабирование изображения
var photoWithEffect = imageEditingForm.querySelector('.img-upload__preview').querySelector('img');
var controlSmaller = imageEditingForm.querySelector('.scale__control--smaller');
var controlBigger = imageEditingForm.querySelector('.scale__control--bigger');
var controlValue = imageEditingForm.querySelector('.scale__control--value');

var changeSize = function (sign) {
  controlValue.value = parseInt(controlValue.value, 10) + sign * 25 + '%';
  photoWithEffect.style.transform = 'scale(' + parseInt(controlValue.value, 10) / 100 + ')';
};

controlSmaller.addEventListener('click', function () {
  if (controlValue.value !== PHOTO_SCALE_VALUE_MIN) {
    changeSize(-1);
  }
});

controlBigger.addEventListener('click', function () {
  if (controlValue.value !== PHOTO_SCALE_VALUE_MAX) {
    changeSize(1);
  }
});


var effectLevelPin = document.querySelector('.effect-level__pin');
var effectPinInput = document.querySelector('.effect-level__value');

// смена класса для фото
var effectsList = document.querySelector('.img-upload__effects');

function filterChangeHandler(evt) {
  photoWithEffect.className = 'effects__preview--' + evt.target.value;
  photoWithEffect.style.filter = '';
  if (!originalEffect.checked) {
    effectLevel.classList.remove('hidden');
  } else {
    effectLevel.classList.add('hidden');
  }
}

effectsList.addEventListener('change', filterChangeHandler);

//  установка фильтра для фото
function appliesFilter() {
  var objectFilter = {
    chrome: 'grayscale(' + effectPinInput.value / 100 + ')',
    sepia: 'sepia(' + effectPinInput.value / 100 + ')',
    marvin: 'invert(' + effectPinInput.value + '%)',
    phobos: 'blur(' + effectPinInput.value * 0.03 + 'px)',
    heat: 'brightness(' + effectPinInput.value * 0.02 + 1 + ')'
  };
  for (var key in objectFilter) {
    if (photoWithEffect.className.includes(key)) {
      photoWithEffect.style.filter = objectFilter[key];
    }
  }
};

effectLevelPin.addEventListener('mouseup', appliesFilter);

// Хэш-теги

var commentInput = imageEditingForm.querySelector('.text__description');
var hashtagsInput = imageEditingForm.querySelector('.text__hashtags');
var space = ' ';

var checkRegular = function (arr, reg) {
  var flag = true;
  for (i = 0; i < arr.length; i++) {
    if (!reg.test(arr[i])) {
      flag = false;
    }
  }
  return flag;
};

var checkLength = function (arr) {
  var flag = true;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].length < 2 || arr[i].length > 20) {
      flag = false;
    }
  }
  return flag;
};

var checkRepeat = function (arr) {
  var flag = true;
  for (i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      arr[i] = arr[i].toLowerCase();
      arr[j] = arr[j].toLowerCase();
      if (arr[i] === arr[j]) {
        return false;
      }
    }
  }
  return flag;
};

var regular = /^#[A-ZА-Я0-9]+$/i;

hashtagsInput.addEventListener('input', function () {
  var hashtagsValue = hashtagsInput.value;
  var hashtags = hashtagsValue.split(space);


  if (checkRegular(hashtags, regular) === false) {
    hashtagsInput.setCustomValidity('Должны быть только цифры и буквы, а начинаться с #');

  } else if (checkLength(hashtags) === false) {
    hashtagsInput.setCustomValidity('Хэштег должен быть меньше, чем из 20 символов');

  } else if (checkRepeat(hashtags) === false) {
    hashtagsInput.setCustomValidity('Не должно быть повторяющихся хэштегов');

  } else if (hashtags.length > 5) {
    hashtagsInput.setCustomValidity('Слишком много, нужно не больше 5 хэштегов');

  } else {
    hashtagsInput.setCustomValidity('');
  }
});

commentInput.maxLength = 140;

commentInput.addEventListener('input', function () {
  if (commentInput.validity.tooLong) {
    commentInput.setCustomValidity('Комментарий слишком длинный');
  } else {
    commentInput.setCustomValidity('');
  }
});
