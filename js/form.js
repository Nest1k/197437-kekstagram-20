'use strict';
(function () {
  // открытие и закрытие редактирования картинки form
  var PHOTO_SCALE_VALUE_MIN = '25%';
  var PHOTO_SCALE_VALUE_MAX = '100%';
  var uploadFile = document.querySelector('#upload-file');
  var body = document.querySelector('body');
  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var originalEffect = imageEditingForm.querySelector('input[id=effect-none]');
  var effectLevel = imageEditingForm.querySelector('.effect-level');
  var MAX_LENGTH_SLIDER = 450;

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
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  // смена класса для фото
  var effectsImage = document.querySelector('.img-upload__effects');

  function filterChangeHandler(evt) {
    photoWithEffect.className = 'effects__preview--' + evt.target.value;
    photoWithEffect.style.filter = '';
    if (!originalEffect.checked) {
      effectLevel.classList.remove('hidden');
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
    } else {
      effectLevel.classList.add('hidden');
    }
  }

  effectsImage.addEventListener('change', filterChangeHandler);

  //  установка фильтра для фото
  function appliesFilter(value) {
    var objectFilter = {
      chrome: 'grayscale(' + value / 100 + ')',
      sepia: 'sepia(' + value / 100 + ')',
      marvin: 'invert(' + value + '%)',
      phobos: 'blur(' + value * 0.03 + 'px)',
      heat: 'brightness(' + value * 0.02 + 1 + ')'
    };
    for (var key in objectFilter) {
      if (photoWithEffect.className.includes(key)) {
        photoWithEffect.style.filter = objectFilter[key];
      }
    }
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: evt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: evt.clientY
      };

      if (parseInt(effectLevelPin.style.left, 10) < 0) {
        effectLevelPin.style.left = '0';
        shift.x = 0;
        onMouseUp(moveEvt);
      } else if (parseInt(effectLevelPin.style.left, 10) > MAX_LENGTH_SLIDER) {
        effectLevelPin.style.left = MAX_LENGTH_SLIDER + 'px';
        shift.x = 0;
        onMouseUp(moveEvt);
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      }

      effectPinInput.value = parseInt(effectLevelPin.style.left, 10) * 100 / MAX_LENGTH_SLIDER;

      appliesFilter(effectPinInput.value);

      effectLevelDepth.style.width = effectPinInput.value + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  // Хэш-теги

  var commentInput = imageEditingForm.querySelector('.text__description');
  var hashtagsInput = imageEditingForm.querySelector('.text__hashtags');
  var space = ' ';

  var checkRegular = function (arr, reg) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
      if (!reg.test(arr[i])) {
        flag = false;
      }
    }
    return flag;
  };

  var checkLength = function (arr) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length < 2 || arr[i].length > 20) {
        flag = false;
      }
    }
    return flag;
  };

  var checkRepeat = function (arr) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
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

})();
