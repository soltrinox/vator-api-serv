'use strict';
angular.module('com.module.core')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('router', {
        url: '/router',
        template: '<div class="lockscreen" style="height: 100%"></div>',
        controller: 'RouteCtrl'
      })
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'modules/core/views/app.html',
        controller: 'MainCtrl'
      })
      .state('app.home', {
        url: '',
        templateUrl: 'modules/core/views/home.html',
        controller: 'HomeCtrl'
      })
      .state('x', {
        abstract: true,
        url: '/x',
        templateUrl: 'modules/core/views/x.html',
        controller: 'MainCtrlX'
      })
      .state('x.home', {
        url: '/x/dashboard',
        templateUrl: 'modules/core/views/xhome.html',
        controller: 'HomeCtrlX'
      });
    $urlRouterProvider.otherwise('/router');
  });
