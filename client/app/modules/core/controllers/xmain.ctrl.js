'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:xMainCtrl
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
  .controller('xMainCtrl', function($scope, $rootScope, $state, $location,
    CoreService, User, gettextCatalog, AppAuth) {


    	AppAuth.ensureHasCurrentUser(function(user)
        {
          $scope.currentUser = user;
          $rootScope.masterUser = $scope.currentUser;
    	   });

    $scope.menuoptions = $rootScope.menu;


    if($scope.currentUser){
      console.log('CURRENT USER' + JSON.stringify($scope.currentUser));
    }


    $scope.logout = function() {
      User.logout(function() {
        $state.go('login');
        CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
          gettextCatalog.getString('You are logged out!'));
      });
      $state.go('login');
      CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
        gettextCatalog.getString('You are logged out!'));
    };

    $scope.saveCurrentUser = function(user){
      console.log('USER OBJECT SAVE: ' + JSON.stringify($scope.currentUser) );
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

  });
