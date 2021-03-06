'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:HomeCtrl
 * @description Dashboard
 * @requires $scope
 * @requires $rootScope
 **/
angular.module('com.module.core')
  .controller('HomeCtrl', function($scope, $rootScope) {

    $scope.count = {};

    $scope.boxes = $rootScope.dashboardBox;

    $scope.$on('$viewContentLoaded', function(){
        if($scope.currentUser){
            console.log('CURRENT USER' + JSON.stringify($scope.currentUser));
        }
    });

  });
