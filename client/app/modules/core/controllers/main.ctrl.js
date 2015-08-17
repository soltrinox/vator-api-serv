'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:MainCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $state
 * @requires $location
 * @requires CoreService
 * @requires AppAuth
 * @requires User
 * @requires gettextCatalog
 **/
angular.module('com.module.core')
  .controller('MainCtrl', function($scope, $rootScope, $state, $location,
    CoreService, User, gettextCatalog, AppAuth) {

    $scope.AppName = $rootScope.siteVersion;
    $scope.currentUser = User.getCurrent();
    $rootScope.masterUser = $scope.currentUser;
    $scope.menuoptions = $rootScope.menu;

    $scope.logout = function() {
      User.logout(function() {
        $rootScope.isXsession = false;
        $rootScope.ranMenu = false;
        $rootScope.masterUser = null;
        $scope.currentUser = null;
        $rootScope.menu = null;
        $state.go('login');
        CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
          gettextCatalog.getString('You are logged out!'));
      });
      $rootScope.isXsession = false;
      $rootScope.ranMenu = false;
      $rootScope.masterUser = null;
      $rootScope.menu = null;
      $scope.currentUser = null;
      $state.go('login');
      CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
        gettextCatalog.getString('You are logged out!'));
    };

    $scope.saveCurrentUser = function(user){
      // console.log('USER OBJECT SAVE: ' + JSON.stringify($scope.currentUser) );
      $scope.currentUser = user;
      User.upsert($scope.currentUser, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'upsert saved'), gettextCatalog.getString(
          'Enjoy the new you!'));
          $rootScope.masterUser = $scope.currentUser;
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving USER'), gettextCatalog.getString(
          'Your USER is not saved: ') + err);
      });
      user = null;
    };

    $scope.$on('$viewContentLoaded', function(){
        $scope.AppName = $rootScope.siteVersion;
    });

  });
