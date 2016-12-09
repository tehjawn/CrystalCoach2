'use strict';

/**
 * @ngdoc function
 * @name crystalcoachApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the crystalcoachApp
 */
angular.module('crystalcoachApp')
  .controller('StatsCtrl', ["auth", "$scope", "$location", function (auth, $scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.goTo = function(dest) {
      $location.path('/'+dest);
    }
    
    $scope.logout = function () {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };

  }]);
