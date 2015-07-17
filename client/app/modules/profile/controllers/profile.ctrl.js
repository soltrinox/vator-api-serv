'use strict';
var app = angular.module('com.module.profile');

app.controller('MyProfileCtrl', function($scope, $state, $stateParams, ProfileService,
  gettextCatalog) {

  $scope.formFields = [ {
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
    }];


    $scope.formFields2 = [ {
        key: 'School',
        type: 'text',
        label: 'Name',
        required: true
      }, {
        key: 'Date',
        type: 'text',
        label: 'Year Graduated',
        required: true
      }, {
        key: 'Major',
        type: 'text',
        label: 'Field/Major',
        required: false
      }, {
        key: 'URL',
        type: 'text',
        label: 'URL',
        required: false
      },{
        key: 'profileId',
        type: 'hidden',
        label: gettextCatalog.getString('UUID'),
        required: true
      },{
        key: "Degree",
        type: "select",
        label: "Type",
        required: true,
        options: [
            {
                name: "School",
                value : "EDU"
            },
            {
                name: "Military",
                value : "MIL"
            },
            {
                name: "Organization",
                value : "ORG"
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
