'use strict';
/**
 * @ngdoc function
 * @name com.module.users.controller:RegisterCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $routeParams
 * @requires $location
 * Controller for Register Page
 **/
angular.module('com.module.users')
  .controller('RegisterCtrl', function($scope, $rootScope, $state, $window, $route, $routeParams, $location, $filter,
    CoreService, ProfileService, Profile, User, AppAuth, gettextCatalog) {


      $scope.go = '';

    $scope.registration = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    var TWO_WEEKS = 1000 * 60 * 60 * 24 * 7 * 2;
    $scope.credentials = {
      ttl: TWO_WEEKS,
      rememberMe: true
    };


    $scope.$on('$viewContentLoaded', function(){

        if($state.current.data.entryType !== 's'){

        }else if($state.current.data.entryType !== 'x'){

        }else if($state.current.data.entryType !== 'u'){

        }else{

        }
    });



    $scope.schema = [{
        label: '',
        property: 'firstName',
        placeholder: gettextCatalog.getString('First Name'),
        type: 'text',
        attr: {
          ngMinlength: 4,
          required: true
        },
        msgs: {
          minlength: gettextCatalog.getString(
            'Needs to have at least 4 characters')
        }
      }, {
        label: '',
        property: 'lastName',
        placeholder: gettextCatalog.getString('Last Name'),
        type: 'text',
        attr: {
          ngMinlength: 4,
          required: true
        },
        msgs: {
          minlength: gettextCatalog.getString(
            'Needs to have at least 4 characters')
        }
      }, {
        label: '',
        property: 'email',
        placeholder: gettextCatalog.getString('Email'),
        type: 'email',
        help: gettextCatalog.getString(
          'Don\'t worry we won\'t spam your inbox'),
        attr: {
          required: true,
          ngMinlength: 4
        },
        msgs: {
          required: gettextCatalog.getString('You need an email address'),
          email: gettextCatalog.getString('Email address needs to be valid'),
          valid: gettextCatalog.getString('Nice email address!')
        }
      },

      {
        type: 'multiple',
        fields: [{
          label: '',
          property: 'password',
          placehodler: gettextCatalog.getString('Password'),
          type: 'password',
          attr: {
            required: true,
            ngMinlength: 6
          }
        }, {
          label: '',
          property: 'confirmPassword',
          placeholder: gettextCatalog.getString('Confirm Password'),
          type: 'password',
          attr: {
            confirmPassword: 'user.password',
            required: true,
            ngMinlength: 6
          },
          msgs: {
            match: gettextCatalog.getString(
              'Your passwords need to match')
          }
        }],
        columns: 6
      }
    ];

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


    $scope.confirmPassword = '';
    $scope.Agreed = false;
    $scope.go = '';

    $scope.errorEmail = function(){
      var message = 'We noticed you already have an account on Vator.co';
      if($state.current.data.entryType === 'u'){
          message = 'We noticed you already have an account on Vator.co. Would you like to upgrade to VatorX Enterprise Account?';
      }else if($state.current.data.entryType === 'x'){
        message = 'We noticed you already have an account on Vator.co. Would you like to upgrade to VatorX Enterprise Account?';
      }else if($state.current.data.entryType === 's'){

      }else{

      }
      var serverURL = $location.host();
      CoreService.confirm('Email Found !', message,
        function() {
          if($state.current.data.entryType === 'u'){
              $window.location = 'http://'+ serverURL +'/#/loginx';
          }else if($state.current.data.entryType === 'x'){
            $window.location = 'http://'+ serverURL +'/#/loginx';
          }else if($state.current.data.entryType === 's'){
            $window.location = 'http://'+ serverURL +'/#/login';
          }else{
              $window.location = 'http://'+ serverURL +'/#/login';
          }
        },
        function(){

            $window.location = 'http://'+ serverURL + '/home.html';
        }
      );
    };

    $scope.register = function() {
      CoreService.confirm('AGree to terms', 'Terms and Policy text here',
        function() {
                  if($state.current.data.entryType === 's'){

                  }else if($state.current.data.entryType === 'x'){
                    $scope.registration.vatorX = 'valid';
                  }else if($state.current.data.entryType === 'u'){
                    $scope.registration.vatorX = 'valid';
                  }else{

                  }
                  $scope.registration.username = $scope.registration.email;
                  delete $scope.registration.confirmPassword;
                  $scope.user = User.save($scope.registration,
                  function()
                  {
                  var go = '/login';
                  var next = $location.nextAfterLogin || go;
                  var params = {};

                  if($state.current.data.entryType === 'x'){
                      AppAuth.currentUser = $scope.user;
                      // detect user is a
                      if($scope.user.user.vatorX === 'valid'){
                        AppAuth.currentUser = $scope.user;
                        AppAuth.currentUser.vatorX = 'valid';
                        $rootScope.isXsession = true;
                        console.log('IS XSESSION');
                        CoreService.alert('Welcome to vatorX');
                        CoreService.toastSuccess(gettextCatalog.getString(
                          'Welcome to vatorX'), gettextCatalog.getString(
                          'vatorx vatorx vatorx vatorx vatorx'));
                          go = 'loginx';
                          params = { entryType : 'x'};
                          $scope.continue(next, go, params);
                      }else{
                        AppAuth.currentUser.vatorX = 'null';
                        $rootScope.isXsession = false;
                        go = 'loginxx';
                        params = { entryType : 'u'};
                        $scope.continue(next, go, params);
                      }


                  }else if($state.current.data.entryType === 'u'){

                      User.upsert($scope.user.user,
                      function(responseUser){
                        CoreService.alert('Welcome to vatorX');
                        CoreService.toastSuccess(gettextCatalog.getString(
                          'Welcome to vatorX'), gettextCatalog.getString(
                          'Basic Account has been upgraded to vatorX Enterprise!'));
                          AppAuth.currentUser = responseUser;
                          AppAuth.currentUser.vatorX = 'valid';
                          $rootScope.isXsession = true;
                          go = 'loginx';
                          params = { entryType : 'x'};
                          $scope.continue(next, go, params);
                      },
                      function(res){
                        CoreService.toastError(gettextCatalog.getString(
                          'Error upgrading account!'), res.data.error.message);
                      });
                  }else{
                    AppAuth.currentUser = $scope.user;
                    AppAuth.currentUser.vatorX = 'valid';
                    $rootScope.isXsession = false;
                    CoreService.alert('Welcome to vator.co');
                    CoreService.toastSuccess(gettextCatalog.getString(
                      'Welcome to vator'), gettextCatalog.getString(
                      'vator vator vator vator vator'));
                      go = 'login';
                      params = { entryType : 's'};
                      $scope.continue(next, go, params);
                  }
              },
              function(res) {
                    CoreService.toastError(gettextCatalog.getString(
                      'Error registering!'), res.data.error.message);
                    for(var message in res.data.error.details.messages){
                      console.log('REGISTER ERROR MESSAGE: \n '+JSON.stringify(message));
                      if(message === 'email'){
                        $scope.errorEmail();
                      }
                    }
              }
            );
        },
        function() {
          CoreService.alert('You don\'t agree');
          $location.path('/');
        });
    };

    $rootScope.ranMenu = false;

    $scope.continue = function(next, go, params){

      console.log('AppAuth.currentUser: '+JSON.stringify(AppAuth.currentUser)); // => acess token

      if(!$rootScope.ranMenu){
        // if(typeof (AppAuth.currentUser) !== 'undefined'){
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
        // }else{
        //   $rootScope.isXsession = false;
        //     $rootScope.siteVersion = 'vator';
        //     $rootScope.addMenu(gettextCatalog.getString('Dashboard'), 'app.home', 'fa-dashboard');
        //     $rootScope.addMenu(gettextCatalog.getString('Company'), 'app.companies.list', 'fa-bank');
        //     $rootScope.addMenu(gettextCatalog.getString('Profile'), 'app.myprofile.list', 'fa-user');
        // }
            $rootScope.ranMenu = true;
      }

      // ???? test this
      if (next === '/login' || next === '/loginx' || next === '/x/login') {
        next = go;
      }
      // var serverURL = $location.host();
      // $window.location = 'http://'+ serverURL + '/#'+ next;
      $state.go(go, params, {reload: true});
  };

  })
  .directive('confirmPassword',
    function() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          var validate = function(viewValue) {
            var password = scope.$eval(attrs.confirmPassword);
            ngModel.$setValidity('match', ngModel.$isEmpty(viewValue) ||
              viewValue === password);
            return viewValue;
          };
          ngModel.$parsers.push(validate);
          scope.$watch(attrs.confirmPassword, function() {
            validate(ngModel.$viewValue);
          });
        }
      };
    }
  );
