'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var shuffle = function (a) {
    var j;
    var x;
    var i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  var getRandomArrWithoutRepeat = function (min, max) {
    var arr = [];
    for (var j = min; j <= max; j++) {
      arr.push(j);
    }
    shuffle(arr);
    return arr;
  };

  window.util = {
    getRandomArrWithoutRepeat: getRandomArrWithoutRepeat,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  }

})();
