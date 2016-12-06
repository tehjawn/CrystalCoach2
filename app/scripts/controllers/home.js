'use strict';

/**
 * @ngdoc function
 * @name crystalcoachApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the crystalcoachApp
 */
angular.module('crystalcoachApp')
  .controller('HomeCtrl', ['auth', 'currentAuth', '$scope', '$location', function (auth, currentAuth, $scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = currentAuth;

    $scope.logout = function () {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };

  }]);
