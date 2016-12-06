'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('crystalcoachApp')
  .controller('AccountCtrl', ['$scope', 'auth', 'currentAuth', '$firebaseArray', '$timeout', function(
    $scope,
    auth,
    currentAuth,
    $firebaseArray,
    $timeout
  ) {

    var query = rootRef.child('users').child(currentAuth.uid);
    var user_info = $firebaseArray(query);

    $scope.user = {
      uid: currentAuth.uid,
      name: currentAuth.displayName,
      photo: currentAuth.photoURL,
      email: currentAuth.email,
      info: user_info
    };


    $scope.authInfo = currentAuth;

    $scope.changePassword = function(oldPass, newPass, confirm) {
      $scope.err = null;

      if (!oldPass || !newPass) {
        error('Please enter all fields');

      } else if (newPass !== confirm) {
        error('Passwords do not match');

      } else {
        // New Method
        auth.$updatePassword(newPass).then(function() {
          console.log('Password changed');
        }, error);

      }
    };

    $scope.changeEmail = function(newEmail) {
      auth.$updateEmail(newEmail)
        .then(function() {
          console.log('email changed successfully');
        })
        .catch(function(error) {
          console.log('Error: ', error);
        });
    };

    $scope.logout = function() {
      auth.$signOut();
    };

    function error(err) {
      console.log('Error: ', err);
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = { text: msg + '', type: type };
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }

    $scope.updateProfile = function(name, imgUrl) {
      firebase.auth().currentUser.updateProfile({
          displayName: name,
          photoURL: imgUrl
        })
        .then(function() {
          console.log('updated');
        })
        .catch(function(error) {
          console.log('error ', error);
        })
    };

  }]);
