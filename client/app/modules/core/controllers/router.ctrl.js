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
  .controller('RouteCtrl', function($q, $scope, $rootScope, $state, $location, ApiService, AppAuth) {

    ApiService.checkConnection()
     .then(function() {
       console.log('ApiService.checkConnection success');
       if (!AppAuth.currentUser) {
         $location.path('/login');
       } else {
        //  if($rootScope.isXsession){
        //    console.log('Redirect to vatorX');
        //    $location.path('/app/x');
        //  }else{
        //    console.log('Redirect to vator.co');
        //    $location.path('/app');
        //  }
         if($state.current.data.entryType !== 's'){
           $location.path('/app/myprofile');
         }else if($state.current.data.entryType !== 'x'){
           $location.path('/app/x');
         }else if($state.current.data.entryType !== 'u'){
           $location.path('/app/x');
         }else{
           $location.path('/app/myprofile');
         }
       }
     })
     .catch(function(err) {
       console.log('ApiService.checkConnection err: ' + err);
       $location.path('/error');
     });


  });
