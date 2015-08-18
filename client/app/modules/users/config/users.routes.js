'use strict';
angular.module('com.module.users')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<login></login>',
        data: {
           entryType : 's'
        },
        controller: 'LoginCtrl'
      })
      .state('loginx', {
        url: '/x/login',
        template: '<login></login>',
        data: {
           entryType : 'x'
        },
        controller: 'LoginCtrl'
      })
      .state('loginxx', {
        url: '/loginx',
        template: '<login></login>',
        data: {
           entryType : 'u'
        },
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        template: '<register></register>',
        data: {
           entryType : 's'
        },
        controller: 'RegisterCtrl'
      })
      .state('registerj', {
        url: '/register-judge',
        template: '<register></register>',
        data: {
           entryType : 'j'
        },
        controller: 'RegisterCtrl'
      })
      .state('registert', {
        url: '/register-team',
        template: '<register></register>',
        data: {
           entryType : 't'
        },
        controller: 'RegisterCtrl'
      })
      .state('registerxx', {
        url: '/registerx',
        template: '<register></register>',
        data: {
           entryType : 'u'
        },
        controller: 'RegisterCtrl'
      })
      .state('registerx', {
        url: '/x/register',
        data: {
           entryType : 'x'
        },
        template: '<register></register>',
        controller: 'RegisterCtrl'
      })
      .state('app.users', {
        abstract: true,
        url: '/users',
        templateUrl: 'modules/users/views/main.html'
      })
      .state('app.users.profile', {
        url: '/profile',
        templateUrl: 'modules/users/views/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('app.users.list', {
        url: '',
        templateUrl: 'modules/users/views/list.html',
        controller: 'UsersCtrl',
        authenticate: true
      })
      .state('app.users.add', {
        url: '/add',
        templateUrl: 'modules/users/views/form.html',
        controller: 'UsersCtrl',
        authenticate: true
      })
      .state('app.users.edit', {
        url: '/edit/:id',
        templateUrl: 'modules/users/views/form.html',
        controller: 'UsersCtrl',
        authenticate: true
      })
      .state('app.users.view', {
        url: '/view/:id',
        templateUrl: 'modules/users/views/view.html',
        controller: 'UsersCtrl',
        authenticate: false
      })
      .state('app.users.delete', {
        url: '/delete/:id',
        controller: 'UsersCtrl',
        authenticate: true
      });
      // x
  });
