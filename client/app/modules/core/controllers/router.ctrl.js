'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:RouteCtrl
 * @description Redirect for acess
 * @requires $q
 * @requires $scope
 * @requires $state
 * @requires $location
 * @requires AppAuth
 **/
angular.module('com.module.core')
  .controller('RouteCtrl', function($q, $scope, $rootScope, $state, $location, AppAuth) {

    // is the user logged in ?
    if (!AppAuth.currentUser) {
      console.log('Redirect to login');
      $location.path('/login');
    } else if($rootScope.isXsession){
    //  console.log('CURRENT USER' + JSON.stringify(AppAuth.currentUser));

      console.log('Redirect to vatorX');
      $location.path('/x');
    } else {
    //  console.log('CURRENT USER' + JSON.stringify(AppAuth.currentUser));

      console.log('Redirect to vator.co');
      $location.path('/app');
    }
  });
