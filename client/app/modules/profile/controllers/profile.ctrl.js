'use strict';
var app = angular.module('com.module.profile');

 // $fileUploader,   /// commented in index.html
app.controller('MyProfileCtrl',function($scope, $location, $state, $route, $routeParams,$stateParams,  $document,
  ProfileService, gettextCatalog, $http) {

    $scope.UserRecord = {
      Name:'',
      Bio:'',
      UUID:'',
      ProfilePic:'',
      CoverPic:'',
      id:''
    };

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

    $scope.InvestRecord = {
      amount:'',
      date:'',
      profileId:'',
      roundtotal:'',
      valuation:'',
      isipo:'',
      id:'',
      transaction:'',
      exitdate:'',
      amount2:'',
      aquirer:'',
      press:''
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
    };



    $scope.MediaRecord = {};
    $scope.CompanyRecord = {
      Name: '',
      URL: '',
      profileId : '',
      teamId : ''
    };

    $scope.fullprofile = [];


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
        if(pro.social.length > 0){
          $scope.SocialRecord = pro.social[0] ;        // ---------
          $scope.socials.push($scope.SocialRecord);
        }
        $scope.credentials = pro.creds ;    // ---------
        $scope.contacts = pro.contact ;      // ---------
        console.log('SLICED ENTIRE PROFILE PID:'+ $scope.currentUser.pid );
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
      type: 'hidden',
      label: 'Profile Pic URL',
      id : 'user.profilepic',
      required: false
    }, {
      key: 'CoverPic',
      type: 'hidden',
      label: 'Cover Pic URL',
      id : 'user.coverpic',
      required: false
    }
  ];



      $scope.hideDateStart = true;
      $scope.hideDateEnd = true;
      $scope.hideTitle = true;

      $scope.$watchCollection('InvestRecord', function(newValue, oldValue){
        console.log('WORK old value\n'+JSON.stringify(oldValue));
      console.log('WORK new value \n'+JSON.stringify(newValue));

        var xnx = newValue.isipo;
              console.log('RADIO IS IPO :' + xnx);
        if(xnx === 'true' ){
          console.log('RADIO IS IPO :' + $scope.WorkRecord.isipo);
            angular.element($document[0].querySelector('.invest-transaction_text')).css('display', 'block');
            angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', 'block');
            angular.element($document[0].querySelector('.invest-amount2_text')).css('display', 'block');
            angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', 'block');
            angular.element($document[0].querySelector('.invest-press_text')).css('display', 'block');
        }else if(xnx === 'false'){
          console.log('RADIO IS IPO :' + $scope.WorkRecord.isipo);
            angular.element($document[0].querySelector('.invest-transaction_text')).css('display', 'none');
            angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', 'none');
            angular.element($document[0].querySelector('.invest-amount2_text')).css('display', 'none');
            angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', 'none');
            angular.element($document[0].querySelector('.invest-press_text')).css('display', 'none');
        }else{
          angular.element($document[0].querySelector('.invest-transaction_text')).css('display', 'none');
          angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', 'none');
          angular.element($document[0].querySelector('.invest-amount2_text')).css('display', 'none');
          angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', 'none');
          angular.element($document[0].querySelector('.invest-press_text')).css('display', 'none');
        }
      });

      $scope.$watchCollection('WorkRecord', function(newValue, oldValue){
          console.log('WORK old value\n'+JSON.stringify(oldValue));
        console.log('WORK new value \n'+JSON.stringify(newValue));

        var xnx = $scope.WorkRecord.Type;
        if(xnx === '003'){
          angular.element($document[0].querySelector('.work-datestart_date')).css('display', 'none');
          angular.element($document[0].querySelector('.work-dateend_date')).css('display', 'none');
          angular.element($document[0].querySelector('.work-title_text')).css('display', 'none');
          angular.element($document[0].querySelector('.work-achievement_text')).css('display', 'none');
          angular.element($document[0].querySelector('.investorForm')).css('display', 'block');
          angular.element($document[0].querySelector('.invest-transaction_text')).css('display', 'none');
          angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', 'none');
          angular.element($document[0].querySelector('.invest-amount2_text')).css('display', 'none');
          angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', 'none');
          angular.element($document[0].querySelector('.invest-press_text')).css('display', 'none');
        }else if((xnx === '001') || (xnx === '002')){
          angular.element($document[0].querySelector('.work-datestart_date')).css('display', 'block');
          angular.element($document[0].querySelector('.work-dateend_date')).css('display', 'block');
          angular.element($document[0].querySelector('.work-title_text')).css('display', 'block');
          angular.element($document[0].querySelector('.work-achievement_text')).css('display', 'block');
          angular.element($document[0].querySelector('.investorForm')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-transaction_text')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-amount2_text')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-press_text')).css('display', 'none');
        }else if((xnx === '004') || (xnx === '005')){
          angular.element($document[0].querySelector('.work-datestart_date')).css('display', 'block');
          angular.element($document[0].querySelector('.work-dateend_date')).css('display', 'block');
          angular.element($document[0].querySelector('.work-title_text')).css('display', 'none');
          angular.element($document[0].querySelector('.work-achievement_text')).css('display', 'block');
          angular.element($document[0].querySelector('.investorForm')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-transaction_text')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-amount2_text')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', 'none');
          // angular.element($document[0].querySelector('.invest-press_text')).css('display', 'none');
        }else{
          angular.element($document[0].querySelector('.work-datestart_date')).css('display', 'none');
          angular.element($document[0].querySelector('.work-dateend_date')).css('display', 'none');
          angular.element($document[0].querySelector('.work-title_text')).css('display', 'none');
          angular.element($document[0].querySelector('.work-achievement_text')).css('display', 'none');
          angular.element($document[0].querySelector('.investorForm')).css('display', 'none');
        }
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
                uniqueFormId : 'work-profileid-box'
              }
      ];


        $scope.investFields =
        [
            {
            key: 'amount',
            type: 'text',
            label: 'Amount',
            id : 'invest-amount',
            uniqueFormId : 'invest-amount-box',
            required: true
            },{
              key: 'date',
              type: 'date',
              id : 'invest-date',
              uniqueFormId : 'invest-date-box',
              label: 'Date',
              required: false
            },{
              key: 'roundtotal',
              type: 'text',
              id : 'invest-roundtotal',
              uniqueFormId : 'invest-roundtotal-box',
              label: 'Round  Total',
              required: false
            },
            {
              key: 'valuation',
              type: 'text',
              id : 'invest-valuation',
              uniqueFormId : 'invest-valuation-box',
              label: 'Valuation',
              required: false
            },{
              key: 'isipo',
              type: 'radio',
              id : 'invest-isipo',
              uniqueFormId : 'invest-isipo-box',
              disabled: false,
              label: 'Aquired / IPO',
              required: false,
              options: [
              {
                  name: 'Yes',
                  value: 'true'
              },
              {
                  name: 'No',
                  value: 'false'
              }]
            },
            {
              key: 'transaction',
              type: 'text',
              id : 'invest-transaction',
              uniqueFormId : 'invest-transaction-box',
              label: 'Transaction',
              required: false
            },
            {
              key: 'exitdate',
              type: 'date',
              id : 'invest-exitdate',
              uniqueFormId : 'invest-exitdate-box',
              label:'exit date',
              required: false
            },
            {
              key: 'amount2',
              type: 'text',
              id : 'invest-amount2',
              uniqueFormId : 'invest-amount2-box',
              label:'Amount',
              required: false
            },
            {
              key: 'aquirer',
              type: 'text',
              id : 'invest-aquirer',
              uniqueFormId : 'invest-aquirer-box',
              label:'Aquirer',
              required: false
            },
            {
              key: 'press',
              type: 'text',
              id : 'invest-press',
              uniqueFormId : 'invest-press-box',
              label:'Press',
              required: false
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
    if((!$scope.UserRecord.id || $scope.UserRecord.length === 0 ) && $scope.fullprofile ){
      console.log('scope.profile is valid and user rec undefined');
      $scope.UserRecord.Name = $scope.fullprofile.user.Name;
      $scope.UserRecord.UUID = $scope.fullprofile.user.UUID;
      $scope.UserRecord.id = $scope.fullprofile.user.id;
      $scope.UserRecord.Bio = $scope.fullprofile.user.Bio;
      $scope.UserRecord.ProfilePic = $scope.fullprofile.user.ProfilePic;
      $scope.UserRecord.CoverPic = $scope.fullprofile.user.CoverPic;
    }


    // else if((!$scope.profile.user.UUID ) && ($scope.UserRecord.UUID))
    $scope.editUser($scope.UserRecord);
    $scope.hideBase = $scope.hideBase === false ? true: false;
  id = null;
  };

  $scope.hideCompany = true;
  $scope.toggleCompany = function(id) {
    $scope.hideCompany = $scope.hideCompany === false ? true: false;
  id = null;
};

//  http://api.vator.co/api/Teams?filter={%20%22where%22%20:%20{%20%22Name%22%20:%20{%22like%22%20:%22Co%22%20}%20}%20}

  $scope.getTeams = function(val) {
    return $http.get('//api.vator.co/api/products', {
      params: {
        filter: {
            where : {
              name : {
                like : val
              }
            }
        }
      }
    }).then(function(response){
      console.log('Company : ' + JSON.stringify(response));
      return response.data.map(function(item){
        //console.log('ITEM : ' + JSON.stringify(item) );
        //console.log('ITEM.NAME : ' + JSON.stringify(item.Name) );
        return item.name;
      });
    });
  };

  $scope.prettyPrint = function(obj, msg){
    if(!msg || 0 === msg.length ){
        msg = 'DATA' ;
    }
      console.log( msg + ' : ' + JSON.stringify(obj));
  };

  $scope.workLookUp = '';

  $scope.onCompanySelect = function(item, model, label){
      $scope.prettyPrint(model, 'MODEL');
      $scope.WorkRecord.companyname = model;
  label = null;
};

  $scope.lookCompany = function(val){
      $scope.workLookUp = val;
      $scope.WorkRecord.companyname = $scope.workLookUp;
  };


  $scope.hideWork = true;
  $scope.addWorkButton = false;

  $scope.toggleWork = function(id) {


    if(! $scope.addWorkButton){
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
    }
    $scope.hideWork = $scope.hideWork === false ? true: false;
    $scope.addWorkButton = $scope.addWorkButton === false ? true: false;
  id = null;};

  $scope.cancelWork = function(id) {
     $scope.hideWork = false; //$scope.hideWork === false ? true: false;
     $scope.addWorkButton = true; //= $scope.addWorkButton === false ? true: false;
     id = null;
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

     $scope.InvestRecord = {
       amount:'',
       date:'',
       profileId:'',
       roundtotal:'',
       valuation:'',
       isipo:'',
       id:'',
       transaction:'',
       exitdate:'',
       amount2:'',
       aquirer:'',
       press:''
     };
  };

  $scope.hideSocial = true;
  $scope.toggleSocial = function(id) {
    $scope.hideSocial = $scope.hideSocial === false ? true: false;
  id = null;};



  $scope.companyAction = function(id){
    // break open the comapnies and allow auto completes
  id = null;};


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

  $location.path('/app/files/list');id = null;
};


  $scope.delete = function(id) {
    ProfileService.deleteProfile(id, function() {
      $state.go('^.list');
    });
  };

  $scope.getMe = function(profileId){
     if(!$scope.currentUser.pid || $scope.currentUser.pid.length > 0 )  {
       $scope.getUserRecord($scope.currentUser.id);
     }
  profileId = null;};

  $scope.getEntireProfile = function(thepId){
    ProfileService.getProfile(thepId, function(response){
        console.log('UPDATED FULL PROFILE : \n'  + JSON.stringify(response));
        $scope.fullprofile = response.profile;
        $scope.currentUser.pid = response.profile.user.id;
        $scope.currentUser.pid = response.profile.user.id;
        $scope.UserRecord.Name = response.profile.user.Name;
        $scope.UserRecord.Bio = response.profile.user.Bio;
        $scope.UserRecord.UUID = response.profile.user.UUID;
        $scope.UserRecord.ProfilePic = response.profile.user.ProfilePic;
        $scope.UserRecord.CoverPic = response.profile.user.CoverPic;
        $scope.UserRecord.id = response.profile.user.id;
        $scope.currentUser.pid = response.profile.user.id;
        $scope.sliceProfile(response.profile);
    });
  };

  $scope.getUserRecord = function(UUID){

    if(!$scope.fullprofile.user || 0 === $scope.fullprofile.user.length){

      // look for the user by their vator auth UUID
      if(!$scope.currentUser.pid || 0 === $scope.currentUser.pid.length){
        $scope.currentUser.pid = UUID;
      }else if(!UUID || 0 === UUID.length){
        UUID = $scope.currentUser.pid;
      }


        // go get profile or create new one....
        ProfileService.getProfileByUUID($scope.currentUser.id, function(response){
          //console.log('@@@@@@@ = profile response for UUID'  + JSON.stringify(response));

          // if we can detect a correct PROFILE.ID than move forward
          // with the correct assignment and getting the full object
          if(!response.id || 0 === response.id.length){
            console.log('USER.RECORD : '+ JSON.stringify($scope.UserRecord) );
            $scope.UserRecord.Name = $scope.currentUser.name ;
            $scope.UserRecord.UUID = $scope.currentUser.id;
            // if the user is new and no PROFILE record exists
            // we need to delete the empty ID in order to create
            if(!$scope.UserRecord.id || 0 === $scope.UserRecord.id.length){
              delete $scope.UserRecord.id;
            }
            // add the UUID for the current user here
            ProfileService.upsertProfile($scope.UserRecord, function(response) {
              console.log('UPSERT RESPONSE'  + JSON.stringify(response));

              if(!$scope.fullprofile.user.id || 0 === $scope.fullprofile.user.id.length){
                $scope.getEntireProfile($scope.currentUser.pid);
              }
            });
          }else{
            // lets set our scope id references here
            $scope.profile = response;
            $scope.currentUser.pid = response.id;
            // fetch the full object and move along
            if(!$scope.fullprofile.user || 0 === $scope.fullprofile.user.length){
              $scope.getEntireProfile($scope.currentUser.pid);
            }
          }
        });

      }
  };


  $scope.upsertUserRecord = function( userRecord){
    if ((!$scope.UserRecord.UUID) || (0 === $scope.UserRecord.UUID.length)) {
      $scope.UserRecord.UUID =   $scope.currentUser.id;
    }
    if((!$scope.profile) || (!$scope.fullprofile)){
      ProfileService.upsertProfile($scope.UserRecord, function(response) {
      console.log('SUCCESS: UPSERT RESPONSE W/ UUID\n'  + JSON.stringify(response));
          $scope.profile = response;
          $scope.currentUser.pid = response.id;
          $scope.getEntireProfile($scope.currentUser.pid );
      });
    }
    userRecord = null;
  };

  $scope.onSubmit = function() {
    // run validation here
    if (!$scope.currentUser.id || 0 === $scope.currentUser.id.length) {
      console.log('MISSING BASE USER  $scope.currentUser -> LOG IN AGAIN' );
      $location.path('/login');
    }else if (!$scope.currentUser.pid || 0 === $scope.currentUser.pid.length) {
      console.log('currentUser.pid NOT SET : \n'+ JSON.stringify($scope.currentUser) );
      // get the profile by uuid
      $scope.getUserRecord($scope.currentUser.id);

    }else if (((!$scope.UserRecord.id) || (0 === $scope.UserRecord.id.length)) &&  $scope.currentUser.pid.length > 0 ) {
      console.log('UPSERT USER RECORD ID NOT SET : \n'+ JSON.stringify($scope.UserRecord) );

      if($scope.currentUser.pid){
        $scope.UserRecord.id = $scope.currentUser.pid;
      }
      if ($scope.currentUser.pid) {
        $scope.UserRecord.id = $scope.currentUser.pid;
      }

        $scope.upsertUserRecord($scope.UserRecord);
        $scope.addWorkButton = false;
        $scope.hideBase = true;
    }else{

      // verify its not a new record
      if(($scope.UserRecord.id.length === 0) || (!$scope.UserRecord.id)){
        delete $scope.UserRecord.id;
      }
      // send the object on down the road to server
      $scope.upsertUserRecord($scope.UserRecord);
      $scope.addWorkButton = false;
      $scope.hideBase = true;
    }
};



