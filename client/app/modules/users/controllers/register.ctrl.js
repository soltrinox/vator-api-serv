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
  .controller('RegisterCtrl', function($scope, $rootScope,  $routeParams, $location, $filter,
    CoreService, ProfileService, Profile, User, AppAuth, gettextCatalog) {


      $scope.go = '';

    $scope.registration = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };


    $scope.$on('$viewContentLoaded', function(){
        // console.log('RT PARAMS: ' + JSON.stringify($location.search()) );
        var tt = $location.search().t;
        var nn = $location.search().n;
        if(tt === 'x'){
            $rootScope.isXsession  = true;
            console.log('IS XSESSION');
            $location.search('t', null);
            if(nn  === 'cc'){
              console.log('IS XSESSION');
               $rootScope.goLocation = '/app/programs/add';
               $location.search('n', null);
               $location.search('t', null);
            }

        }else{
          $rootScope.isXsession  = false;
          console.log('NOT XSESSION');
          if(nn === 'ss'){
            $rootScope.goLocation = '/app/products/add/55ba9286966a114937493efe';
            $location.search('n', null);
            $location.search('t', null);
          }
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

    $scope.basicConfirm = function() {
      CoreService.confirm('vatorX Terms and Policy', 'Text goes here',
        function() {
          CoreService.alert('Welcome to vatorX');
        },
        function() {
          CoreService.alert('You don\'t agree!');
        });
    };


    $scope.Agreed = false;
    $scope.go = '';

    $scope.$watch($scope.Agreed , function(oldVal,newVal){

        if(newVal){

          CoreService.confirm('This is an agreement', 'Terms and Policy here',
            function() {
                      if($rootScope.isXsession){
                        $scope.registration.vatorX = 'valid';
                      }
                      $scope.registration.username = $scope.registration.email;
                      delete $scope.registration.confirmPassword;
                      $scope.user = User.save($scope.registration,
                      function()
                      {
                      $scope.loginResult = User.login({
                          include: 'user',
                          rememberMe: true
                        }, $scope.registration,
                        function() {
                          AppAuth.currentUser = $scope.loginResult.user;
                          CoreService.toastSuccess(gettextCatalog.getString(
                            'Registered'), gettextCatalog.getString(
                            'You are registered!'));
                            CoreService.alert('Welcome to vatorX');

                            $scope.go = '/app/myprofile';
                            if($rootScope.isXsession){
                              if($rootScope.goLocation !== ''){
                               $scope.go = $rootScope.goLocation;
                                $rootScope.goLocation = '';
                              }else{
                               $scope.go = '/app/x';
                              }
                            }
                            $location.path($scope.go);
                        },
                        function(res) {
                          CoreService.toastWarning(gettextCatalog.getString(
                              'Error signin in after registration!'), res.data.error
                            .message);
                          $scope.loginError = res.data.error;
                        }
                      );

                      },
                      function(res) {
                            CoreService.toastError(gettextCatalog.getString(
                              'Error registering!'), res.data.error.message);
                            for(var message in res.data.error.details.messages){
                              console.log('REGISTER ERROR MESSAGE: \n '+JSON.stringify(message));
                              if(typeof(message.email) !== 'undefined'){
                                  if(message.email[0] === 'Email already exists'){
                                          $scope.errorEmail();

                                  }
                              }
                            }
                      }
                    );
            },
            function() {
              CoreService.alert('You don\'t agree');
              $location.path('/');
            });
        }
    });

    $scope.register = function() {
      CoreService.confirm('Register on vator', 'Terms and Policy here',
        function() {
          $scope.Agreed = true;
        },
        function() {
          $scope.Agreed = false;
          CoreService.alert('You don\'t agree');
          $location.path('/');
        });
    };


    $scope.errorEmail = function(){
          CoreService.confirm('Email Found !', 'We noticed you already have an account on Vator.co. Would you like to upgrade to VatorX Enterprise Account?',
            function() {
              $rootScope.isXsession = true;
              $location.path('/login?t=x&upgrade=true');
            },
            function(){
                $location.path('/app/myprofile');
            }
          );
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
