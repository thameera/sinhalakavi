(function() {
  'use strict';

  var app = angular.module('kaviApp', ['ui.router']);

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider
    .state('/', {
      url: '/',
      templateUrl: '/views/index',
      controller: 'mainCtrl'
    });

    $urlRouterProvider.otherwise('/');
  }]);

})();