// ==============  EDUCATION ====================



// ==============  WORKHISTORY ====================

  $scope.delete3 = function(id) {
    ProfileService.deleteWorkHistory(id, function() {
      $scope.msg = ProfileService.deleteWorkHistory($scope.currentUser.pid, function(){

      });
      console.log('MSG RESPONSE DELETE WORK: '+   $scope.msg);
    });
  };



  $scope.onSubmit3 = function() {
    console.log('$scope.WorkRecord : ' + JSON.stringify($scope.WorkRecord) );

    $scope.WorkRecord.profileId =  $scope.fullprofile.user.id;
    $scope.WorkRecord.achievements =  [{ value : $scope.WorkRecord.achieve }];

    if(!$scope.WorkRecord.id || 0 === $scope.WorkRecord.id.length ){
      delete $scope.WorkRecord.id;
    }

  if( !$scope.fullprofile.user.id || 0 ===  $scope.fullprofile.user.id.length ){
        console.log('MISSING USER ACCOUNT RESTART APP');
  }else{


    ProfileService.upsertWorkHistory($scope.WorkRecord, function() {});
    ProfileService.getProfile($scope.currentUser.pid,function(response){
      console.log('NEW WORK : '  + JSON.stringify(response));
      // $scope.profile = response;
        $scope.getMe($scope.currentUser.pid);
    });
    $scope.hideWork = true;
    $scope.addWorkButton = false;
    // $location.path('/app/myprofile/'+$scope.WorkRecord.profileId+'/edit');
  }


  };

