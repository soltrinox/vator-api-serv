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
  .controller('LoginCtrl', function($scope, $rootScope, $route, $state, $routeParams, $window, $location,
    CoreService, ProfileService, Profile, User, AppAuth, AuthProvider, gettextCatalog) {

    var TWO_WEEKS = 1000 * 60 * 60 * 24 * 7 * 2;
    $scope.upp = false;
    $scope.serverURL = $location.host();
    $scope.credentials = {
      ttl: TWO_WEEKS,
      rememberMe: true
    };

    if($state.current.data.entryType !== 's'){

    }else if($state.current.data.entryType !== 'x'){

    }else if($state.current.data.entryType !== 'u'){

    }else{

    }

    $scope.reloadRoute = function() {
        $window.location.reload();
        // $state.reload();
    };

    $scope.$on('$viewContentLoaded', function(){
        // console.log('RT PARAMS: ' + JSON.stringify($location.search()) );
        // var tt = $location.search().t;
        // var upp = $location.search().upgrade;
        // if(tt === 'x' ){
        //     $rootScope.isXsession  = true;
        //     console.log('IS XSESSION');
        //     $location.search('t', null);
        //     $route.reload();
        // }else{
        //   $rootScope.isXsession  = false;
        //   console.log('NOT XSESSION');
        // }
        // if(upp === 'true'){
        //   $scope.upp = true;
        // }else {
        //   $scope.upp = false;
        // }

        if($state.current.data.entryType !== 's'){

        }else if($state.current.data.entryType !== 'x'){

        }else if($state.current.data.entryType !== 'u'){

        }else{

        }

    });


    $scope.buttoncolors = ['default','primary','danger','basic', 'info'];

    if (CoreService.env.name === 'development') {
      $scope.credentials.email = 'admin@admin.com';
      $scope.credentials.password = 'domino';
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
      type: 'checkbox',
      'default': true
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
      var go = '/app/myprofile';
      var next = $location.nextAfterLogin || go;

      $scope.loginResult = User.login({
          include: 'user',
          rememberMe: $scope.credentials.rememberMe
        }, $scope.credentials,
        function(user) {
          console.log('USER LOGIN: '+JSON.stringify(user));
          // TODO: GET FULL PROFILE HERE ????

          if(!user.user.ProfilePic ||  0 === user.user.ProfilePic.length ){
            user.ProfilePic = 'https://s3.amazonaws.com/vatorprofilecache/profile.png';
          }
          if(!user.user.CoverPic ||  0 === user.user.CoverPic.length ){
            user.CoverPic = 'https://s3.amazonaws.com/vatorprofilecache/456498.jpg';
          }
          // if(user.vatorX){
          if((typeof (user.user.vatorX) !== 'undefined') && (user.user.vatorX === 'valid')){
            go = '/app/x';

            if($state.current.data.entryType === 'x'){
              console.log('VATORX USER LOG INTO VATORX');
                AppAuth.currentUser = user;
                // detect user is a
                if($location.path === 'valid'){
                  $rootScope.isXsession = true;
                  console.log('IS XSESSION');
                  CoreService.toastSuccess(gettextCatalog.getString(
                    'Welcome back to vatorX'), gettextCatalog.getString(
                    'vatorx vatorx vatorx vatorx vatorx'));
                }
                next = $location.nextAfterLogin || go;
                $scope.continue(next, go);
            }else if($state.current.data.entryType === 'u'){
              console.log('IS A VATOR.CO USER UPGRADING INTO VATORX');
                user.user.vatorX = 'valid';
                user.vatorX = 'valid';
                User.upsert(user.user,
                function(responseUser){
                  $rootScope.isXsession = true;
                  console.log('SUCCESS UPGRADED THE VATOR.CO USER TO VATORX');
                  CoreService.toastSuccess(gettextCatalog.getString(
                    'Welcome to vatorX'), gettextCatalog.getString(
                    'Basic Account has been upgraded to vatorX Enterprise!'));
                    AppAuth.currentUser = user;
                    $rootScope.masterUser = responseUser;
                    $scope.currentUser = responseUser;
                    $rootScope.isXsession = true;
                    //  TODO: SEND TO SPECIAL PLACE ?? OR POP UP MODAL MESSAGE
                    next = $location.nextAfterLogin || go;
                    $scope.continue(next, go);
                },
                function(res){
                  CoreService.toastError(gettextCatalog.getString(
                    'Error upgrading account!'), res.data.error.message);
                });
            }else{
              console.log('IS A VATORX USER LOGGING INTO VATOR.CO');
              //  TODO: SEND TO UPGRADE LOCATION
              $rootScope.isXsession = false;
              CoreService.toastSuccess(gettextCatalog.getString(
                'Welcome to back vator'), gettextCatalog.getString(
                'vator vator vator vator vator'));
                  go = '/app/myprofile';
                  next = $location.nextAfterLogin || go;
                  $scope.continue(next, go);
            }
          }else{
            console.log('IS A VATOR.CO USER LOGGING INTO VATOR.CO');
            CoreService.toastSuccess(gettextCatalog.getString(
              'Welcome to back vator'), gettextCatalog.getString(
              'vator vator vator vator vator'));
                go = '/app/myprofile';
                next = $location.nextAfterLogin || go;
                $scope.continue(next, go);
          }
        },
        function(res) {
          $scope.loginError = res.data.error;
        });
    };

    $scope.continue = function(next, go){

      console.log('AppAuth.currentUser: '+JSON.stringify(AppAuth.currentUser)); // => acess token

      if(!$rootScope.ranMenu){

            if(typeof (AppAuth.currentUser) !== 'undefined'){
              if(AppAuth.currentUser.vatorX === 'valid'){
                $rootScope.isXsession = true;
                $rootScope.siteVersion = 'vatorX';
                console.log('MENU:' + JSON.stringify($rootScope.menu));
                $rootScope.addMenu(gettextCatalog.getString('Dashboard'), 'app.x', 'fa-dashboard');
                $rootScope.addMenu(gettextCatalog.getString('Programs'), 'app.programs.list', 'fa-star');
                $rootScope.addMenu(gettextCatalog.getString('Activity'), 'app.x', 'fa-check');
                $rootScope.addMenu(gettextCatalog.getString('Company'),   'app.companies.list', 'fa-bank');
                $rootScope.addMenu(gettextCatalog.getString('Profile'), 'app.myprofile.list', 'fa-user');
              }else{
                $rootScope.isXsession = false;
                $rootScope.siteVersion = 'vator';
                $rootScope.addMenu(gettextCatalog.getString('Dashboard'), 'app.home', 'fa-dashboard');
                $rootScope.addMenu(gettextCatalog.getString('Company'), 'app.companies.list', 'fa-bank');
                $rootScope.addMenu(gettextCatalog.getString('Profile'), 'app.myprofile.list', 'fa-user');
              }
            }else{
              $rootScope.isXsession = false;
                $rootScope.siteVersion = 'vator';
                $rootScope.addMenu(gettextCatalog.getString('Dashboard'), 'app.home', 'fa-dashboard');
                $rootScope.addMenu(gettextCatalog.getString('Company'), 'app.companies.list', 'fa-bank');
                $rootScope.addMenu(gettextCatalog.getString('Profile'), 'app.myprofile.list', 'fa-user');
            }
            $rootScope.ranMenu = true;
      }
      // ???? test this out
    if (next === '/login' || next === '/loginx' || next === '/x/login') {
      next = go;
    }
    var serverURL = $location.host();
    $window.location = 'http://'+ serverURL + '/#'+ next;

  };


  });
