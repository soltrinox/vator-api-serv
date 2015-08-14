'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:HomeCtrl
 * @description Dashboard
 * @requires $scope
 * @requires $rootScope
 **/
angular.module('com.module.core')
  .controller('XCtrl', function($scope, $route, $rootScope, CoreService, User, gettextCatalog) {

    $scope.count = {};

    $scope.boxes = $rootScope.dashboardBox;

    $scope.$on('$viewContentLoaded', function(){
        if($scope.currentUser){
            // console.log('CURRENT USER' + JSON.stringify($scope.currentUser));
        }

        // $route.reload();
    });

    $scope.confirmXUpgrade = function(){

      CoreService.confirm('This is an agreement', 'So do you agree?',
        function() {
          $scope.currentUser.vatorX = 'valid';
          $scope.currentUser = User.save($scope.currentUser,
          function() {
            $rootScope.isXsession = true;
            $rootScope.masterUser = $scope.currentUser;
            CoreService.alert('You agree!');
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
        });
    };

  });
