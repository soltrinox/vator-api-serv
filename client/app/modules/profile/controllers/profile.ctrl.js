'use strict';
var app = angular.module('com.module.profile');

app.controller('MyProfileCtrl', ['WorkHistoryService','ProfileService', 'WorkHistoryService', 'EducationService', 'SocialService', function($scope, $state, $stateParams,
  ProfileService, WorkHistoryService, EducationService, SocialService,
  gettextCatalog) {


    $scope.SchoolRecord = {};
    $scope.SocialRecord = {};
    $scope.WorkRecord = {};
    $scope.MediaRecord = {};
    $scope.CompanyRecord = {};


    $scope.sliceProfile = function (){

        $scope.profiles = ProfileService.getProfiles();
        $scope.educations = $scope.profiles.edu;        // ---------
        $scope.portfolio = $scope.profiles.companies ;  // ---------
        $scope.medias = $scope.profiles.medias ;        // ---------
        $scope.workhistory = $scope.profiles.work ;     // ---------
        $scope.social = $scope.profiles.social ;        // ---------
        $scope.credentials = $scope.profiles.creds ;    // ---------
        $scope.contacts = $scope.profiles.contact ;      // ---------
        // $scope. = $scope.profiles. ;

    };

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

      $scope.formFields3 = [
        {
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
        }
      ];

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
      $scope.profile = ProfileService.getProfile(id);
    });
  };

  $scope.onSubmit = function() {
    ProfileService.upsertProfile($scope.profile, function() {
      $scope.profile = ProfileService.getProfile();
      $state.go('^.view');
    });
  };

  $scope.delete2 = function(id) {
    EducationService.deleteEducation(id, function() {
      $scope.profile = ProfileService.getProfile($scope.profile.id);
    });
  };

  $scope.onSubmit2 = function() {
    EducationService.upsertEducation($scope.SchoolRecord, function() {
      $scope.profile = ProfileService.getProfile($scope.profile.id);
      $state.go('^.view');
    });
  };

  $scope.delete3 = function(id) {
    WorkHistoryService.deleteWorkHistory(id, function() {
      $scope.profile = ProfileService.getProfile($scope.profile.id);
    });
  };

  $scope.onSubmit3 = function() {
    WorkHistoryService.upsertWorkHistory($scope.WorkRecord, function() {
      $scope.profile = ProfileService.getProfile($scope.profile.id);
      $state.go('^.view');
    });
  };

  $scope.delete4 = function(id) {
    EducationService.deleteEducation(id, function() {
      $scope.profile = ProfileService.getProfile($scope.profile.id);
    });
  };
  $scope.onSubmit4 = function() {
    EducationService.upsertEducation($scope.SocialRecord, function() {
      $scope.profiles = ProfileService.getProfile($scope.profile.id);
      $state.go('^.view');
    });
  };

// declared now








  if ($stateParams.id) {
    $scope.profile = ProfileService.getProfile($stateParams.id);
  } else {
    $scope.profile = {};
  }

}]);
