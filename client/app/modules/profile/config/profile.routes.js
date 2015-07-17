'use strict';
var app = angular.module('com.module.profile');

app.config(function($stateProvider) {
  $stateProvider.state('app.profile', {
    abstract: true,
    url: '/profile',
    templateUrl: 'modules/profile/views/main.html'
  }).state('app.profile.list', {
    url: '',
    templateUrl: 'modules/profile/views/list.html',
    controller: 'ProfileCtrl'
  }).state('app.profile.add', {
    url: '/add',
    templateUrl: 'modules/profile/views/form.html',
    controller: 'ProfileCtrl'
  }).state('app.profile.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/profile/views/form.html',
    controller: 'ProfileCtrl'
  }).state('app.profile.view', {
    url: '/:id',
    templateUrl: 'modules/profile/views/view.html',
    controller: 'ProfileCtrl'
  });
});
