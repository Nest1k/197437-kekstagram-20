'use strict';
(function () {
  var pictures = document.querySelector('.pictures');
  var picture = document.querySelector('#picture').content.querySelector('.picture');

  function drawUser(user) {
    var usersElement = picture.cloneNode(true);
    usersElement.querySelector('.picture__img').src = user.url;
    usersElement.querySelector('.picture__likes').textContent = user.likes;
    usersElement.querySelector('.picture__comments').textContent = user.comments.length;

    return usersElement;
  };

  var successHandler = function (users) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.data.PHOTO_NUMBER_MAX; j++) {
      fragment.appendChild(drawUser(users[j]));
    };
    pictures.appendChild(fragment);
  }

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);


  window.picture = {
    pictures: pictures,
  }

})();
