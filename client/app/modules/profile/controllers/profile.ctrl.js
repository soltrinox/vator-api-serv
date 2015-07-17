'use strict';
var app = angular.module('com.module.profile');

app.controller('MyProfileCtrl', function($scope, $state, $stateParams, User, ProfileService,
  gettextCatalog) {

    $scope.pid = $stateParams.id;

  $scope.formFields = [{
    key: 'Name',
    type: 'text',
    label: gettextCatalog.getString('Name'),
    required: true
  }, {
    key: 'Bio',
    type: 'textarea',
    label: gettextCatalog.getString('Bio'),
    required: true
  }, {
    key: 'UUID',
    type: 'hidden',
    defaultValue: $scope.pid ,
    label: gettextCatalog.getString('UUID'),
    required: true
  }];


  $scope.credentialsFields =
[
{
className: 'col-xs-12',
type: 'input',
key: 'Entity',
templateOptions: {
type: '',
label: 'Entity',
required: false,
placeholder: 'Entity',
description: '',
options: []
}
},
{
className: 'col-xs-12',
type: 'select',
key: 'TypeCred',
templateOptions: {
type: '',
label: '',
required: false,
placeholder: '',
description: '',
options: [
  {
    name: 'No1',
    value: 0,
    group: ''
  },
  {
    name: 'no2',
    value: 1,
    group: ''
  }
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
