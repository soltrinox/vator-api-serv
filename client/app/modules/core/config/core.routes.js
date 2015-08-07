'use strict';
angular.module('com.module.core')
  .config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {

    // stateHelperProvider
    //         .state({
    //             name: 'router',
    //             template: '<div class="lockscreen" style="height: 100%"></div>',
    //             controller : 'RouteCtrl'
    //         })
    //         .state({
    //             name: 'app',
    //             templateUrl: 'modules/core/views/app.html',
    //             controller: 'MainCtrl',
    //             children: [ {
    //                 name: 'app.home',
    //                 url: '',
    //                 templateUrl: 'modules/core/views/home.html',
    //                 controller: 'HomeCtrl'
    //               }
    //             ]
    //         })
    //         .state({
    //             name: 'rootSibling',
    //             templateUrl: 'rootSibling.html'
    //         });
    //
    //

    $stateProvider
      .state('router', {
        url: '/router',
        template: '<div class="lockscreen" style="height: 100%"></div>',
        controller: 'RouteCtrl'
      })
      .state('app', {
        url: '/app',
        templateUrl: 'modules/core/views/app.html',
        controller: 'MainCtrl'
      })
      .state('app.home', {
        url: '',
        templateUrl: 'modules/core/views/home.html',
        controller: 'HomeCtrl'
      })
      .state('app.x', {
        url: '/app/x',
        templateUrl: 'modules/core/views/x.html',
        controller: 'MainCtrlX'
      })
      .state('app.x.dashboard', {
        url: '/app/x/dashboard',
        templateUrl: 'modules/core/views/xhome.html',
        controller: 'HomeCtrlX'
      });
    $urlRouterProvider.otherwise('/router');
  });
