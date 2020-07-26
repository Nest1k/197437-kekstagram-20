'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersButtons = document.querySelectorAll('.img-filters__button');
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  window.getDiscussed = function (response) {
    response.sort(function (a, b) {
      if (a.comments.length > b.comments.length) {
        return 1;
      }
      if (a.comments.length < b.comments.length) {
        return -1;
      }
      return 0;
    });
    return response;
  };

  imgFilters.addEventListener('click', window.debounce(function (evt) {
    if (evt.target.matches('button')) {
      for (var i = 0; i < imgFiltersButtons.length; i++) {
        imgFiltersButtons[i].classList.remove('img-filters__button--active');
      }
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target === filterDefault) {
      window.filteredGallery.onDefault();
    }
    if (evt.target === filterRandom) {
      window.filteredGallery.onRandom();
    }
    if (evt.target === filterDiscussed) {
      window.filteredGallery.onDiscussed();
    }
  }));

})();
