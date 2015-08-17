'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:HomeCtrl
 * @description Dashboard
 * @requires $scope
 * @requires $rootScope
 **/
angular.module('com.module.core')
.filter('getItemName', function() {
  return function(input, name) {
    if(typeof (input) === 'undefined'){
      // input is empty
    }else{
      var i=0, len=input.length;
      for (; i<len; i++) {
        if (input[i].name === name) {
          return input[i];
        }
      }
    }
    return null;
  };
})
  .controller('XCtrl', function($scope, $route, $rootScope, CoreService, $modal, $http, $location, AppAuth, User, gettextCatalog) {

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


    $scope.animationsEnabled = true;

    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: val,
            sensor: false
          }
        }).then(function(response){
          return response.data.results.map(function(item){
            return item.formattedAddress;
          });
        });
      };

      var modalInstance = {};

    $scope.open = function (size) {
       modalInstance =  $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'addProgram.html',
          controllerAs:  'ProgramsCtrl as modalInstance',
          bindToController : true,
          size: size
        });
    };


  });
