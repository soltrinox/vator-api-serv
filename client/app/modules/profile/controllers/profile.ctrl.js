'use strict';
var app = angular.module('com.module.profile');

app.controller('MyProfileCtrl', function($scope, $state, $stateParams, ProfileService,
  gettextCatalog) {

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
    label: gettextCatalog.getString('UUID'),
    required: true
  },
{
        key: "Type",
        type: "select",
        label: "How do you get around in the city",
        options: [
            {
                name: "Car"
            },
            {
                name: "Helicopter"
            },
            {
                name: "Sport Utility Vehicle"
            }
        ]
    }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    ProfileService.deleteProfile(id, function() {
      $scope.profile = ProfileService.getProfile();
    });
  };

  $scope.onSubmit = function() {
    ProfileService.upsertProfile($scope.profile, function() {
      $scope.profiles = ProfileService.getProfiles();
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
