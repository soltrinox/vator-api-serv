'use strict';
/**
 * @ngdoc function
 * @name com.module.users.controller:LoginCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $routeParams
 * @requires $location
 * Contrller for Login Page
 **/
angular.module('com.module.users')
  .controller('LoginCtrl', function($scope, $routeParams, $location,
    CoreService, ProfileService, Profile, User, AppAuth, AuthProvider, gettextCatalog) {

    var TWO_WEEKS = 1000 * 60 * 60 * 24 * 7 * 2;

    $scope.credentials = {
      ttl: TWO_WEEKS,
      rememberMe: true
    };

    $scope.buttoncolors = ['default','primary','danger','basic', 'info'];

    if (CoreService.env.name === 'development') {
      $scope.credentials.email = 'admin@admin.com';
      $scope.credentials.password = 'xxxxxx';
    }

    $scope.schema = [{
      label: '',
      property: 'email',
      placeholder: gettextCatalog.getString('Email'),
      type: 'email',
      attr: {
        required: true,
        ngMinlength: 4
      },
      msgs: {
        required: gettextCatalog.getString('You need an email address'),
        email: gettextCatalog.getString('Email address needs to be valid'),
        valid: gettextCatalog.getString('Nice email address!')
      }
    }, {
      label: '',
      property: 'password',
      placehodler: gettextCatalog.getString('Password'),
      type: 'password',
      attr: {
        required: true
      }
    }, {
      property: 'rememberMe',
      label: gettextCatalog.getString('Stay signed in'),
      type: 'checkbox'
    }];

    $scope.options = {
      validation: {
        enabled: true,
        showMessages: false
      },
      layout: {
        type: 'basic',
        labelSize: 3,
        inputSize: 9
      }
    };

    $scope.socialLogin = function(provider) {
      window.location = CoreService.env.siteUrl + provider.authPath;
    };

    $scope.authProviders = [];

    AuthProvider.count(function(result) {
      if (result.count > 0) {
        AuthProvider.find(function(result) {
          $scope.authProviders = result;
          $scope.authProviders.slice(0, 3);
        });
      }
    });

    $scope.login = function() {


      $scope.loginResult = User.login({
          include: 'user',
          rememberMe: $scope.credentials.rememberMe
        }, $scope.credentials,
        function(user) {

          console.log('USER LOGIN: '+JSON.stringify(user)); // => acess token

          // TODO: set default user profilePic
          // https://s3.amazonaws.com/vatorprofilecache/profile.png

          var go = '/app/myprofile';
          var next = $location.nextAfterLogin || go;

          $location.nextAfterLogin = null;

          AppAuth.currentUser = $scope.loginResult.user;
          CoreService.toastSuccess(gettextCatalog.getString('Logged in'),
            gettextCatalog.getString('You are logged in!'));

          if (next === '/login') {
            next = go;
          }

          $location.path(next);

        },
        function(res) {
          $scope.loginError = res.data.error;
        });


    };


  });
