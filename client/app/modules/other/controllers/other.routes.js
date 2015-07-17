'use strict';
angular.module('com.module.other')
  .config(function($stateProvider) {
    $stateProvider
      .state('app.other', {
        abstract: true,
        url: '/other',
        templateUrl: 'modules/other/views/main.html'
      })
      .state('app.other.index', {
        url: '',
        templateUrl: 'modules/other/views/other.html',
        controller: 'OtherCtrl'
      });
  });
