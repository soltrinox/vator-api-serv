'use strict';
angular.module('com.module.core')
  .config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
    $stateProvider
      .state('router', {
        url: '/router',
        template: '<div class="lockscreen" style="height: 100%"></div>',
        controller: 'RouteCtrl'
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'modules/core/views/app.html',
        controller: 'MainCtrl'
      })
      .state('app.home', {
        url: '',
        templateUrl: 'modules/core/views/home.html',
        controller: 'HomeCtrl'
      })
      .state('app.x.confirm', {
        url: '/x/confirm',
        templateUrl: 'modules/core/views/xconfirm.html',
        controller: 'XCtrl'
      });

    $urlRouterProvider.otherwise('/router');



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

  });
