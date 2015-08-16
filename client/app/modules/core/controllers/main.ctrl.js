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

      console.log('MAIN XSESS:' + $rootScope.isXsession);

  	// AppAuth.ensureHasCurrentUser(function(user)
    //   {
        $scope.currentUser = User.getCurrent();
        $rootScope.masterUser = $scope.currentUser;
  	// });

    $scope.menuoptions = $rootScope.menu;

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

var ranMenu = false;

    $scope.$on('$viewContentLoaded', function(){

        if(!ranMenu){
            console.log('CURRENT USER' + JSON.stringify($scope.currentUser));
            $rootScope.addMenu(gettextCatalog.getString('vatorCO'), 'app.home',
              'fa-dashboard');

              if($rootScope.isXsession){
                console.log('MENU:' + JSON.stringify($rootScope.menu));
                $rootScope.addMenu(gettextCatalog.getString('vatorX'), 'app.x',
                  'fa-dashboard');
              }else{
              }

              $rootScope.addMenu(gettextCatalog.getString('Programs'), 'app.programs.list',
                'fa-star');
              $rootScope.addMenu(gettextCatalog.getString('Company'),
                  'app.products.list', 'fa-bank');
              $rootScope.addMenu(gettextCatalog.getString('Profile'), 'app.myprofile.list',
                    'fa-user');
                    ranMenu = true;
        }
    });

  });
