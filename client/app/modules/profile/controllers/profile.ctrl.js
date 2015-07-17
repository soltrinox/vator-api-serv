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


  formlyConfig.setType({
  name: 'ui-select-select2',
  extends: 'ui-select',
  template: '<ui-select ng-model="model[options.key]" theme="select2" ng-required="{{to.required}}" ng-disabled="{{to.disabled}}" reset-search-input="false"> <ui-select-match placeholder="{{to.placeholder}}"> {{$select.selected[to.labelProp || \'name\']}} </ui-select-match> <ui-select-choices group-by="to.groupBy" repeat="option[to.valueProp || \'value\'] as option in to.options | filter: $select.search"> <div ng-bind-html="option[to.labelProp || \'name\'] | highlight: $select.search"></div> </ui-select-choices> </ui-select>'
});

var typelist=  [
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
 ];

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
        key: 'Type',
        type: 'ui-select-select2',
        templateOptions: {
          label: 'Type',
          valueProp: 'abbr',
          labelProp: 'name',
          options: typelist
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
