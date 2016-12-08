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

    $scope.logout = function() {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };

    $scope.crystalSpeechCtn = '"Hey Crystal, I did 50 pushups."';
    $scope.crystalSpeech = '';

    $scope.typeIt = function(){

    };

    // Orb Logic
    var getV = function() {
      return 1 * (Math.random() - 0.5) * (Math.random() < 0.5 ? -1 : 1);
    };
    // var getP = function() {
    //   return 1 * (Math.random() - 0.5);
    // };

    // flake class
    function Flake() {

      this._node = document.createElement('div');
      this._node.className = 'flake';

      this._vec = { x: getV(), y: getV() };
      this._pos = { x: this._vec.x * 40, y: this._vec.y * 40 - 10 };

      this._scale = 1 + Math.random();
      this._scale = Math.max(0, this._scale - (0.03 * 60));

      if ((this._pos.x * this._pos.x + this._pos.y * this._pos.y) < 8000) {
        this._render();
      }

    }

    Flake.prototype = {

      getNode: function() {
        return this._node;
      },

      update: function() {

        if (!this._pos) {
          this._pos = { x: 0, y: 0 };
          this._vec = { x: getV(), y: getV() };
          this._scale = 2 + Math.random();
        }

        this._vec.y -= 0.05;

        this._pos.x += this._vec.x;
        this._pos.y += this._vec.y;
        this._scale = Math.max(0, this._scale - 0.035);

        this._render();

        if ((this._pos.x * this._pos.x + this._pos.y * this._pos.y) > 100000) {
          this._pos = null;
        }

      },

      _render: function() {

        var transform = 'translate3d(' + this._pos.x + 'px,' + this._pos.y + 'px,0) scale(' + this._scale + ')';

        this._node.style.msTransform = transform;
        this._node.style.webkitTransform = transform;
        this._node.style.MozTransform = transform;
        this._node.style.OTransform = transform;
        this._node.style.transform = transform;

      }

    };


    // the flakes
    var MAX_FLAKES = 1;
    var orb = document.querySelector('.orb');
    var flakes = new Array(MAX_FLAKES);
    var flake;
    var i = 0;


    // setup flakes
    for (; i < MAX_FLAKES; i++) {
      flake = new Flake();
      var node = flake.getNode();
      orb.appendChild(node);
      flakes[i] = flake;
    }


    // the flake creator
    var tick = function() {

      // update flakes
      for (i = 0; i < MAX_FLAKES; i++) {
        flake = flakes[i];
        flake.update();
      }

      // next tick
      requestAnimationFrame(function() {
        tick();
      });

    };

    // start ticking
    setTimeout(function() {
      tick();
    }, 10);
  }]);
