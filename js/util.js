'use strict';
(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomArray = function (elementsArray) {
    var randomElement = elementsArray[Math.floor(Math.random() * elementsArray.length)];
    return randomElement;
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    getRandomArray: getRandomArray
  }

})();
