'use strict';
angular.module('com.module.users')
  .config(function($routeProvider, $httpProvider) {

    // Intercept 401 responses and redirect to login screen
    $httpProvider.interceptors.push(function($q, $location,  $state, CoreService) {
      return {
        responseError: function(rejection) {
          if (rejection.status === 401) {
            //$rootScope.currentUser = null;
            // save the current location so that login can redirect back
            $location.nextAfterLogin = $location.path();
            var serverURL = $location.host();

            if (($location.path() === '/router') ||
              ($location.path() ===   '/login') ||
              ($location.path() === '/loginx') ||
              ($location.path() === '/x/login')) {
              // console.log('401 while on router on login path');
              console.log('standard login 1');
            } else {
              if (($location.path() !== '/register') || ($location.path() !== '/registerx') ||  ($location.path() !== '/x/register')) {
                if ($location.path() === '/registerx')  {
                  console.log('upgrade login');
                  window.location = 'http://'+ serverURL +'/loginx';
                }else if ($location.path() === '/x/register')  {
                  console.log('xsession login');
                  window.location = 'http://'+ serverURL +'/x/login';
                }else if ($location.path() === '/register')  {
                  console.log('standard login 3');
                  window.location = 'http://'+ serverURL +'/login';
                }else{
                  window.location = 'http://'+ serverURL +'/login';
                }
              }else{
                console.log('standard login 2');
                window.location = 'http://'+ serverURL +'/login';
              }
            }
          }
          if (rejection.status === 404) {
            console.log(rejection);
            // CoreService.toastError('Error 404 received', rejection.data
            //   .error.message);
          }
          if (rejection.status === 422) {
            console.log(rejection);
            // CoreService.toastError('Error 422 received', rejection.data
            //   .error.message);
          }
          if (rejection.status === 0) {
            window.location = '/';
            // CoreService.toastError('Connection Refused',
            //   'The connection to the API is refused. Please verify that the API is running!'
            // );
          }
          return $q.reject(rejection);
        }
      };
    });
  });
