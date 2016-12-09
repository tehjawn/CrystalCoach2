'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('crystalcoachApp')
  .controller('AccountCtrl', ['$location', '$scope', 'auth', 'currentAuth', '$firebaseArray', '$timeout', function(
    $location,
    $scope,
    auth,
    currentAuth,
    $firebaseArray,
    $timeout
  ) {

    $scope.goTo = function(dest) {
      $location.path('/'+dest);
    }
    
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

    $scope.editAccountMode = false;
    $scope.toggleAccountEditMode = function() { 
      console.log("Toggling Edit Mode")
      $scope.editAccountMode ? $scope.editAccountMode=false : $scope.editAccountMode=true;
    }

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
          success('Successfully changed email!');
        })
        .catch(function(error) {
          console.log('Error: ', error);
        });
    };

    $scope.logout = function() {
      auth.$signOut();
      console.log('logged out');
      $location.path('#/login');
      $scope.authData = null;
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
        });
    };


    // Crystal Functions
    $scope.response = function(input) {
      console.log('Saying \'' + input + '\'...')
      $scope.userSaid = input
      responsiveVoice.speak(input)
    }

    $scope.rec

    $scope.stopListening = function() {
      console.log("Stop listen")
      $scope.rec.stop();
      $(".mic-overlay").fadeOut();
      $('#menu-open').attr('checked', false);
    }

    $scope.listen = function() {

      var obj = document.createElement("audio");
      obj.src = "https://kahimyang.com/resources/sound/click.mp3";
      obj.volume = 1;

      obj.play();

      $(".mic-overlay").fadeIn();
      var result;
      $scope.rec = new webkitSpeechRecognition();
      var interim = [];
      var final = '';

      $scope.rec.continuous = false;
      $scope.rec.lang = 'en-US';
      $scope.rec.interimResults = true;

      $scope.rec.onerror = function(event) {
        console.log('error!');
      };

      $scope.rec.start();

      $scope.rec.onresult = function(event) {
        for (var i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            final = final.concat(event.results[i][0].transcript);
            console.log(event.results[i][0].transcript);

            // $scope.response(final)
            $("canvas").fadeOut();
            $(".mic-loading").fadeIn();
            var crystalRes = $scope.askCrystal(final, $scope.response)

            // $scope.$apply();
          } else {
            interim.push(event.results[i][0].transcript);
            console.log('interim ' + event.results[i][0].transcript);
            $("#speech").text(result);
          }
        }
      }
    }

    $scope.speech = function() {
      console.log("Starting speech recognition...")
      var rec = new webkitSpeechRecognition();
      var interim = [];
      var final = '';

      rec.continuous = false;
      rec.lang = 'en-US';
      rec.interimResults = true;
      rec.onerror = function(event) {
        console.log('error!');
      };

      rec.start();

      rec.onresult = function(event) {
        for (var i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            final = final.concat(event.results[i][0].transcript);
            console.log(event.results[i][0].transcript);

            $scope.response(final)
            $scope.$apply();
          } else {
            interim.push(event.results[i][0].transcript);
            console.log('interim ' + event.results[i][0].transcript);
            $scope.$apply();
          }
        }
      }
    }
    $scope.askCrystal = function(input, callback) {
      console.log("Asking Crystal '" + input + "'...")
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/crystal/listen",
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "17e7252c-8e8a-2bf7-dd09-40088c042fe5"
        },
        "processData": false,
        "data": "{\n    \"userInput\" : \"" + input + "\"\n}"
      }

      $.ajax(settings).done(function(response) {
        callback(response.message)
        $("canvas").fadeIn();
        $(".mic-loading").fadeOut();
        $(".mic-overlay").fadeOut();
      });
    }
  }]);
