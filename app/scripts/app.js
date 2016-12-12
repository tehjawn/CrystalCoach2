'use strict';

/**
 * @ngdoc overview
 * @name crystalcoachApp
 * @description
 * # crystalcoachApp
 *
 * Main module of the application.
 */
angular.module('crystalcoachApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.Auth',
    'chart.js',
    'ngDialog'
  ])

  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#AADDFF', '#CC2233'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('radar', {
      showLines: false
    });
  }])