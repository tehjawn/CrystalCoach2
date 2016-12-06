
/**
 * @ngdoc function
 * @name crystalcoachApp.directive:ngHideAuth
 * @description
 * # ngHideAuthDirective
 * A directive that shows elements only when user is logged out. It also waits for Auth
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('crystalcoachApp')
  .directive('ngHideAuth', ['auth', '$timeout', function (auth, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it
        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !!auth.$getAuth());
          }, 0);
        }

        auth.$onAuthStateChanged(update);
        update();
      }
    };
  }]);
