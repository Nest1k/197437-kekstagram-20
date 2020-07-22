'use strict';
(function () {
  var PHOTO_NUMBER_MAX = 25;
  // var PHOTO_NUMBER_MIN = 1;
  // var PHOTO_NUMBER_MAX = 25;
  // var LIKE_NUMBER_MIN = 15;
  // var LIKE_NUMBER_MAX = 200;
  // var AVATAR_NUMBER_MIN = 1;
  // var AVATAR_NUMBER_MAX = 6;

  // var messages = ['Всё отлично!', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
  // var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  // var massUsers = [];
  // function genUser() {
  //   var usersObject =
  //   {
  //     url: 'photos/' + window.util.getRandomInteger(PHOTO_NUMBER_MIN, PHOTO_NUMBER_MAX) + '.jpg',
  //     description: "Xnotik",
  //     likes: window.util.getRandomInteger(LIKE_NUMBER_MIN, LIKE_NUMBER_MAX),
  //     comments:
  //       [
  //         {
  //           avatar: 'img/avatar-' + window.util.getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.svg',
  //           message: window.util.getRandomArray(messages),
  //           name: window.util.getRandomArray(names)
  //         },
  //         {
  //           avatar: 'img/avatar-' + window.util.getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.svg',
  //           message: window.util.getRandomArray(messages),
  //           name: window.util.getRandomArray(names)
  //         }
  //       ]
  //   }
  //   return usersObject;
  // };

  // function genMassUsers(user) {
  //   massUsers.push(user);
  // };

  // for (var i = 0; i < PHOTO_NUMBER_MAX; i++) {
  //   genMassUsers(genUser(i))
  // };



  window.data = {
    // massUsers: massUsers,
    PHOTO_NUMBER_MAX: PHOTO_NUMBER_MAX
  };

})();
