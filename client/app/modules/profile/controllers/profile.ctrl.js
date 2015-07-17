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

  $scope.credentialsFields = [{
      key: 'name',
      label: gettextCatalog.getString('Name'),
      type: 'text',
      required: true
    }, {
      key: 'Major',
      type: 'text',
      label: 'Major', //gettextCatalog.getString('Major'),
      required: false
    },  {
      key: 'Degree',
      type: 'text',
      label: 'Degree', //gettextCatalog.getString('Degree'),
      required: true
    },{
      key: 'Date',
      required: false,
      label: 'Graduation Date', //gettextCatalog.getString('Graduation Date'),
      type: 'date',
      format: gettextCatalog.getString('dd/MM/yyyy'),
      opened: false
    }, {
    key: 'state',
    type: 'ui-select-select2',
    templateOptions: {
      label: 'Type',
      valueProp: 'abbr',
      labelProp: 'name',
      options: [
        {
          name: 'School',
          abbr: 'EDU'
        },
        {
          name: 'Organization',
          abbr: 'ORG'
        },
        {
          name: 'Military',
          abbr: 'MIL'
        },
        {
          name: 'Government',
          abbr: 'GOV'
        }
      ]
    }
  }
  ];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.addOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Add'
  };

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
