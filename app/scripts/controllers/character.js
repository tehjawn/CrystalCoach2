'use strict';

/**
 * @ngdoc function
 * @name crystalcoachApp.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the crystalcoachApp
 */
angular.module('crystalcoachApp')
  .controller('CharacterCtrl', ["auth", "$scope", "$location", function (auth, $scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.logout = function () {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };

  }]);
