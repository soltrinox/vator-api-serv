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
  .controller('RegisterCtrl', function($scope, $rootScope, $routeParams, $location, $filter,
    CoreService, ProfileService, Profile, User, AppAuth, gettextCatalog) {

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

    $scope.register = function() {

      $scope.registration.username = $scope.registration.email;
      delete $scope.registration.confirmPassword;
      $scope.user = User.save($scope.registration,
        function() {

          $scope.loginResult = User.login({
              include: 'user',
              rememberMe: true
            }, $scope.registration,
            function() {
              AppAuth.currentUser = $scope.loginResult.user;

              // TODO: set default user profilePic
              // https://s3.amazonaws.com/vatorprofilecache/profile.png

              CoreService.toastSuccess(gettextCatalog.getString(
                'Registered'), gettextCatalog.getString(
                'You are registered!'));

                var go = '/app/myprofile';
                if($rootScope.isXsession){
                  if($rootScope.goLocation !== ''){
                    go = $rootScope.goLocation;
                    $rootScope.goLocation = '';
                  }else{
                    go = '/app/x';
                  }
                }
                $location.path(go);

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
          $scope.registerError = res.data.error;
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
