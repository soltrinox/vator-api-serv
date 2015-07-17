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


    $scope.formFields2 = [{
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
    }, {
        key: 'School',
        type: 'text',
        label: 'Name',
        required: true
      },{
        "key": "Date",
        "type": "number",
        "label": "Year Completed",
        "default": 2015,
        "min": 1900,
        "max": 2020,
        "required": true
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
      }];


  //     "companyname": "",
  //  "jobtitle": "",
  //  "datestart": "",
  //  "dateend": "",
  //  "id": "objectid",
  //  "profileId": "objectid"

      $scope.formFields3 = [{
        key: "Type",
        type: "select",
        label: "Type",
        required: true,
        options: [
            {
                name: "Employee",
                value : "001"
            },
            {
                name: "Founder",
                value : "002"
            },
            {
                name: "Investor",
                value : "003"
            }
        ]
      }, {
          key: 'companyname',
          type: 'text',
          label: 'Company',
          required: true
        }, {
          key: 'datestart',
          type: 'text',
          label: 'Start Date',
          required: true
        }, {
          key: 'dateend',
          type: 'text',
          label: 'End Date',
          required: false
        },{
          key: 'jobtitle',
          type: 'text',
          label: 'Role',
          required: false
        },{
          key: 'profileId',
          type: 'hidden',
          label: gettextCatalog.getString('UUID'),
          required: true
        }];

        // Type (string, optional),
        // Value (string, optional),
        // URL (string, optional),
        // created (string, optional),
        // status (number, optional),
        // verified (boolean, optional),
        // profileId (objectid, optional)


        $scope.formFields4 = [ {
          key: "Type",
          type: "select",
          label: "Type",
          required: true,
          options: [
              {
                  name: "Email",
                  value : "001"
              },
              {
                  name: "Facebook",
                  value : "002"
              },
              {
                  name: "Twitter",
                  value : "003"
              },
              {
                  name: "GitHub",
                  value : "004"
              },
              {
                  name: "LinkedIn",
                  value : "005"
              },
              {
                  name: "Google",
                  value : "006"
              }
          ]
        },{
            key: 'Value',
            type: 'text',
            label: 'username / acct#',
            required: true
          }, {
            key: 'created',
            type: 'hidden',
            required: true
          }, {
            key: 'status',
            type: 'hidden',
            default : 1,
            required: true
          },{
            key: 'verified',
            type: 'text',
            default : false,
            required: true
          },{
            key: 'profileId',
            type: 'hidden',
            label: gettextCatalog.getString('UUID'),
            required: true
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

  $scope.delete2 = function(id) {
    ProfileService.deleteProfile(id, function() {
      $scope.profile = ProfileService.getProfile();
    });
  };

  $scope.onSubmit2 = function() {
    ProfileService.upsertProfile($scope.profile, function() {
      $scope.profiles = ProfileService.getProfiles();
      $state.go('^.view');
    });
  };

  $scope.delete3 = function(id) {
    ProfileService.deleteProfile(id, function() {
      $scope.profile = ProfileService.getProfile();
    });
  };
  $scope.onSubmit3 = function() {
    ProfileService.upsertProfile($scope.profile, function() {
      $scope.profiles = ProfileService.getProfiles();
      $state.go('^.view');
    });
  };

  $scope.delete4 = function(id) {
    ProfileService.deleteProfile(id, function() {
      $scope.profile = ProfileService.getProfile();
    });
  };
  $scope.onSubmit4 = function() {
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
