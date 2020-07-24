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

    hashtagsInput.value = '';
    commentInput.value = '';
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
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

  // смена класса для фото
  var effectsImage = document.querySelector('.img-upload__effects');

  function filterChangeHandler(evt) {
    photoWithEffect.className = 'effects__preview--' + evt.target.value;
    photoWithEffect.style.filter = '';
    if (!originalEffect.checked) {
      effectLevel.classList.remove('hidden');
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      effectPinInput.value = 100;
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

      effectPinInput.value = parseInt(effectLevelPin.style.left, 10) * 100 / MAX_LENGTH_SLIDER;

      appliesFilter(effectPinInput.value);

      effectLevelDepth.style.width = effectPinInput.value + '%';
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

  //форма
  var main = document.querySelector('main');
  var loadMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  var closeMessage = function () {
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onMessageEscPress);
    if (main.contains(loadMessage)) {
      loadMessage.parentNode.removeChild(loadMessage);
    } else if (main.contains(errorMessage)) {
      errorMessage.parentNode.removeChild(errorMessage);
    }
  };

  var renderMessage = function (message) {
    closePopup();
    main.insertAdjacentElement('beforeEnd', message);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var onLoad = function () {
    renderMessage(loadMessage);
    document.addEventListener('click', function (evt) {
      if (evt.target !== loadMessage.querySelector('.success__inner') && (evt.target !== loadMessage.querySelector('.success__title'))) {
        closeMessage();
      }
    });
  };

  var onError = function () {
    renderMessage(errorMessage);
    document.addEventListener('click', function (evt) {
      if (evt.target !== errorMessage.querySelector('.error__inner') && (evt.target !== errorMessage.querySelector('.error__title'))) {
        closeMessage();
      }
    });
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.sendForm(new FormData(form), onLoad, onError);
    evt.preventDefault();
  });

})();
