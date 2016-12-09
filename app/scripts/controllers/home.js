'use strict';

/**
 * @ngdoc function
 * @name crystalcoachApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the crystalcoachApp
 */
angular.module('crystalcoachApp')
  .controller('HomeCtrl', ['$timeout', '$location', '$scope', 'auth', 'currentAuth', '$firebaseArray', function(
    $timeout,
    $location,
    $scope,
    auth,
    currentAuth,
    $firebaseArray
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

    $scope.logout = function() {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };

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
