'use strict';
(function () {
  var COMMENTS_STEP = 5;

  var commentsHandler = function () {
    var bigPicture = document.querySelector('.big-picture');
    var socialCommentsWrapper = bigPicture.querySelector('.social__comments');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    var socialComment = socialCommentsWrapper.querySelectorAll('.social__comment');
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    var commentsShow = COMMENTS_STEP;
    commentsLoader.classList.remove('hidden');
    var getCommentsList = function () {
      for (var i = 0; i < socialComment.length; i++) {
        if (i < commentsShow) {
          socialComment[i].classList.remove('hidden');
        } else if (i >= commentsShow) {
          socialComment[i].classList.add('hidden');
        }
      }
      socialCommentCount.textContent = commentsShow + ' из ' + socialComment.length;
    };

    if (socialComment.length <= COMMENTS_STEP) {
      commentsLoader.classList.add('hidden');
      socialCommentCount.textContent = socialComment.length + ' из ' + socialComment.length;
    } else if (socialComment.length > COMMENTS_STEP) {
      getCommentsList();
    }

    commentsLoader.addEventListener('click', function () {
      commentsShow += COMMENTS_STEP;
      if (commentsShow < socialComment.length) {
        commentsLoader.classList.remove('hidden');
      } else if (commentsShow >= socialComment.length) {
        commentsShow = socialComment.length;
        commentsLoader.classList.add('hidden');
      }
      getCommentsList();
    });

  };

  window.loader = {
    commentsHandler: commentsHandler
  };

})();
