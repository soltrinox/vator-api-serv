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
    $scope.upp = false;
    $scope.boxes = $rootScope.dashboardBox;

    $scope.$on('$viewContentLoaded', function(){
        if($scope.currentUser){
            // console.log('CURRENT USER' + JSON.stringify($scope.currentUser));
        }
        var upp = $location.search().upgrade;
        if(upp === 'true'){
          $location.search('upgrade', null);
          $scope.upp = true;
          $scope.confirmXUpgrade();
          $route.reload();
        }else {
          $scope.upp = false;
        }
    });

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.confirmXUpgrade = function(){

      CoreService.confirm('Join vatorX', 'You are vatorX enterproise user. Terms and policy agreement here',
        function() {
          $scope.currentUser.vatorX = 'valid';
          $scope.current = User.upsert($scope.currentUser,
          function() {
            $rootScope.isXsession = true;
            $rootScope.masterUser = $scope.currentUser;
             $route.reload();
            CoreService.alert('Welcome to vatorX!');
            if($scope.upp){
              $scope.upp = false;
            }else{
              $scope.upp = false;
              window.location = '/#/app/x';
            }

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
