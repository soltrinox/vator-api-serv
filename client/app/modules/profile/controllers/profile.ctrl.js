'use strict';
var app = angular.module('com.module.profile')
.directive('moveChildren',
    function() {
      return {
        restrict: 'EAC',
        link: function(scope, element, attrs) {

            var ttt = angular.element(element[0].querySelector('.work-datestart_date'));
            var parttt = ttt.parent();
            //var remttt = ttt.clone();

            var zzz = angular.element(element[0].querySelector('.work-dateend_date'));
            var parzzz = zzz.parent();
           // var remzzz = zzz.clone();

           var ddd =  angular.element('<div id="love" ></div>');
            ddd.insertBefore(parttt);
           ddd.append(parttt);
           ddd.append(parzzz);

        }
      };
    }
  );

app.controller('MyProfileCtrl',function($scope, $location, $state, $route, $routeParams, $stateParams,
  ProfileService, gettextCatalog, $http) {

    $scope.UserRecord = {
      Name:'',
      Bio:'',
      UUID:'',
      ProfilePic:'',
      CoverPic:'',
      id:''
    };


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
              label: 'Type',
              id : 'work-type',
              uniqueFormId : 'work-type-box',
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
                key: 'jobtitle',
                type: 'text',
                id : 'work-title',
                uniqueFormId : 'work-title-box',
                label: 'Title',
                required: false
              },{
                key: 'profileId',
                type: 'hidden',
                id : 'work-profileid',
                uniqueFormId : 'work-profileid-box',
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
  $scope.toggleWork = function(id) {
    $scope.hideWork = $scope.hideWork === false ? true: false;
    $scope.WorkRecord = {
      companyname: '',
      jobtitle : '',
      datestart : '',
      dateend : '',
      profileId : $scope.profileId
    };

  }
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
          console.log('FOUND FULL PROFILE : '  + JSON.stringify($scope.profile));
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
      ProfileService.getProfileByUUID(UUID, function(response){

        console.log('@@@@@@@ = profile response for UUID'  + JSON.stringify(response));

        if(!response.id || 0 === response.id.length){
          console.log('Name : '+ $scope.UserRecord.Name + '\n Bio : ' + $scope.UserRecord.Bio );
          console.log('object ID BEFORE UPSERT: '+ $scope.UserRecord.id +' = UUID : ' + $scope.UserRecord.UUID);
          $scope.UserRecord.Name = $scope.currentUser.username ;
          $scope.UserRecord.UUID = $scope.currentUser.id;


          if(!$scope.UserRecord.id || 0 === $scope.UserRecord.id){
            delete $scope.UserRecord.id;
          }

          ProfileService.upsertProfile($scope.UserRecord, function(response) {
            console.log('Updated new profile on UUID'  + JSON.stringify(response));
            $scope.profileId = response.id;
              $scope.getMe($scope.profileId);
          });
        }else{
          $scope.profileId = response.id;
          $scope.getMe($scope.profileId);
        }
      });

  };

  $scope.onSubmit = function() {

    console.log('Name : '+ $scope.UserRecord.Name + '\n Bio : ' + $scope.UserRecord.Bio );
    console.log('object ID BEFORE UPSERT: '+ $scope.UserRecord.id +' = UUID : ' + $scope.UserRecord.UUID);
    if($scope.UserRecord.id === ''){
      delete $scope.UserRecord.id;
    }
    ProfileService.upsertProfile($scope.UserRecord, function(response) {
      console.log('Updated new profile on UUID'  + JSON.stringify(response));
      $scope.profileId = response.id;
        $scope.getMe($scope.profileId);
    });

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

    $scope.WorkRecord.profileId =  $scope.profile.user.id;
    console.log('COMPANY : '+ $scope.WorkRecord.companyname + '\n TITLE : ' + $scope.WorkRecord.Type +' - ' + $scope.WorkRecord.jobtitle);
    console.log('UUID BEFORE UPSERT: '+ $scope.WorkRecord.profileId);
    ProfileService.upsertWorkHistory($scope.WorkRecord, function() {});
    ProfileService.getProfile($scope.profileId,function(response){
      console.log('NEW WORK : '  + JSON.stringify(response));
      // $scope.profile = response;
        $scope.getMe($scope.profile);
    });
    $scope.hideWork = true;
    // $location.path('/app/myprofile/'+$scope.WorkRecord.profileId+'/edit');

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

    console.log('TYPE : '+ $scope.SocialRecord.Type + '\n VAL : ' + $scope.SocialRecord.URL +' - ' + $scope.SocialRecord.Value);
    console.log('UUID BEFORE UPSERT: '+ $scope.SocialRecord.profileId);

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

        if($scope.profile === undefined){
            console.log('NO CURRENT PROFILE');
            $scope.getMyNewProfile($scope.currentUser.id);
        }else{
          console.log('CURRENT PROFILE : '+JSON.stringify( $scope.profile ));
        }

      }
  });




});
