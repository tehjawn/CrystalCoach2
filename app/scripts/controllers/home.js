'use strict';

/**
 * @ngdoc function
 * @name crystalcoachApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the crystalcoachApp
 */
angular.module('crystalcoachApp')
  .controller('HomeCtrl', ['$location', '$scope', 'auth', 'currentAuth', '$firebaseArray', function(
    $location,
    $scope,
    auth,
    currentAuth,
    $firebaseArray
  ) {

    $scope.authUser = currentAuth;
    var query = rootRef.child('users').child(currentAuth.uid);
    var userInfo = $firebaseArray(query);

    $scope.user = {
      uid: currentAuth.uid,
      name: currentAuth.displayName,
      photo: currentAuth.photoURL,
      email: currentAuth.email,
      info: userInfo
    };

    $scope.logout = function () {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };

  }]);
