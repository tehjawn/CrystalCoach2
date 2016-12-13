'use strict';

/**
 * @ngdoc function
 * @name crystalcoachApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the crystalcoachApp
 */
angular.module('crystalcoachApp')
  .controller('StatsCtrl', ['$firebaseObject', '$timeout', '$location', '$scope', 'auth', 'currentAuth', '$firebaseArray', function(
    $firebaseObject,
    $timeout,
    $location,
    $scope,
    auth,
    currentAuth,
    $firebaseArray
  ) {

    $scope.goTo = function(dest) {
      $location.path('/' + dest);
    }

    // Graph Example

    var query = rootRef.child('users').child(currentAuth.uid);
    var userInfo = $firebaseObject(query);
    userInfo.$bindTo($scope, 'userInfo')

    $scope.labels = ["Calories", "Carbohydrates", "Fat", "Protein"]
    $scope.series = ["Current", "Goal"]
    $scope.data = [
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
    $timeout(function() {
      $scope.data = [
        [1, 2, 3, 4],
        [5, 6, 7, 8]
      ]

      $scope.updateData();
    }, 2000)

    $scope.updateData = function(){
      $scope.data[0][0] = $scope.userInfo.nutrition.quick[0]
      $scope.data[0][1] = $scope.userInfo.nutrition.quick[1]
      $scope.data[0][2] = $scope.userInfo.nutrition.quick[2]
      $scope.data[0][3] = $scope.userInfo.nutrition.quick[3]
      $scope.data[1][0] = $scope.userInfo.metrics.calories
      $scope.data[1][1] = $scope.userInfo.metrics.everything.carbs
      $scope.data[1][2] = $scope.userInfo.metrics.everything.fat
      $scope.data[1][3] = $scope.userInfo.metrics.everything.protein
    }

    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };

    $scope.logout = function() {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };

    $scope.user = {
      uid: currentAuth.uid,
      name: currentAuth.displayName,
      photo: currentAuth.photoURL,
      email: currentAuth.email,
      info: userInfo
    };

// ...

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
      var data = {
        userInput: input,
        userId: currentAuth.uid
      }
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
        "data": JSON.stringify(data)
      }

      $.ajax(settings).done(function(response) {
        console.log("Crystal Response: "+ JSON.stringify(response))
        callback(response.message)
        var query = rootRef.child('users').child(currentAuth.uid).child('messageHistory');
        var userMessageHistory = $firebaseArray(query);
        var d = new Date()
        userMessageHistory.$add({
          sender: currentAuth.displayName,
          content: input,
          date: d.getTime()
        }).then(function(query) {
          console.log("Added User Input to Message History")
        })
        userMessageHistory.$add({
          sender: "Crystal",
          content: response.message,
          date: d.getTime()
        }).then(function(query) {
          console.log("Added Crystal Response to Message History")
        })
        $scope.userInfo.nutrition.quick[0] += parseInt(response.metrics.calories)
        $scope.userInfo.nutrition.quick[1] += parseInt(response.metrics.carbs)
        $scope.userInfo.nutrition.quick[2] += parseInt(response.metrics.fat)
        $scope.userInfo.nutrition.quick[3] += parseInt(response.metrics.protein)
        var query = rootRef.child('users').child(currentAuth.uid).child('nutrition').child('quick');
        var userNutrition = $firebaseArray(query);
        userNutrition[0] = $scope.userInfo.nutrition.quick[0]
        userNutrition[1] = $scope.userInfo.nutrition.quick[1]
        userNutrition[2] = $scope.userInfo.nutrition.quick[2]
        userNutrition[3] = $scope.userInfo.nutrition.quick[3]
        console.log(userNutrition);
        userNutrition.$save(0);
        userNutrition.$save(1);
        userNutrition.$save(2);
        userNutrition.$save(3);
        $scope.updateData();
        $("canvas").fadeIn();
        $(".mic-loading").fadeOut();
        $(".mic-overlay").fadeOut();
      });
    }

  }]);
