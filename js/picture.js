'use strict';
(function () {
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

  for (var j = 0; j < window.data.PHOTO_NUMBER_MAX; j++) {
    fragment.appendChild(drawUser(window.data.massUser[j]));
  };

  pictures.appendChild(fragment);

  window.picture = {
    pictures: pictures,
  }

})();
