'use strict';
var app = angular.module('com.module.profile');

app.controller('MyProfileCtrl', function($scope, $state, $stateParams, User, ProfileService,
  gettextCatalog) {

    $scope.pid = $stateParams.id;

  $scope.formFields = [{
    key: 'Name',
    type: 'text'

  }, {
    key: 'Bio',
    type: 'textarea'

  }, {
    key: 'UUID',
    type: 'hidden',
    value: $scope.pid
  }];


  $scope.credentialsFields =
[
  {
          key: 'School',
          type: 'input',
          defaultValue: 'Entity',
        },
        {
          key: 'Major',
          type: 'select',
          templateOptions: {
            label: 'Type',
            options: [
              {name: 'School', value: '123'},
              {name: 'Org', value: '456'},
              {name: 'Mil', value: '789'}
            ]
          }
        }
];





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
