'use strict';
(function () {
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
    window.form.closePopup();
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
