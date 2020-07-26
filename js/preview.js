'use strict';
(function () {
  var picturesWrapper = document.querySelector('.pictures');
  var socialFooterText = document.querySelector('.social__footer-text');
  var pictureCancel = document.querySelector('#picture-cancel');
  var bigPicture = document.querySelector('.big-picture');

  var onPicturePopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePicture);
  };
  var openPicture = function (current) {
    var thumbPictures = picturesWrapper.querySelectorAll('.picture img');
    var getIndexOfPic = function () {
      for (var n = 0; n < thumbPictures.length; n++) {
        if (current === thumbPictures[n]) {
          var numberOfPic = n;
        }
      }
      return numberOfPic;
    };
    var numberOfPic = getIndexOfPic();
    window.renderBigPicture(numberOfPic);
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPicturePopupEscPress);

    window.loader.commentsHandler();
  };
  var closePicture = function () {
    if (socialFooterText !== document.activeElement) {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onPicturePopupEscPress);
    }
  };
  picturesWrapper.addEventListener('click', function (current) {
    if (current.target && current.target.matches('.picture img')) {
      openPicture(current.target);
    }
  });

  picturesWrapper.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      if (evt.target && evt.target.matches('.picture')) {
        var target = evt.target.querySelector('img');
        openPicture(target);
      }
    });
  });
  pictureCancel.addEventListener('click', function () {
    closePicture();
  });
  pictureCancel.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePicture);
  });

  socialFooterText.addEventListener('input', function () {
    var MAX_LENGTH = 140;
    var valueLength = socialFooterText.value.length;
    if (valueLength === MAX_LENGTH) {
      socialFooterText.setCustomValidity('Вы ввели максимальное количество символов');
    } if (valueLength > MAX_LENGTH) {
      socialFooterText.setCustomValidity('Удалите лишние ' + (valueLength - MAX_LENGTH) + ' симв.');
    } else {
      socialFooterText.setCustomValidity('');
    }
  });
})();
