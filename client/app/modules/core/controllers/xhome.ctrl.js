'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:HomeCtrl
 * @description Dashboard
 * @requires $scope
 * @requires $rootScope
 **/
angular.module('com.module.core')
  .controller('XCtrl', function($scope, $route, $rootScope, CoreService, $location, AppAuth, User, gettextCatalog) {

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
        }else {
          $scope.upp = false;
        }
    });

    $scope.closeAlert = function() {
        $scope.upp = false;
    };

    $scope.confirmXUpgrade = function(){

      CoreService.confirm('Join vatorX', 'You are vatorX enterproise user. Terms and policy agreement here',
        function() {
          $scope.currentUser.vatorX = 'valid';
          $scope.current = User.upsert($scope.currentUser,
          function() {
            $rootScope.isXsession = true;
            $rootScope.masterUser = $scope.current;
            $scope.currentUser = $scope.current;
            AppAuth.currentUser = $scope.current;

            if($scope.upp){

            }else{
              $scope.upp = false;
              window.location = '/#/app/x';
              //$route.reload();
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
