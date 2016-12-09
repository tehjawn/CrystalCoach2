'use strict';

/**
 * @ngdoc function
 * @name crystalcoachApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crystalcoachApp
 */
angular.module('crystalcoachApp')
  .controller('MainCtrl', ['auth', '$scope', '$timeout', '$location', function(auth, $scope, $timeout, $location) {

    $scope.goTo = function(dest) {
      $location.path('/'+dest);
    }

    // $scope.logout = function() {
    //   auth.$signOut();
    //   console.log('logged out');
    //   $location.path('/login');
    //   $scope.authData = null;
    // };

    $scope.crystalSpeechCtn = '"Hey Crystal, I did 50 pushups."';
    $scope.crystalSpeech = '';
    
  }]);
