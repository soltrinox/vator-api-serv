'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:HomeCtrl
 * @description Dashboard
 * @requires $scope
 * @requires $rootScope
 **/
angular.module('com.module.core')
  .controller('XCtrl', function($scope, $route, $rootScope, CoreService, $location, User, gettextCatalog) {

    $scope.count = {};

    $scope.boxes = $rootScope.dashboardBox;

    $scope.$on('$viewContentLoaded', function(){
        if($scope.currentUser){
            // console.log('CURRENT USER' + JSON.stringify($scope.currentUser));
        }

        // $route.reload();
    });

    $scope.confirmXUpgrade = function(){

      CoreService.confirm('Join vatorX', 'Terms and policy agreement here',
        function() {
          $scope.currentUser.vatorX = 'valid';
          $scope.current = User.upsert($scope.currentUser,
          function() {
            $rootScope.isXsession = true;
            $rootScope.masterUser = $scope.currentUser;
            // $route.reload();
            CoreService.alert('Welcome to vatorX!');
            $location.path('/app/x');
          },
          function(res) {
            CoreService.toastError(gettextCatalog.getString(
              'Error registering!'), res.data.error.message);
            $scope.registerError = res.data.error;
            }
          );
        },
        function() {
          CoreService.alert('You don\'t agree!');
          $location.path('/app');
        });
    };

  });
