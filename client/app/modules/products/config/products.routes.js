'use strict';
angular.module('com.module.products')
  .config(function($stateProvider) {
    $stateProvider
      .state('app.companies', {
        abstract: true,
        url: '/products',
        templateUrl: 'modules/products/views/main.html'
      })
      .state('app.companies.list', {
        url: '',
        templateUrl: 'modules/products/views/list.html',
        controller: 'ProductsCtrl'
      })
      .state('app.companies.add', {
        url: '/add/:categoryId',
        templateUrl: 'modules/products/views/form.html',
        controller: 'ProductsCtrl'
      })
      .state('app.companies.edit', {
        url: '/:id/edit',
        templateUrl: 'modules/products/views/form.html',
        controller: 'ProductsCtrl'
      })
      .state('app.companies.addcategory', {
        url: '/addcategory',
        templateUrl: 'modules/products/views/categoryform.html',
        controller: 'CategoriesCtrl'
      })
      .state('app.companies.view', {
        url: '/:id',
        templateUrl: 'modules/products/views/view.html',
        controller: 'ProductsCtrl'
      })
      .state('app.companies.editcategory', {
        url: '/editcategory/:categoryId',
        templateUrl: 'modules/products/views/categoryform.html',
        controller: 'CategoriesCtrl'
      });
  });
