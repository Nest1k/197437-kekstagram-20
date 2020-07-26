'use strict';
(function () {
  var TIMEOUT_IN_MS = 10000;
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };
  window.backend = {
    onError: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; color: black; width: 582px; vertical-align: middle; margin: 0 auto; padding: 20px;text-align: center; background-color: #fa8072;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '26px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },

    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL_LOAD);

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          window.backend.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        window.backend.onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        window.backend.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.send();
    },
    sendForm: function (data, onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          window.backend.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        window.backend.onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        window.backend.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
