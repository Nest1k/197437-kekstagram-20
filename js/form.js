'use strict';
(function () {
  // открытие и закрытие редактирования картинки form
  var PHOTO_SCALE_VALUE_MIN = '25%';
  var PHOTO_SCALE_VALUE_MAX = '100%';
  var MAX_LENGTH_SLIDER = 450;
  var uploadFile = document.querySelector('#upload-file');
  var body = document.querySelector('body');
  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var originalEffect = imageEditingForm.querySelector('input[id=effect-none]');
  var effectLevel = imageEditingForm.querySelector('.effect-level');


  var openPopup = function () {
    body.classList.add('modal-open');
    imageEditingForm.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    controlValue.value = PHOTO_SCALE_VALUE_MAX;
    effectLevel.classList.add('hidden');
  };

  var closePopup = function () {
    body.classList.remove('modal-open');
    imageEditingForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    photoWithEffect.style.transform = 'scale(1)';
    uploadFile.value = '';
    originalEffect.checked = true;
    photoWithEffect.style.filter = '';

    hashtagsInput.value = '';
    commentInput.value = '';
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && evt.target !== hashtagsInput && evt.target !== commentInput) {
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
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

  // смена класса для фото
  var effectsImage = document.querySelector('.img-upload__effects');

  function filterChangeHandler(evt) {
    photoWithEffect.className = 'effects__preview--' + evt.target.value;
    photoWithEffect.style.filter = '';
    if (!originalEffect.checked) {
      effectLevel.classList.remove('hidden');
      effectLevelPin.style.left = PHOTO_SCALE_VALUE_MAX;
      effectLevelDepth.style.width = PHOTO_SCALE_VALUE_MAX;
    } else {
      effectLevel.classList.add('hidden');
    }
  }

  effectsImage.addEventListener('change', filterChangeHandler);

  //  установка фильтра для фото
  var appliesFilter = function (value) {
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
        y: moveEvt.clientY
      };

      if (effectLevelPin.offsetLeft < 0) {
        effectLevelPin.style.left = 0 + 'px';
        effectLevelDepth.style.width = 0 + 'px';
      } else if (effectLevelPin.offsetLeft > MAX_LENGTH_SLIDER) {
        effectLevelPin.style.left = MAX_LENGTH_SLIDER + 'px';
        effectLevelDepth.style.width = MAX_LENGTH_SLIDER + 'px';
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift.x) + 'px';
      }

      var effect = parseInt(effectLevelPin.style.left, 10) * 100 / MAX_LENGTH_SLIDER;
      appliesFilter(effect);
      effectLevelDepth.style.width = effect + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      imgUploadEffectLevel.removeEventListener('mousemove', onMouseMove);
      imgUploadEffectLevel.removeEventListener('mouseup', onMouseUp);
    };

    imgUploadEffectLevel.addEventListener('mousemove', onMouseMove);
    imgUploadEffectLevel.addEventListener('mouseup', onMouseUp);
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
        break;
      }
    }
    return flag;
  };

  var checkLength = function (arr) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length < 2 || arr[i].length > 20) {
        flag = false;
        break;
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
      hashtagsInput.style.boxShadow = 'inset 0 0 0 5px red';

    } else if (checkLength(hashtags) === false) {
      hashtagsInput.setCustomValidity('Хэштег должен быть меньше, чем из 20 символов');
      hashtagsInput.style.boxShadow = 'inset 0 0 0 5px red';

    } else if (checkRepeat(hashtags) === false) {
      hashtagsInput.setCustomValidity('Не должно быть повторяющихся хэштегов');
      hashtagsInput.style.boxShadow = 'inset 0 0 0 5px red';

    } else if (hashtags.length > 5) {
      hashtagsInput.setCustomValidity('Слишком много, нужно не больше 5 хэштегов');
      hashtagsInput.style.boxShadow = 'inset 0 0 0 5px red';

    } else {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.style.boxShadow = 'none';
    }
  });

  commentInput.maxLength = 140;

  commentInput.addEventListener('input', function () {
    if (commentInput.validity.tooLong) {
      commentInput.setCustomValidity('Комментарий слишком длинный');
      commentInput.style.boxShadow = 'inset 0 0 0 5px red';
    } else {
      commentInput.setCustomValidity('');
      commentInput.style.boxShadow = 'none';
    }
  });

  window.form = {
    closePopup: closePopup,
  };
})();