// ==============  SOCIAL ====================

  $scope.delete4 = function(id) {
    ProfileService.deleteSocial(id, function() {
      // clear recs and get whole profile again

    });
  };
  $scope.onSubmit4 = function() {

    $scope.SocialRecord.profileId = $scope.fullprofile.user.id;

    console.log('TYPE : '+ JSON.stringify($scope.SocialRecord) );

    if(!$scope.SocialRecord.id || 0 === $scope.SocialRecord.id.length ){
      delete $scope.SocialRecord.id;
    }

    ProfileService.upsertSocial($scope.SocialRecord, function() {

    });

    ProfileService.getProfile($scope.currentUser.pid, function(response){
      console.log('NEW SOCIAL : '  + JSON.stringify(response));
        //$scope.profile = response;
        $scope.getMe($scope.currentUser.pid);
    });

    $scope.hideSocial = true;
    //$location.path('/app/myprofile/'+$scope.SocialRecord.profileId +'/edit');

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

    $scope.editEmail = function(){
      console.log('edit email');
    };


    $scope.editWork = function(wid){

      angular.forEach($scope.fullprofile.work, function(value, key) {
        console.log( key+': ' + value.id +' = '+wid);
        if(value.id === wid){
          console.log( 'FOUND WORK TO EDIT : '+value );
          $scope.WorkRecord = value;
          $scope.workLookUp = value.companyname;
          angular.element($document[0].querySelector('#work-companylookup')).value(value.companyname);
        }
      });

      if($scope.hideWork){
        $scope.hideWork = false;
      }
      if($scope.addWorkButton){
        $scope.addWorkButton = true;
        //$scope.addWorkButton = $scope.addWorkButton === false ? true: false;
      }
    };

    $scope.editSocial = function(){
      console.log('edit social');
    };




// ==============  GRAB PROFILES ON LOAD ====================


  // setTimeout(function () {
  //     $scope.$apply(function() {
  //
  //       if($scope.currentUser){
  //         console.log('LOGGED IN UID: '+ $scope.currentUser.id );
  //           if(!$scope.currentUser.pid || 0 === $scope.currentUser.pid.length ){
  //             $scope.getUserRecord($scope.currentUser.id);
  //           }else{
  //             $scope.getEntireProfile($scope.currentUser.pid);
  //           }
  //
  //           $scope.fullMeal = 1;
  //       }
  //
  //
  //       });
  // }, 100);


$scope.fullMeal = true;
  $scope.$on('$viewContentLoaded', function(){
    if(!$scope.currentUser){
      console.log('MISSING BASE USER  $scope.currentUser -> LOG IN AGAIN' );
      $location.path('/login');
    }else if((!$scope.fullprofile ||   0 === $scope.fullprofile.length) && ($scope.fullMeal)){
            console.log('NO CURRENT PROFILE');
            if((!$scope.fullprofile || 0 === $scope.fullprofile.length ) ){
              console.log('NO PROFILE ID EITHER');
              $scope.getUserRecord($scope.currentUser.id);
            }else{
              $scope.getEntireProfile($scope.currentUser.pid);
              $scope.fullMeal = false;
            }
        }else{
          if($scope.fullMeal){
            $scope.getEntireProfile($scope.currentUser.pid);
            $scope.fullMeal = false;
          }else{
            console.log('GOT getEntireProfile');
          }
        }

      angular.element($document[0].querySelector('.work-datestart_date')).css('display', 'none');
      angular.element($document[0].querySelector('.work-dateend_date')).css('display', 'none');
      angular.element($document[0].querySelector('.work-title_text')).css('display', 'none');
      angular.element($document[0].querySelector('.work-achievement_text')).css('display', 'none');
      angular.element($document[0].querySelector('.investorForm')).css('display', 'none');
      angular.element($document[0].querySelector('.invest-transaction_text')).css('display', 'none');
      angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', 'none');
      angular.element($document[0].querySelector('.invest-amount2_text')).css('display', 'none');
      angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', 'none');
      angular.element($document[0].querySelector('.invest-press_text')).css('display', 'none');

  });

  //  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ need uploading

  // create a uploader with options

  // $scope.creds = {
  //   bucket: 'vatorprofiles',
  //   access_key: 'your_access_key',
  //   secret_key: 'your_secret_key'
  // };
  //
  // $scope.sizeLimit      = 10585760; // 10MB in Bytes
  // $scope.uploadProgress = 0;
  // $scope.creds          = {};
  //
  // $scope.upload = function() {
  //   AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
  //   AWS.config.region = 'us-east-1';
  //   var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
  //
  //   if($scope.file) {
  //       // Perform File Size Check First
  //       var fileSize = Math.round(parseInt($scope.file.size));
  //       if (fileSize > $scope.sizeLimit) {
  //         toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
  //         return false;
  //       }
  //       // Prepend Unique String To Prevent Overwrites
  //       var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;
  //
  //       var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
  //
  //       bucket.putObject(params, function(err, data) {
  //         if(err) {
  //           toastr.error(err.message,err.code);
  //           return false;
  //         }
  //         else {
  //           // Upload Successfully Finished
  //           toastr.success('File Uploaded Successfully', 'Done');
  //
  //           // Reset The Progress Bar
  //           setTimeout(function() {
  //             $scope.uploadProgress = 0;
  //             $scope.$digest();
  //           }, 4000);
  //         }
  //       })
  //       .on('httpUploadProgress',function(progress) {
  //         $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
  //         $scope.$digest();
  //       });
  //     }
  //     else {
  //       // No File Selected
  //       toastr.error('Please select a file to upload');
  //     }
  //   };
  //
  //   $scope.fileSizeLabel = function() {
  //   // Convert Bytes To MB
  //   return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
  // };
  //
  // $scope.uniqueString = function() {
  //   var text     = '';
  //   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //
  //   for( var i=0; i < 8; i++ ) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //   return text;
  // }



});
