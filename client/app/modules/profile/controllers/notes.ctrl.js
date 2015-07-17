'use strict';
var app = angular.module('com.module.other');

app.controller('ProfileCtrl', function($scope, $state, $stateParams, ProfileService,
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
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    ProfileService.deleteProfile(id, function() {
      $scope.other = ProfileService.getProfile();
    });
  };

  $scope.onSubmit = function() {
    ProfileService.upsertProfile($scope.note, function() {
      $scope.other = ProfileService.getProfile();
      $state.go('^.list');
    });
  };

  $scope.other = ProfileService.getProfile();

  if ($stateParams.id) {
    $scope.note = ProfileService.getProfile($stateParams.id);
  } else {
    $scope.note = {};
  }

});
