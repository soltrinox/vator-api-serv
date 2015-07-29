'use strict';
var app = angular.module('com.module.profile');

app.controller('MyProfileCtrl',function($scope, $location, $state, $route, $routeParams, $stateParams,  $document,
  ProfileService, gettextCatalog, $http) {

    $scope.UserRecord = {
      Name:'',
      Bio:'',
      UUID:'',
      ProfilePic:'',
      CoverPic:'',
      id:''
    };


    $scope.SocialArray = { };
    $scope.SocialRecord = {
      profileId : '',
      id : '',
      LinkedIn : '',
      Facebook : '',
      Twitter : '',
      Github : '',
      Google : '',
      Website : ''
    }


    $scope.WorkRecord = {
      companyname: '',
      jobtitle : '',
      datestart : '',
      dateend : '',
      profileId : '',
      achieve : '',
      achievements: [{'value':0}],
      id: ''
    };
    $scope.MediaRecord = {};
    $scope.CompanyRecord = {
      Name: '',
      URL: '',
      profileId : '',
      teamId : ''
    };

    $scope.profileId = '';
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
      console.log('inProfile' + JSON.stringify(pro.user.id));
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



      $scope.hideDateStart = true;
      $scope.hideDateEnd = true;
      $scope.hideTitle = true;

      $scope.$watchCollection('WorkRecord', function(newValue, oldValue){
        console.log(JSON.stringify($scope.WorkRecord));
        var xnx = $scope.WorkRecord.Type;
        if((xnx === '001') || (xnx === '002')){
          angular.element($document[0].querySelector(".work-datestart_date")).css("display", "block");
          angular.element($document[0].querySelector(".work-dateend_date")).css("display", "block");
          angular.element($document[0].querySelector(".work-title_text")).css("display", "block");
          angular.element($document[0].querySelector(".work-achievement_text")).css("display", "block");
        }else{
          angular.element($document[0].querySelector(".work-datestart_date")).css("display", "none");
          angular.element($document[0].querySelector(".work-dateend_date")).css("display", "none");
          angular.element($document[0].querySelector(".work-title_text")).css("display", "none");
          angular.element($document[0].querySelector(".work-achievement_text")).css("display", "none");
        }

        console.log('OLD: ' + JSON.stringify(oldValue) +'\n NEW: ' + JSON.stringify(newValue) );
        //  $scope.hideTitle = $scope.hideTitle === false ? true: false;
        //  $scope.hideDateStart = $scope.hideDateStart === false ? true: false;
        //  $scope.hideDateEnd =  $scope.hideDateEnd  === false ? true: false;
      });


      $scope.formFields3 =
        [
          {
              key: 'companyname',
              type: 'auto',
              label: 'Company',
              id : 'work-companyname',
              data : '$scope.workLookUp',
              uniqueFormId : 'work-companyname-box',
              required: true
            },  {
              key: 'Type',
              type: 'select',
              label: 'Role',
              id : 'work-type',
              uniqueFormId : 'work-type-box',
              required: true,
              options:
              [
                  {
                      name: 'Employee',
                      value : '001',
                      id: 'work-type-001'
                  },
                  {
                      name: 'Founder',
                      value : '002',
                      id: 'work-type-002'
                  },
                  {
                      name: 'Investor',
                      value : '003',
                      id: 'work-type-003'
                  },
                  {
                      name: 'Advisor',
                      value : '004',
                      id: 'work-type-004'
                  },
                  {
                      name: 'Board Member',
                      value : '005',
                      id: 'work-type-005'
                  }
              ]
            }, {
              key: 'jobtitle',
              type: 'text',
              id : 'work-title',
              uniqueFormId : 'work-title-box',
              label: 'Title',
              required: false
            },
             {
                key: 'datestart',
                type: 'date',
                label: 'Start Date',
                id : 'work-datestart',
                uniqueFormId : 'work-datestart-box',
                required: true
              }, {
                key: 'dateend',
                type: 'date',
                label: 'End Date',
                id : 'work-dateend',
                uniqueFormId : 'work-dateend-box',
                required: false
              },{
                key: 'achieve',
                type: 'text',
                label: 'Achievements',
                id : 'work-achievement',
                uniqueFormId : 'work-achievement-box',
                required: false
              },{
                key: 'profileId',
                type: 'hidden',
                id : 'work-profileid',
                uniqueFormId : 'work-profileid-box',
                required: true
              }
      ];

//      $scope.$watch(function expression(field, theScope) {}, function listener(field, newValue, oldValue, theScope) {});

// Type (string, optional),
// Value (string, optional),
// URL (string, optional),
// created (string, optional),
// status (number, optional),
// verified (boolean, optional),
// profileId (objectid, optional)


        $scope.formFieldsXX =
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






$scope.formFields4 = [
  {
      key: 'LinkedIn',
      type: 'text',
      label: 'LinkedIn',
      id : 'social-linkedin'
    },
    {
        key: 'Facebook',
        type: 'text',
        label: 'Facebook',
        id : 'social-facebook'
    },
    {
        key: 'Twitter',
        type: 'text',
        label: 'Twitter',
        id : 'social-twitter'
    },
    {
        key: 'Github',
        type: 'text',
        label: 'Github',
        id : 'social-github'
    },
    {
        key: 'Google',
        type: 'text',
        label: 'Google',
        id : 'social-google'
    },
    {
        key: 'Website',
        type: 'text',
        label: 'Website',
        id : 'social-web'
    }
];


        $scope.formFields5 = [ {
            key: 'Name',
            type: 'text',
            label: gettextCatalog.getString('Name'),
            id : 'company-name',
            required: true
          }, {
            key: 'URL',
            type: 'textarea',
            label: gettextCatalog.getString('URL'),
            lines : 4,
            id : 'company-url',
            required: true
          }, {
            key: 'UUID',
            type: 'hidden',
            label: '',
            id : 'company-uuid',
            required: true
          }
        ];

  $scope.hideBase = true;
  $scope.toggleBase = function(id) {

    // console.log( 'PARAMS : ' + JSON.stringify($route));
    if( ( $scope.profile ) && ( $scope.UserRecord.UUID  === undefined) ){
      console.log('scope.profile is valid and user rec undefined');
      $scope.UserRecord.Name = $scope.profile.user.Name;
      $scope.UserRecord.UUID = $scope.profile.user.UUID;
      $scope.UserRecord.id = $scope.profile.user.id;
      $scope.UserRecord.Bio = $scope.profile.user.Bio;
      $scope.UserRecord.ProfilePic = $scope.profile.user.ProfilePic;
      $scope.UserRecord.CoverPic = $scope.profile.user.CoverPic;
    }else if( ($scope.profile  === undefined) && ( $scope.UserRecord.UUID  === '') ){
      console.log('scope.profile and user rec undefined');
      $scope.UserRecord.UUID = $scope.currentUser.id;
      $scope.UserRecord.Name = $scope.currentUser.username;
      if(!(($scope.currentUser.firstname === undefined) && ($scope.currentUser.lastname === undefined))){
        $scope.UserRecord.Name = $scope.currentUser.firstname +' '+ $scope.currentUser.lastname;
      }

    }
    // else if((!$scope.profile.user.UUID ) && ($scope.UserRecord.UUID))
    $scope.editUser($scope.UserRecord);
    $scope.hideBase = $scope.hideBase === false ? true: false;
  }

  $scope.hideCompany = true;
  $scope.toggleCompany = function(id) {
    $scope.hideCompany = $scope.hideCompany === false ? true: false;
  }

//  http://api.vator.co/api/Teams?filter={%20%22where%22%20:%20{%20%22Name%22%20:%20{%22like%22%20:%22Co%22%20}%20}%20}

  $scope.getTeams = function(val) {
    return $http.get('//api.vator.co/api/Teams', {
      params: {
        filter: {
            where : {
              Name : {
                like : val
              }
            }
        }
      }
    }).then(function(response){
      // console.log('Company : ' + JSON.stringify(response));
      return response.data.map(function(item){
        //console.log('ITEM : ' + JSON.stringify(item) );
        //console.log('ITEM.NAME : ' + JSON.stringify(item.Name) );
        return item.Name;
      });
    });
  };

  $scope.prettyPrint = function(obj, msg){
    if(!msg || 0 === msg.length ){
        msg = 'DATA' ;
    }
      console.log( msg + ' : ' + JSON.stringify(obj));
  }

  $scope.workLookUp = '';

  $scope.onCompanySelect = function(item, model, label){
      $scope.prettyPrint(model, 'MODEL');
      $scope.WorkRecord.companyname = model;
  }

  $scope.lookCompany = function(val){
      $scope.workLookUp = val;
      $scope.WorkRecord.companyname = $scope.workLookUp;
  }


  $scope.hideWork = true;
  $scope.addWorkButton = false;

  $scope.toggleWork = function(id) {
    $scope.hideWork = $scope.hideWork === false ? true: false;
    $scope.addWorkButton = $scope.addWorkButton === false ? true: false;
    $scope.WorkRecord = {
      companyname: '',
      jobtitle : '',
      datestart : '',
      dateend : '',
      achievements: [ { 'value': '' } ],
      achieve : '',
      id:'',
      profileId : $scope.profileId
    };
  }

  // $scope.cancelWork = function(id) {
  //    $scope.hideWork = false; //$scope.hideWork === false ? true: false;
  //    $scope.addWorkButton = true; //= $scope.addWorkButton === false ? true: false;
  //   $scope.WorkRecord = {
  //     companyname: '',
  //     jobtitle : '',
  //     datestart : '',
  //     dateend : '',
  //     profileId : $scope.profileId
  //   };
  //
  // }

  $scope.hideSocial = true;
  $scope.toggleSocial = function(id) {
    $scope.hideSocial = $scope.hideSocial === false ? true: false;
    $scope.SocialRecord = {
      Type : '',
      Value : '',
      URL : '',
      created : '',
      status : 1,
      verified : false,
      profileId : $scope.profileId
    };
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
      console.log('GET ME :'+ JSON.stringify($scope.profileId) );
      var theId = '';
      if((!$scope.profileId || 0 === $scope.profileId.length) && (!pro.id || 0 === pro.id.length)){

      }else if((!$scope.profileId || 0 === $scope.profileId.length) && (pro.id || 0 < pro.id.length)){
        theId = pro.id;
      }else if(($scope.profileId || 0 < $scope.profileId.length) && (!pro.id || 0 === pro.id.length)){
        theId = $scope.profileId;
      }
      if(theId === ''){
        console.log('NO ID');
      }else{
        ProfileService.getProfile(theId, function(response){
          console.log('FOUND FULL PROFILE : '  + JSON.stringify(response));
          $scope.profile = response.profile;
          $scope.profileId = response.profile.user.id;
          // $location.path('/app/myprofile/'+pro.id);
          
          $scope.UserRecord.Name = response.profile.user.Name;
            $scope.UserRecord.Bio = response.profile.user.Bio;
            $scope.UserRecord.UUID = response.profile.user.UUID;
            $scope.UserRecord.ProfilePic = response.profile.user.ProfilePic;
            $scope.UserRecord.CoverPic = response.profile.user.CoverPic;
            $scope.UserRecord.id = response.profile.user.id;

          $scope.sliceProfile(response.profile);
        });
      }


  };

  $scope.getMyNewProfile = function(UUID){
      console.log('GET ME :'+ UUID );
      // look for the user by their vator auth UUID
      ProfileService.getProfileByUUID(UUID, function(response){

        console.log('@@@@@@@ = profile response for UUID'  + JSON.stringify(response));
        // if we can detect a correct PROFILE.ID than move forward
        // with the correct assignment and getting the full object
        if(!response.id || 0 === response.id.length){
          console.log('USER.RECORD : '+ JSON.stringify($scope.UserRecord) );
          $scope.UserRecord.Name = $scope.currentUser.username ;
          $scope.UserRecord.UUID = $scope.currentUser.id;

          // if the user is new and no PROFILE record exists
          // we need to delete the empty ID in order to create
          if(!$scope.UserRecord.id || 0 === $scope.UserRecord.id){
            delete $scope.UserRecord.id;
          }
          // add the UUID for the current user here
          ProfileService.upsertProfile($scope.UserRecord, function(response) {
            console.log('UPSERT RESPONSE'  + JSON.stringify(response));
            $scope.profileId = response.id;
            // write to global current user object
            $scope.currentUser.pid = response.id;
            // now go get the entire user object and move along
            $scope.getMe($scope.profileId);
          });
        }else{
          // lets set our scope id references here
          $scope.profileId = response.id;
          $scope.currentUser.pid = response.id;
          // fetch the full object and move along
          $scope.getMe($scope.profileId);
        }
      });

  };

  $scope.onSubmit = function() {
    console.log('UPSERT USER.RECORD : '+ JSON.stringify($scope.UserRecord) );
    // verify its not a new record
    if($scope.UserRecord.id === ''){
      delete $scope.UserRecord.id;
    }
    // send the object on down the road to server
    ProfileService.upsertProfile($scope.UserRecord, function(response) {
    console.log('UPSERT RESPONSE W/ UUID'  + JSON.stringify(response));
        $scope.profileId = response.id;
        $scope.currentUser.pid = response.id;
        $scope.getMe($scope.profileId);
    });
    $scope.addWorkButton = false;
    $scope.hideBase = true;
  };



// ==============  EDUCATION ====================



// ==============  WORKHISTORY ====================

  $scope.delete3 = function(id) {
    WorkHistoryService.deleteWorkHistory(id, function() {
      $scope.msg = WorkHistoryService.deleteWorkHistory($scope.profileId, function(){

      });
      console.log('MSG RESPONSE DELETE WORK: '+   $scope.msg);
    });
  };



  $scope.onSubmit3 = function() {
    console.log('$scope.WorkRecord : ' + JSON.stringify($scope.WorkRecord) );

    $scope.WorkRecord.profileId =  $scope.profile.user.id;
    $scope.WorkRecord.achievements =  [{ value : $scope.WorkRecord.achieve }];

    if(!$scope.WorkRecord.id || 0 === $scope.WorkRecord.id){
      delete $scope.WorkRecord.id;
    }

  if( !$scope.profile.user.id || 0 ===  $scope.profile.user.id.length ){
        console.log('MISSING USER ACCOUNT RESTART APP');
  }else{


    ProfileService.upsertWorkHistory($scope.WorkRecord, function() {});
    ProfileService.getProfile($scope.profileId,function(response){
      console.log('NEW WORK : '  + JSON.stringify(response));
      // $scope.profile = response;
        $scope.getMe($scope.profile);
    });
    $scope.hideWork = true;
    $scope.addWorkButton = false;
    // $location.path('/app/myprofile/'+$scope.WorkRecord.profileId+'/edit');
  }


  };

// ==============  SOCIAL ====================

  $scope.delete4 = function(id) {
    ProfileService.deleteSocial(id, function() {
      ProfileService.getProfile($scope.profileId, function(response){
        console.log('delete social : '  + JSON.stringify(response));
        $scope.profile = response;
        // $location.path('/app/myprofile/'+pro.id);
      });
    });
  };
  $scope.onSubmit4 = function() {

    $scope.SocialRecord.profileId = $scope.profile.user.id;

    console.log('TYPE : '+ JSON.stringify($scope.SocialRecord) );

    if(!$scope.SocialRecord.id || 0 === $scope.SocialRecord.id){
      delete $scope.SocialRecord.id;
    }

    ProfileService.upsertSocial($scope.SocialRecord, function() {

    });

    ProfileService.getProfile($scope.profileId, function(response){
      console.log('NEW SOCIAL : '  + JSON.stringify(response));
        //$scope.profile = response;
        $scope.getMe($scope.profile);
    });

    $scope.hideSocial = true;
    //$location.path('/app/myprofile/'+$scope.SocialRecord.profileId +'/edit');

  };

  // ==============  TEAM ====================

    $scope.delete5 = function(id) {
      // delete team record from array
    };

    $scope.onSubmit5 = function() {
      // edit or create team record from array
    };

  // ==============  EDIT TABLES ====================

  $scope.editUser = function(user){
    $scope.UserRecord.Name = user.Name;
    $scope.UserRecord.Bio = user.Bio;
    $scope.UserRecord.UUID = user.UUID;
    $scope.UserRecord.ProfilePic = user.ProfilePic;
    $scope.UserRecord.CoverPic = user.CoverPic;
    $scope.UserRecord.id = user.id;
  };

  $scope.editCompany = function(comp)  {

    console.log('editing comp : '+ comp.Name +' : ' + comp.URL +' : '  );
    $scope.CompanyRecord.Name = comp.Name;
    $scope.CompanyRecord.URL = comp.URL;
    $scope.CompanyRecord.profileId = '';
    $scope.CompanyRecord.teamId = '';


    // console.log('getting members');
    // $scope.thisCompanyMembers = ProfileService.getCompanyMembers($scope.CompanyRecord);
    // console.log('MEMBERS : ' + $scope.thisCompanyMembers );

    // console.log('COMPANY LISTED' + $scope.thisCompanyMembers[0].Name);
    // now upsert the record
    ProfileService.upsertCompany($scope.CompanyRecord);

  };

    $scope.editEmail = function(comp){
      console.log('edit email');
    };


    $scope.editWork = function(comp){
      console.log('edit work');
    };

    $scope.editSocial = function(comp){
      console.log('edit social');
    };




// ==============  GRAB PROFILES ON LOAD ====================

$scope.firstTime = 0;

  setTimeout(function () {
      $scope.$apply(function() {

        if($scope.currentUser){
          console.log('LOGGED IN UID: '+ $scope.currentUser.id );
            $scope.getMyNewProfile($scope.currentUser.id);
            $scope.firstTime = 1;
        }


        });
  }, 100);



  $scope.$on('$viewContentLoaded', function(){
      if(($scope.currentUser ) && ($scope.firstTime === 1)){
        console.log('LOGGED IN UID: '+ $scope.currentUser.id );
        console.log('CURRENT USER : '+JSON.stringify( $scope.currentUser ));

        angular.element($document[0].querySelector(".work-datestart_date")).css("display", "none");
        angular.element($document[0].querySelector(".work-dateend_date")).css("display", "none");
        angular.element($document[0].querySelector(".work-title_text")).css("display", "none");
        angular.element($document[0].querySelector(".work-achievement_text")).css("display", "none");


        if($scope.profile === undefined){
            console.log('NO CURRENT PROFILE');
            $scope.getMyNewProfile($scope.currentUser.id);
        }else{
          console.log('CURRENT PROFILE : '+JSON.stringify( $scope.profile ));
        }

      }
  });




});
