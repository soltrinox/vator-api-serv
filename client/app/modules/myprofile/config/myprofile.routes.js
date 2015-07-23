'use strict';
var app = angular.module('com.module.myprofile');

app.config(function($stateProvider) {
  $stateProvider.state('app.myprofile', {
    abstract: true,
    url: '/myprofile',
    templateUrl: 'modules/myprofile/views/main.html'
  }).state('app.myprofile.list', {
    url: '',
    templateUrl: 'modules/myprofile/views/list.html',
    controller: 'MyProfileCtrl'
  }).state('app.myprofile.add', {
    url: '/add',
    templateUrl: 'modules/myprofile/views/form.html',
    controller: 'MyProfileCtrl'
  }).state('app.myprofile.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/myprofile/views/form.html',
    controller: 'MyProfileCtrl'
  }).state('app.myprofile.view', {
    url: '/:id',
    templateUrl: 'modules/myprofile/views/view.html',
    controller: 'MyProfileCtrl'
  });
});
