'use strict';
/**
 * @ngdoc function
 * @name crystalcoachApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('crystalcoachApp')
  .controller('LoginCtrl', ['$scope', 'auth', '$location', function ($scope, auth, $location) {

    $scope.loginBtn = true;
    $scope.logoutBtn = true;

    auth.$onAuthStateChanged(function (authData) {
      if (authData) {
        console.log(' logged: ' + authData.uid);
        $scope.logoutBtn = true;
        $scope.loginBtn = false;
        $location.path('/account');
      }
    });

    

      // SignIn with a Provider
      $scope.oauthLogin = function (provider) {
        auth.$signInWithPopup(provider)
          .then(function (authData) {
            console.log('logged');
            redirect();
          })
          .catch(function (error) {
            console.log('login error');
            showError(error);
          })
      };

      // Anonymous login method
      $scope.anonymousLogin = function () {
        auth.$signInAnonymously()
          .then(function (authData) {
            console.log('logged ', authData.uid);
          })
          .catch(function (error) {
            console.log('login error ', error);
          })
      };

    

    

      // Autenthication with password and email
      $scope.passwordLogin = function (email, pass) {

        auth.$signInWithEmailAndPassword(email, pass)
          .then(function (authData) {
            redirect();
            console.log('logged');
          })
          .catch(function (error) {
            showError(error);
            console.log('error: ' + error);
          });
      };

      $scope.createAccount = function (email, pass, confirm) {
        $scope.err = null;

        if (!pass) {
          $scope.err = 'Please enter a password';
        } else if (pass !== confirm) {
          $scope.err = 'Passwords do not match';
        } else {
          auth.$createUserWithEmailAndPassword(email, pass)
            .then(function (userData) {
              console.log('User ' + userData.uid + ' created successfully');
              return userData;
            })
            .then(function (authData) {
            console.log('Logged user: ', authData.uid);
              createProfile();
              redirect();
            })
            .catch(function (error) {
              console.error('Error: ', error);
            });
          }
        };

        //todo wait till SDK 3.x support comes up to test
        function createProfile(user) {

          // var query =
          var userObj = rootRef.child('users').child(user.uid);
          var def = $q.defer();
          ref.set({email: email, name: firstPartOfEmail(email)}, function (err) {
            $timeout(function () {
              if (err) {
                def.reject(err);
              }
              else {
                def.resolve(ref);
              }
            });
          });
          return def.promise;
        }

      function firstPartOfEmail(email) {
        return ucfirst(email.substr(0, email.indexOf('@')) || '');
      }

      function ucfirst(str) {
        // inspired by: http://kevin.vanzonneveld.net
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
      }

    

    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  }]);
