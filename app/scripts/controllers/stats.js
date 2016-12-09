'use strict';

/**
 * @ngdoc function
 * @name crystalcoachApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the crystalcoachApp
 */
angular.module('crystalcoachApp')
  .controller('StatsCtrl', ['$location', '$scope', 'auth', 'currentAuth', '$firebaseArray', '$timeout', function(
    $location,
    $scope,
    auth,
    currentAuth,
    $firebaseArray,
    $timeout
  ) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.goTo = function(dest) {
      $location.path('/'+dest);
    }
    
// Graph Example
  $scope.labels = ['Calories', 'Carbs', 'Fat', 'Protein'];
  $scope.series = ['Today', 'This Week'];
  $scope.data = [
    [65, 59, 80, 59],
    [28, 48, 40, 28]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  $timeout(function () {
    $scope.data = [
      [28, 48, 40, 28],
      [65, 59, 80, 59]
    ];
  }, 3000);

    $scope.logout = function () {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };

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

  }]);
