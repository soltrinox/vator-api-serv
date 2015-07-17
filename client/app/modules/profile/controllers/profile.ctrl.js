'use strict';
var app = angular.module('com.module.profile', ['formly', 'formlyBootstrap']);

app.controller('MyProfileCtrl', function($scope, $state, $stateParams, User, ProfileService) {

    $scope.pid = $stateParams.id;
    console.log('PID: '+$scope.pid);

    var vm = this;
        // funcation assignment
        vm.onSubmit = onSubmit;

        // variable assignment
        vm.author = { // optionally fill in your info below :-)
          name: 'Kent C. Dodds',
          url: 'https://twitter.com/kentcdodds'
        };
        vm.exampleTitle = 'Default Value'; // add this
        vm.env = {
          angularVersion: angular.version.full,
          formlyVersion: formlyVersion
        };

        vm.model = {
          lastName: 'Smith'
        };
        vm.options = {};

        vm.fields = [
          {
            key: 'firstName',
            type: 'input',
            defaultValue: 'This is a default value',
            templateOptions: {
              label: 'First Name (initialized via default value)'
            }
          },
          {
            key: 'lastName',
            type: 'input',
            defaultValue: 'This is a default value',
            templateOptions: {
              label: 'Last Name (initialized via the model)'
            }
          },
          {
            key: 'candy',
            type: 'select',
            defaultValue: 'milky_way',
            templateOptions: {
              label: 'Favorite Candy (initialized via default value',
              options: [
                {name: 'Snickers', value: 'snickers'},
                {name: 'Baby Ruth', value: 'baby_ruth'},
                {name: 'Milky Way', value: 'milky_way'}
              ]
            }
          },
          {
            key: 'agree',
            type: 'checkbox',
            templateOptions: {
              label: 'Agree? (not initialized at all)',
              required: true
            }
          }
        ];

        vm.originalFields = angular.copy(vm.fields);


        // function definition
        function onSubmit() {
          vm.options.updateInitialValue();
          alert(JSON.stringify(vm.model), null, 2);
        }
      });


  $scope.delete = function(id) {
    ProfileService.deleteProfile(id, function() {
      $scope.profiles = ProfileService.getProfiles();
      $state.go('^.list');
    });
  };

  $scope.onSubmit = function() {
    ProfileService.upsertProfile($scope.profile, function() {
      $scope.profiles = ProfileService.getProfiles();
      $state.go('^.view');
    });
  };

  $scope.onCredSubmit = function() {
    ProfileService.upsertEducation($scope.profile, function() {
      // this returns the whole object
      $scope.profiles = ProfileService.getProfile($stateParams.id);
      // send us to the view page and look at our profile
      $state.go('^.view');
    });
  };

  $scope.profiles = ProfileService.getProfiles();

  if ($stateParams.id) {
    $scope.profile = ProfileService.getProfile($stateParams.id);
  } else {
    $scope.profile = {};
  }

});
