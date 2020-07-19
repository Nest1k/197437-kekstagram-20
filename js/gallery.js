'use strict';
(function () {
  var thumbnailes = window.picture.pictures.querySelectorAll('.picture');

  var openBigPhoto = function () {
    window.preview.bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onBigPhotoEscPress);
  };

  var addClickHandler = function (thumbnail, photo) {
    thumbnail.addEventListener('click', function () {
      window.preview.createBigPicture(photo);
      window.preview.createCommentsPool(photo);
      openBigPhoto();
    });
  };

  for (var i = 0; i < thumbnailes.length; i++) {
    addClickHandler(thumbnailes[i], window.data.massUser[i]);
  }

  var bigPhotoCancel = document.querySelector('#picture-cancel');

  var closeBigPhoto = function () {
    window.preview.bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    window.preview.bigСommentsList.innerHTML = ' ';

    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  var onBigPhotoEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPhoto();
    }
  };

  bigPhotoCancel.addEventListener('click', function () {
    closeBigPhoto();
  });

})();
