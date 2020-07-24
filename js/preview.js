'use strict';
(function () {
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
    for (var i = 0; i < photo.comments.length; i++) {
      createComment(photo.comments[i]);
    }
  };


  window.preview = {
    bigPicture: bigPicture,
    bigСommentsList: bigСommentsList,
    createBigPicture: createBigPicture,
    createCommentsPool: createCommentsPool
  };

})();
