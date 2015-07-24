'use strict';
var app = angular.module('com.module.profile');

app.controller('MyProfileCtrl',function($scope, $location, $state, $stateParams,
  ProfileService, gettextCatalog) {




    $scope.SchoolRecord = {};
    $scope.SocialRecord = {
      Type : '',
      Value : '',
      URL : '',
      created : '',
      status : 1,
      verified : false,
      profileId : ''
    };
    $scope.WorkRecord = {
      companyname: '',
      jobtitle : '',
      datestart : '',
      dateend : '',
      profileId : ''
    };
    $scope.MediaRecord = {};
    $scope.CompanyRecord = {
      Name: '',
      URL: ''
    };
    $scope.MyProfile = {};
    $scope.SelectedProfile = {};
    $scope.profiles = {};

    $scope.educations = [];        // ---------
    $scope.portfolio = [];  // ---------
    $scope.medias = [] ;        // ---------
    $scope.workhistory = [] ;     // ---------
    $scope.socials = [] ;        // ---------
    $scope.credentials = [] ;    // ---------
    $scope.contacts = [] ;

    $scope.sliceProfile = function (pro){
      // console.log('inProfile' + pro.user.id);
      if(pro){
        $scope.educations = pro.edu;        // ---------
        $scope.portfolio = pro.companies ;  // ---------
        $scope.medias = pro.medias ;        // ---------
        $scope.workhistory = pro.work ;     // ---------
        $scope.socials = pro.social ;        // ---------
        $scope.credentials = pro.creds ;    // ---------
        $scope.contacts = pro.contact ;      // ---------
        // $scope. = $scope.profiles. ;
      }else{
        console.log('missing profile for slice');
      }
    };

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: 'Save'
    };

  $scope.formFields = [ {
      key: 'Name',
      type: 'text',
      label: gettextCatalog.getString('Name'),
      id : 'user.name',
      required: true
    }, {
      key: 'Bio',
      type: 'textarea',
      label: gettextCatalog.getString('Bio'),
      lines : 4,
      id : 'user.bio',
      required: true
    }, {
      key: 'UUID',
      type: 'hidden',
      label: '',
      id : 'user.uuid',
      required: true
    }, {
      key: 'ProfilePic',
      type: 'text',
      label: 'Profile Pic URL',
      id : 'user.profilepic',
      required: false
    }, {
      key: 'CoverPic',
      type: 'text',
      label: 'Cover Pic URL',
      id : 'user.coverpic',
      required: false
    }


  ];


    $scope.formFields2 = [{
      key: 'Degree',
      type: 'select',
      label: 'Type',
      required: true,
      options: [
          {
              name: 'School',
              value : 'EDU'
          },
          {
              name: 'Military',
              value : 'MIL'
          },
          {
              name: 'Organization',
              value : 'ORG'
          }
      ]
    }, {
        key: 'School',
        type: 'text',
        label: 'Name',
        required: true
      },{
        key: 'Date',
        type: 'number',
        label: 'Year Completed',
        default: 2015,
        min: 1900,
        max: 2020,
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
      }];

      $scope.formFields3 =
        [
            {
              key: 'Type',
              type: 'select',
              label: 'Type',
              required: true,
              options:
              [
                  {
                      name: 'Employee',
                      value : '001'
                  },
                  {
                      name: 'Founder',
                      value : '002'
                  },
                  {
                      name: 'Investor',
                      value : '003'
                  },
                  {
                      name: 'Advisor',
                      value : '004'
                  },
                  {
                      name: 'Board Member',
                      value : '005'
                  }
              ]
            },
            {
                key: 'companyname',
                type: 'text',
                label: 'Company',
                required: true
              }, {
                key: 'datestart',
                type: 'date',
                label: 'Start Date',
                required: true
              }, {
                key: 'dateend',
                type: 'date',
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


        $scope.formFields4 =
        [
            {
            key: 'Type',
            type: 'select',
            label: 'Type',
            required: true,
            options:
            [
                {
                    name: 'Email',
                    value : '001'
                },
                {
                    name: 'Facebook',
                    value : '002'
                },
                {
                    name: 'Twitter',
                    value : '003'
                },
                {
                    name: 'GitHub',
                    value : '004'
                },
                {
                    name: 'LinkedIn',
                    value : '005'
                },
                {
                    name: 'Google',
                    value : '006'
                }
            ]
            },{
              key: 'Value',
              type: 'text',
              label: 'username / acct#',
              required: true
            },{
              key: 'URL',
              type: 'text',
              label: 'Link',
              required: true
            },
            {
              key: 'created',
              type: 'hidden',
              default : '2015-01-01',
              required: true
            },
            {
              key: 'status',
              type: 'hidden',
              default : 1,
              required: true
            },
            {
              key: 'verified',
              type: 'hidden',
              default : false,
              required: true
            },
            {
              key: 'profileId',
              type: 'hidden',
              required: true
            }
        ];


        $scope.formFields5 = [ {
            key: 'Name',
            type: 'text',
            label: gettextCatalog.getString('Name'),
            id : 'company.name',
            required: true
          }, {
            key: 'URL',
            type: 'textarea',
            label: gettextCatalog.getString('URL'),
            lines : 4,
            id : 'company.url',
            required: true
          }, {
            key: 'UUID',
            type: 'hidden',
            label: '',
            id : 'company.uuid',
            required: true
          }
        ];

  $scope.hideBase = true;
  $scope.toggleBase = function(id) {
    $scope.hideBase = $scope.hideBase === false ? true: false;
  }

  $scope.hideCompany = true;
  $scope.toggleCompany = function(id) {
    $scope.hideCompany = $scope.hideCompany === false ? true: false;
  }

  $scope.hideWork = true;
  $scope.toggleWork = function(id) {
    $scope.hideWork = $scope.hideWork === false ? true: false;
  }
  $scope.hideSocial = true;
  $scope.toggleSocial = function(id) {
    $scope.hideSocial = $scope.hideSocial === false ? true: false;
  }



  $scope.companyAction = function(id){
    // break open the comapnies and allow auto completes
  }


  $scope.imageAction = function(id){
    // "medias": [
    //       {
    //         "Name": "PROFILEPIC",
    //         "URI": "https://tctechcrunch2011.files.wordpress.com/2015/07/lexus.jpeg?w=738",
    //         "SIZE": 0,
    //         "Created": "2015-01-01T00:00:00.000Z",
    //         "Type": 1,
    //         "id": "559f6866778d7a3c3f05a245",
    //         "profileId": "559b5a45b7802b091091a91f"
    //       }

  // link to images module

  $location.path('/app/files/list');
  //$state.go('app.files.list');

  }

  $scope.delete = function(id) {
    ProfileService.deleteProfile(id, function() {
      $state.go('^.list');
    });
  };

  $scope.getMe = function(pro){
      console.log('GET ME :'+pro.id);
      ProfileService.getProfile(pro.id);
      console.log('CLICK : ' + pro.id);
      $location.path('/app/myprofile/'+pro.id);
  };

  $scope.onSubmit = function() {
    $scope.MyProfile.Name = $scope.profile.profile.user.Name;
    $scope.MyProfile.Bio = $scope.profile.profile.user.Bio;
    $scope.MyProfile.UUID = $scope.profile.profile.user.UUID;


    console.log('Name : '+ $scope.profile.profile.user.Name + '\n Bio : ' + $scope.profile.profile.user.Bio );
    console.log('UUID BEFORE UPSERT: '+$scope.profile.profile.user.id);

    ProfileService.upsertProfile($scope.profile.profile.user, function() {
      //$state.go('^.view({id: $scope.MyProfile.UUID})');
        $scope.hideBase = true;
      $location.path('/app/myprofile/'+$scope.profile.profile.user.id+ '/edit');
    });
  };

// ==============  EDUCATION ====================

  // $scope.delete2 = function(id) {
  //   EducationService.deleteEducation(id, function() {
  //     $scope.profile = ProfileService.getProfile($scope.profile.id);
  //   });
  // };
  //
  // $scope.onSubmit2 = function() {
  //   EducationService.upsertEducation($scope.SchoolRecord, function() {
  //     $scope.profile = ProfileService.getProfile($scope.profile.id);
  //     $state.go('^.view');
  //   });
  // };

// ==============  WORKHISTORY ====================

  $scope.delete3 = function(id) {
    WorkHistoryService.deleteWorkHistory(id, function() {
      $scope.msg = WorkHistoryService.deleteWorkHistory($scope.profile.id, function(){

      });
      console.log('MSG RESPONSE DELETE WORK: '+   $scope.msg);
    });
  };


  //     'companyname': '',
  //  'jobtitle': '',
  //  'datestart': '',
  //  'dateend': '',
  //  'id': 'objectid',
  //  'profileId': 'objectid'

  $scope.onSubmit3 = function() {

//     $scope.WorkRecord.companyname = $scope.profile.profile.user.Name;
//     $scope.WorkRecord.jobtitle = $scope.profile.profile.user.Bio;
//     $scope.WorkRecord.datestart = $scope.profile.profile.user.UUID;
//     $scope.WorkRecord.dateend = $scope.profile.profile.user.UUID;
    $scope.WorkRecord.profileId =  $scope.profile.profile.user.id;

    console.log('COMPANY : '+ $scope.WorkRecord.companyname + '\n TITLE : ' + $scope.WorkRecord.Type +' - ' + $scope.WorkRecord.jobtitle);
    console.log('UUID BEFORE UPSERT: '+ $scope.WorkRecord.profileId);

    ProfileService.upsertWorkHistory($scope.WorkRecord, function() {

    });

    $scope.profile = ProfileService.getProfile($scope.WorkRecord.profileId);
    //$state.go('^.view({id: $scope.MyProfile.UUID})');
      $scope.hideWork = true;
    $location.path('/app/myprofile/'+$scope.WorkRecord.profileId+'/edit');

  };

// ==============  SOCIAL ====================

  $scope.delete4 = function(id) {
    ProfileService.deleteSocial(id, function() {
      $scope.profile = ProfileService.getProfile($scope.profile.id);
    });
  };
  $scope.onSubmit4 = function() {

    $scope.SocialRecord.profileId = $scope.profile.profile.user.id;

    console.log('TYPE : '+ $scope.SocialRecord.Type + '\n VAL : ' + $scope.SocialRecord.URL +' - ' + $scope.SocialRecord.Value);
    console.log('UUID BEFORE UPSERT: '+ $scope.SocialRecord.profileId);

    ProfileService.upsertSocial($scope.SocialRecord, function() {

    });

    $scope.profile = ProfileService.getProfile($scope.SocialRecord.profileId);
    //$state.go('^.view({id: $scope.MyProfile.UUID})');
      $scope.hideSocial = true;
    $location.path('/app/myprofile/'+$scope.SocialRecord.profileId +'/edit');

  };

  // ==============  TEAM ====================

    $scope.delete5 = function(id) {
      // delete team record from array
    };

    $scope.onSubmit5 = function() {
      // edit or create team record from array
    };

  // ==============  EDIT TABLES ====================

  $scope.editCompany = function(comp)  {

    console.log('editing comp : '+ comp.Name +' : ' + comp.URL +' : '  );
    $scope.CompanyRecord.Name = comp.Name;
    $scope.CompanyRecord.URL = comp.URL;

    console.log('getting members');
    $scope.thisCompanyMembers = ProfileService.getCompanyMembers($scope.CompanyRecord);
    for(company in $scope.thisCompanyMembers)

    angular.forEach($scope.thisCompanyMembers, function(value) {
        angular.forEach(value, function(key, val) {
          console.log(key + ' : ' + value);
        });
    });

    // console.log('COMPANY LISTED' + $scope.thisCompanyMembers[0].Name);
    // now upsert the record
    //ProfileService.upsertCompany

  };



// ==============  GRAB PROFILES ON LOAD ====================

  setTimeout(function () {
      $scope.$apply(function() {

        if($scope.currentUser){
          console.log('LOGGED IN UID: '+ $scope.currentUser.id );
        }
              $scope.profiles = ProfileService.getProfiles();
          });
  }, 100);

  $scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
      if($scope.currentUser){
        console.log('LOGGED IN UID: '+ $scope.currentUser.id );
        console.log('PROFILE 2 : '+JSON.stringify( $scope.SelectedProfile ));
      }
  });

  if ($stateParams.id) {
    $scope.profile = ProfileService.getProfile($stateParams.id);
    // $scope.sliceProfile($scope.MyProfile);
  } else {
    $scope.profile = {};
  }

});
