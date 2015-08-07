'use strict';
var app = angular.module('com.module.profile');

 // $fileUploader,   /// commented in index.html
app.controller('MyProfileCtrl',function($scope, $rootScope, $location, $state, $route,  $routeParams,$stateParams,  $document,
  ProfileService, CoreService, User, gettextCatalog, $http) {

    $scope.prettyPrint = function(msg, obj){
      if(!msg || 0 === msg.length ){
          msg = 'DATA' ;
      }
        console.log( msg + ' : ' + JSON.stringify(obj));
    };

    $scope.lastCurrentUser = {};
    $scope.profileImageUrl = 'http://api.vator.co/uploadprofile/vatorprofilecache';
    $scope.coverImageUrl = 'http://api.vator.co/uploadcover/vatorprofilecache';

    $scope.saveUserRecord = false;
    $scope.hideCompany = true;
    $scope.hideBase = true;
    $scope.hideSocial = true;

    $scope.workLookUp = '';
    $scope.hideWork = true;
    $scope.hideaddWorkButton = false;
    $scope.editingInvestorRecord = false;

    $scope.CompanyRecord = {
      Name: '',
      URL: '',
      profileId : '',
      teamId : ''
    };

    $scope.UserRecord = {
      Name:'',
      Bio:'',
      UUID:'',
      ProfilePic:'https://s3.amazonaws.com/vatorprofilecache/profile.png',
      CoverPic:'https://s3.amazonaws.com/vatorprofilecache/456498.jpg',
      id:''
    };


    $scope.WorkRecord = {
      Type : '',
      companyname: '',
      companyId : '',
      jobtitle : '',
      datestart : '',
      dateend : '',
      profileId : '',
      achieve : '',
      achievements: [{'value':0}],
      id: ''
    };

    $scope.newWorkRecord = function(){
      return  {
        Type : '',
        companyname: '',
        companyId : '',
        jobtitle : '',
        datestart : '',
        dateend : '',
        profileId : '',
        achieve : '',
        achievements: [{'value':0}],
        id: ''
      };
    };


    $scope.InvestorRecord = {
      amount:'',
      date:'',
      profileId:'',
      roundtotal:'',
      valuation:'',
      isipo : 'false',
      id:'',
      transaction:'',
      exitdate:'',
      amount2:'',
      aquirer:'',
      press:'',
      companyname:'',
      companyId : ''
    };

    $scope.newInvestorRecord = function(){
      return {
        amount:'',
        date:'',
        profileId:'',
        roundtotal:'',
        valuation:'',
        isipo : 'false',
        id:'',
        transaction:'',
        exitdate:'',
        amount2:'',
        aquirer:'',
        press:'',
        companyname:'',
        companyId : ''
      };
    };

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

    $scope.fullprofile = [];
    $scope.educations = [];        // ---------
    $scope.portfolio = [];  // ---------
    $scope.medias = [] ;        // ---------
    $scope.workhistory = [] ;     // ---------
    $scope.socials = [] ;        // ---------
    $scope.credentials = [] ;    // ---------
    $scope.contacts = [] ;
    $scope.investments = [];

  // --------------------------------------------------
  // -----------------  FORMLY FIELDS -----------------
  // --------------------------------------------------

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

$scope.workFields =[
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
      required: true
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
      label: 'Valuation (pre-money)',
      required: false
    },{
      key: 'isipo',
      type: 'hidden',
      id : 'invest-isipo',
      uniqueFormId : 'invest-isipo-box',
      label: 'Acquired / IPO',
      required: false
    },{
      key: 'companyname',
      type: 'hidden',
      id : 'invest-companyname',
      uniqueFormId : 'invest-companyname-box',
      required: true
    },{
      key: 'companyid',
      type: 'hidden',
      id : 'invest-companyid',
      uniqueFormId : 'invest-companyid-box',
      required: false
    }
  ];
$scope.investFields2 =
    [{
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
      label:'Exit Date',
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
      label:'Aquirer name',
      required: false
    },
    {
      key: 'press',
      type: 'text',
      id : 'invest-press',
      uniqueFormId : 'invest-press-box',
      label:'Press release / published report',
      required: false
    }
];

$scope.socialFields = [
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


$scope.teamFields = [
  {
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



  // ----------------------------------------------
  // -----------------  FUNCTIONS -----------------
  // ----------------------------------------------

  $scope.sliceProfile = function (pro){
    $scope.prettyPrint('inProfile',pro.user.id);
    if(pro){
      $scope.educations = pro.edu;
      $scope.portfolio = pro.companies ;
      $scope.medias = pro.medias ;
      $scope.workhistory = pro.work ;
      $scope.investments = pro.invest;
      if(pro.social.length > 0){
        $scope.SocialRecord = pro.social[0] ;
        $scope.socials.push($scope.SocialRecord);
      }
      $scope.credentials = pro.creds ;
      $scope.contacts = pro.contact ;
      console.log('SLICED ENTIRE PROFILE PID:' + $scope.currentUser.pid );
    }else{
      console.log('missing profile for slice');
    }
  };




  $scope.toggleCompany = function(id) {
    $scope.hideCompany = $scope.hideCompany === false ? true: false;
    id = null;
  };


  $scope.getTeams = function(val) {
    //  http://api.vator.co/api/Teams?filter={%20%22where%22%20:%20{%20%22Name%22%20:%20{%22like%22%20:%22Co%22%20}%20}%20}
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
      // $scope.prettyPrint('Company : ' , response);
      return response.data.map(function(item){
        return item.name;
      });
    });
  };


// ----------------------------------------------
// -----------------  FUNCTIONS -----------------
// ----------------------------------------------

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

  $location.path('/app/files/list');id = null;
};


// ----------------- PRIMARY PROFILE FUNCTIONS -----------------

  $scope.delete = function(id) {
    // ProfileService.deleteProfile(id, function() {
    //   $state.go('^.list');
    // });
    id = null;
  };


  $scope.getEntireProfile = function(thepId){
    console.log('getEntireProfile PROFILE ID: '+ thepId);

    ProfileService.getProfile(thepId, function(response){
        $scope.prettyPrint('UPDATED FULL PROFILE : \n' ,response);
        $scope.fullprofile = response.profile;
        $scope.currentUser.pid = response.profile.user.id;

        var random = (new Date()).toString();
        $scope.currentUser.ProfilePic = response.profile.user.ProfilePic ;
        $scope.currentUser.CoverPic = response.profile.user.CoverPic ;

        $scope.UserRecord.Name = response.profile.user.Name;
        $scope.UserRecord.Bio = response.profile.user.Bio;
        $scope.UserRecord.UUID = response.profile.user.UUID;
        $scope.UserRecord.ProfilePic = response.profile.user.ProfilePic;
        if(!response.profile.user.ProfilePic || 0 === response.profile.user.ProfilePic){
          $scope.UserRecord.ProfilePic = 'https://s3.amazonaws.com/vatorprofilecache/profile.png';
        }
        $scope.UserRecord.CoverPic = response.profile.user.CoverPic;
        if(!response.profile.user.CoverPic || 0 === response.profile.user.CoverPic.length){
          $scope.UserRecord.CoverPic = 'https://s3.amazonaws.com/vatorprofilecache/456498.jpg';
        }
        $scope.UserRecord.id = response.profile.user.id;
        $scope.sliceProfile(response.profile);

        if($scope.currentUser !== $scope.lastCurrentUser){
          $scope.saveCurrentUser($scope.currentUser);
          $scope.lastCurrentUser = $scope.currentUser;
        }


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
          // if we can detect a correct PROFILE.ID than move forward
          // with the correct assignment and getting the full object
          if(!response.id || 0 === response.id.length){
            $scope.prettyPrint('USER.RECORD : ',$scope.UserRecord );
            $scope.prettyPrint('CURRENT.USER : ',$scope.currentUser );
            $scope.UserRecord.Name = $scope.currentUser.username ;
            $scope.UserRecord.UUID = $scope.currentUser.id;

            if(!$scope.currentUser.ProfilePic || 0 === $scope.currentUser.ProfilePic.length){
              if(!$scope.UserRecord.ProfilePic || 0 === $scope.UserRecord.ProfilePic.length){
                $scope.UserRecord.ProfilePic = 'https://s3.amazonaws.com/vatorprofilecache/profile.png';
                $scope.currentUser.ProfilePic = 'https://s3.amazonaws.com/vatorprofilecache/profile.png';
              }
            }else{
              $scope.UserRecord.ProfilePic = $scope.currentUser.ProfilePic;
            }

            if(!$scope.currentUser.CoverPic || 0 === $scope.currentUser.CoverPic.length){
              if(!$scope.UserRecord.CoverPic || 0 === $scope.UserRecord.CoverPic.length){
                $scope.UserRecord.CoverPic = 'https://s3.amazonaws.com/vatorprofilecache/456498.jpg';
                $scope.currentUser.CoverPic = 'https://s3.amazonaws.com/vatorprofilecache/456498.jpg';
              }
            }else{
              $scope.UserRecord.CoverPic = $scope.currentUser.CoverPic;
            }

            // if the user is new and no PROFILE record exists
            // we need to delete the empty ID in order to create
            if(!$scope.UserRecord.id || 0 === $scope.UserRecord.id.length){
              delete $scope.UserRecord.id;
            }
            // add the UUID for the current user here
            ProfileService.upsertProfile($scope.UserRecord, function(response) {
            $scope.prettyPrint('UPSERT RESPONSE' ,response);
              if(!response.id || 0 === response.id.length){
                $scope.prettyPrint('NO RESPONSE ID. USING currentUser: ', $scope.currentUser);
                $scope.getEntireProfile($scope.currentUser.pid);
              }
            });
          }else{
            // lets set our scope id references here
            $scope.profile = response;
            $scope.currentUser.pid = response.id;
            var random = (new Date()).toString();



            if(!$scope.currentUser.ProfilePic || 0 === $scope.currentUser.ProfilePic.length){
              if(!$scope.UserRecord.ProfilePic || 0 === $scope.UserRecord.ProfilePic.length){
                $scope.UserRecord.ProfilePic = response.ProfilePic;
                $scope.currentUser.ProfilePic = response.ProfilePic ;
              }
            }else{
              $scope.UserRecord.ProfilePic = response.ProfilePic;
              $scope.currentUser.ProfilePic = response.ProfilePic ;
            }

            if(!$scope.currentUser.CoverPic || 0 === $scope.currentUser.CoverPic.length){
              if(!$scope.UserRecord.CoverPic || 0 === $scope.UserRecord.CoverPic.length){
                $scope.UserRecord.CoverPic = response.CoverPic;
                $scope.currentUser.CoverPic = response.CoverPic;
              }
            }else{
              $scope.UserRecord.CoverPic = response.CoverPic;
              $scope.currentUser.CoverPic = response.CoverPic;
            }


            // fetch the full object and move along
            if(!$scope.fullprofile.user || 0 === $scope.fullprofile.user.length){
              $scope.getEntireProfile($scope.currentUser.pid);
            }
            if($scope.currentUser !== $scope.lastCurrentUser){
              $scope.saveCurrentUser($scope.currentUser);
              $scope.lastCurrentUser = $scope.currentUser;
            }
          }

        });
      }
  };

  $scope.upsertProfileRecord = function( userRecord){
    if ((!$scope.UserRecord.UUID) || (0 === $scope.UserRecord.UUID.length)) {
      $scope.UserRecord.UUID =   $scope.currentUser.id;
    }

      ProfileService.upsertProfile($scope.UserRecord, function(response) {
          $scope.prettyPrint('SUCCESS: UPSERT RESPONSE W/ UUID\n',response);
          $scope.profile = response;
          $scope.currentUser.pid = response.id;
          $scope.getEntireProfile($scope.currentUser.pid );
      });

    userRecord = null;
  };

  $scope.onSubmitProfile = function() {
    // run validation here
    if (!$scope.currentUser.id || 0 === $scope.currentUser.id.length) {
      console.log('PROFILE MISSING BASE USER 1 $scope.currentUser -> LOG IN AGAIN' );
      $location.path('/login');
    }else if (!$scope.currentUser.pid || 0 === $scope.currentUser.pid.length) {
      $scope.prettyPrint('currentUser.pid NOT SET : \n',$scope.currentUser );
      // get the profile by uuid
      $scope.getUserRecord($scope.currentUser.id);

    }else if (((!$scope.UserRecord.id) || (0 === $scope.UserRecord.id.length)) &&  $scope.currentUser.pid.length > 0 ) {
    $scope.prettyPrint('UPSERT USER RECORD ID NOT SET : \n',$scope.UserRecord );

      if($scope.currentUser.pid){
        $scope.UserRecord.id = $scope.currentUser.pid;
      }
      if ($scope.currentUser.pid) {
        $scope.UserRecord.id = $scope.currentUser.pid;
      }

        $scope.upsertProfileRecord($scope.UserRecord);
        $scope.hideaddWorkButton = false;
        $scope.hideBase = true;
        $scope.saveUserRecord = false;
    }else{

      // verify its not a new record
      if(($scope.UserRecord.id.length === 0) || (!$scope.UserRecord.id)){
        delete $scope.UserRecord.id;
      }
      // send the object on down the road to server
      $scope.upsertProfileRecord($scope.UserRecord);
      $scope.hideaddWorkButton = false;
      $scope.hideBase = true;
    }
};



// ==============  INVESTMENT ====================

$scope.isipo = false;

$scope.$watchCollection('InvestorRecord', function(newValue, oldValue){
    // $scope.prettyPrint('!!! WATCH INVEST  OLD!!!!\n',oldValue);
    // $scope.prettyPrint('!!! WATCH INVEST  NEW!!!! \n',newValue);
});



$scope.yesIpo = function(){

    $scope.InvestorRecord.isipo = 'true';
    $scope.isipo = true;
    console.log('isipo : ' + $scope.isipo);
    console.log('IR ipo : ' +$scope.InvestorRecord.isipo );
    angular.element($document[0].querySelector('.investorForm2')).css('display', 'block');
    angular.element($document[0].querySelector('.invest-transaction_text')).css('display', 'block' );
    angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', 'block');
    angular.element($document[0].querySelector('.invest-amount2_text')).css('display', 'block');
    angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', 'block');
    angular.element($document[0].querySelector('.invest-press_text')).css('display', 'block');
};

$scope.noIpo = function(){

  $scope.InvestorRecord.isipo = 'false';
  $scope.isipo = false;
  console.log('isipo : ' + $scope.isipo);
    console.log('IR ipo : ' +$scope.InvestorRecord.isipo );
  angular.element($document[0].querySelector('.investorForm2')).css('display', 'none');
  angular.element($document[0].querySelector('.invest-transaction_text')).css('display', 'none' );
  angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', 'none');
  angular.element($document[0].querySelector('.invest-amount2_text')).css('display', 'none');
  angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', 'none');
  angular.element($document[0].querySelector('.invest-press_text')).css('display', 'none');
};


$scope.startNewInvestment = function(){
  $scope.WorkRecord = $scope.newWorkRecord();
  $scope.WorkRecord.Type = '003';
  $scope.InvestorRecord = $scope.newInvestorRecord();
  $scope.isipo = false;
};


$scope.deleteInvestment = function(iid) {
  ProfileService.deleteInvestment(iid, function() {});
};

$scope.onSubmitInvest = function() {
    $scope.prettyPrint('$scope.InvestorRecord : ',$scope.WorkRecord );
    $scope.InvestorRecord.profileId =  $scope.fullprofile.user.id;
    $scope.InvestorRecord.companyname =  $scope.workLookUp;

    // TODO: get the value for the companyId
    //   add it to to the $scope.InvestorRecord

    if(!$scope.currentUser.pid || 0 ===  $scope.currentUser.pid.length){
      if( !$scope.fullprofile.user.id || 0 ===  $scope.fullprofile.user.id.length ){
          console.log('MISSING USER ACCOUNT RESTART APP');
          $location.path('/login');
      }else{
            $scope.InvestorRecord.profileId = $scope.fullprofile.user.id;
            $scope.upsertInvestmentRecord($scope.InvestorRecord);
            $scope.workLookUp = '';
            $scope.hideWork = true;
            $scope.hideaddWorkButton = false;
            $scope.saveUserRecord = false;
      }
    }else{
      $scope.upsertInvestmentRecord($scope.InvestorRecord);
      $scope.InvestorRecord = $scope.newInvestorRecord();
      $scope.workLookUp = '';
      $scope.hideWork = true;
      $scope.hideaddWorkButton = false;
    }
};

$scope.upsertInvestmentRecord = function(investorRecord){
  if(!$scope.InvestorRecord.id || 0 === $scope.InvestorRecord.id.length ){
      delete $scope.InvestorRecord.id;
  }
  ProfileService.upsertInvestments($scope.InvestorRecord, function() {
    $scope.fullprofile.invest.push($scope.InvestRecord);
    $scope.InvestorRecord = $scope.newInvestorRecord();
    $scope.getEntireProfile($scope.currentUser.pid);
  });
  $scope.hideWork = true;
  $scope.hideaddWorkButton = false;

  investorRecord = null;
};

$scope.editInvestments = function(iid){

  //$scope.WorkRecord = $scope.newWorkRecord();
  $scope.WorkRecord.Type = '003';
  $scope.hideWork = false;
  $scope.hideaddWorkButton = true;

  $scope.prettyPrint('INVEST OBJ: ',$scope.fullprofile.invest);
  angular.forEach($scope.fullprofile.invest, function(value, key) {
    console.log( key+': ' + value.id +' = '+iid);
    if(value.id === iid){
      $scope.prettyPrint( 'SELECTED INVEST TO EDIT : ',value );
      $scope.InvestorRecord = value;
      if(!value.isipo || 0 === value.isipo.length){
          $scope.prettyPrint( 'IPO NOT SET');
      }else{
        $scope.InvestorRecord.isipo = value.isipo;
        if(value.isipo === 'true'){
          $scope.yesIpo();
        }else if(value.isipo === 'false'){
          $scope.noIpo();
        }
      }

      // TODO: check on grabbing the ID  ??
      var elem = angular.element($document[0].querySelector('#work-companylookup'));
      elem.val(value.companyname);
      $scope.workLookUp = value.companyname;

    }
  });
};

$scope.onSubmitExperience = function(){
  if($scope.WorkRecord.Type !== '003'){
    $scope.onSubmitWorkRecord();
  }else{
    $scope.onSubmitInvest();
  }
};

// ==============  WORK HISTORY ====================


$scope.$watchCollection('WorkRecord', function(newValue, oldValue){
    // $scope.prettyPrint('!!! WATCH WORK  OLD!!!!\n',oldValue);
     $scope.prettyPrint('!!! WATCH WORK  NEW!!!! \n',newValue);

    $scope.swapipo = 'none';

  if($scope.WorkRecord.Type === '003'){
    if(newValue.Type !== oldValue.Type){
      console.log('$scope.WorkRecord.TYPE INVESTOR');
      angular.element($document[0].querySelector('.work-datestart_date')).css('display', 'none');
      angular.element($document[0].querySelector('.work-dateend_date')).css('display', 'none');
      angular.element($document[0].querySelector('.work-title_text')).css('display', 'none');
      angular.element($document[0].querySelector('.work-achievement_text')).css('display', 'none');
      angular.element($document[0].querySelector('.investorForm')).css('display', 'block');
      if($scope.InvestorRecord.isipo === 'true'){ $scope.swapipo = 'block'; }else{ $scope.swapipo = 'none';}
      angular.element($document[0].querySelector('.invest-transaction_text')).css('display', $scope.swapipo );
      angular.element($document[0].querySelector('.invest-exitdate_date')).css('display', $scope.swapipo);
      angular.element($document[0].querySelector('.invest-amount2_text')).css('display', $scope.swapipo);
      angular.element($document[0].querySelector('.invest-aquirer_text')).css('display', $scope.swapipo);
      angular.element($document[0].querySelector('.invest-press_text')).css('display', $scope.swapipo);
    }
    $scope.saveUserRecord = false;
  }else if(($scope.WorkRecord.Type === '001') || ($scope.WorkRecord.Type === '002')){
    console.log('$scope.WorkRecord.TYPE EMPLOYEE');
    angular.element($document[0].querySelector('.work-datestart_date')).css('display', 'block');
    angular.element($document[0].querySelector('.work-dateend_date')).css('display', 'block');
    angular.element($document[0].querySelector('.work-title_text')).css('display', 'block');
    angular.element($document[0].querySelector('.work-achievement_text')).css('display', 'block');
    angular.element($document[0].querySelector('.investorForm')).css('display', 'none');
    angular.element($document[0].querySelector('.investorForm2')).css('display', 'none');
  }else if(($scope.WorkRecord.Type === '004') || ($scope.WorkRecord.Type === '005')){
    console.log('$scope.WorkRecord.TYPE BOARD');
    angular.element($document[0].querySelector('.work-datestart_date')).css('display', 'block');
    angular.element($document[0].querySelector('.work-dateend_date')).css('display', 'block');
    angular.element($document[0].querySelector('.work-title_text')).css('display', 'none');
    angular.element($document[0].querySelector('.work-achievement_text')).css('display', 'block');
    angular.element($document[0].querySelector('.investorForm')).css('display', 'none');
    angular.element($document[0].querySelector('.investorForm2')).css('display', 'none');
  }else{
    console.log('$scope.WorkRecord.Type NOT SET');
  }
});

  $scope.deleteWork = function(id) {
    ProfileService.deleteWorkHistory(id, function() {
    });
  };

$scope.onSubmitWorkRecord = function() {
    $scope.prettyPrint('$scope.WorkRecord : ',$scope.WorkRecord );
    if( !$scope.currentUser.pid || 0 ===  $scope.currentUser.pid.length ){
        console.log('MISSING USER ACCOUNT RESTART APP');
    }else{
      if(!$scope.WorkRecord.profileId){
        $scope.WorkRecord.profileId =  $scope.currentUser.pid;
      }
      if(!$scope.WorkRecord.id || 0 === $scope.WorkRecord.id.length ){
          delete $scope.WorkRecord.id;
      }

      ProfileService.upsertWorkHistory($scope.WorkRecord, function() {
        $scope.fullprofile.work.push($scope.WorkRecord);
        $scope.WorkRecord = $scope.newWorkRecord();
        $scope.getEntireProfile($scope.currentUser.pid);
      });

      $scope.WorkRecord = $scope.newWorkRecord();
      $scope.workLookUp = '';
      $scope.hideWork = true;
      $scope.hideaddWorkButton = false;
      $scope.saveUserRecord = false;
    }
};

$scope.editWork = function(wid){

  angular.forEach($scope.fullprofile.work, function(value, key) {
    console.log( key+': ' + value.id +' = '+wid);
    if(value.id === wid){
      //  TODO : got to get the whole object
      $scope.prettyPrint( 'FOUND WORK TO EDIT ', value );
      $scope.WorkRecord = value;
      $scope.workLookUp = value.companyname;
      var elem = angular.element($document[0].querySelector('#work-companylookup'));
      elem.val(value.companyname);
      if(!value.Type || 0 === value.Type.length){
        $scope.WorkRecord.Type = '001';
      }
    }
  });

    $scope.hideWork = false;
    $scope.hideaddWorkButton = true;
};

$scope.startNewExperienceRecord = function(id) {

    $scope.WorkRecord = $scope.newWorkRecord();
    $scope.InvestorRecord = $scope.newInvestorRecord();

    angular.element($document[0].querySelector('.investorForm')).css('display', 'none');
    angular.element($document[0].querySelector('.work-datestart_date')).css('display', 'none');
    angular.element($document[0].querySelector('.work-dateend_date')).css('display', 'none');
    angular.element($document[0].querySelector('.work-title_text')).css('display', 'none');
    angular.element($document[0].querySelector('.work-achievement_text')).css('display', 'none');

  $scope.hideWork =  false;
  $scope.hideaddWorkButton  = true;
  id = null;
};

  $scope.onCompanySelect = function(item, model, label){
        $scope.prettyPrint('MODEL',model);
        $scope.WorkRecord.companyname = model;
        $scope.workLookUp = model;
    label = null;
  };

  $scope.lookCompany = function(val){
    // TODO:  set the id of the record
      $scope.workLookUp = val;
      $scope.WorkRecord.companyname = $scope.workLookUp;
  };

  $scope.cancelWork = function() {
     $scope.WorkRecord = $scope.newWorkRecord();
     $scope.InvestorRecord = $scope.newInvestorRecord();
     $scope.workLookUp = '';
     $scope.saveUserRecord = false;
     $scope.hideWork = true; //$scope.hideWork === false ? true: false;
     $scope.hideaddWorkButton = false; //= $scope.hideaddWorkButton === false ? true: false;
     angular.element($document[0].querySelector('.investorForm')).css('display', 'none');
     angular.element($document[0].querySelector('.investorForm2')).css('display', 'none');
  };

// ==============  SOCIAL ====================


  $scope.toggleSocial = function(id) {
    $scope.hideSocial = $scope.hideSocial === false ? true: false;
  id = null;};


  $scope.deleteSocial = function(id) {
    ProfileService.deleteSocial(id, function() {
      // clear recs and get whole profile again
    });
  };

  $scope.onSubmitSocial = function() {
    $scope.SocialRecord.profileId = $scope.fullprofile.user.id;
    $scope.prettyPrint('TYPE : ',$scope.SocialRecord );
    if(!$scope.SocialRecord.id || 0 === $scope.SocialRecord.id.length ){
      delete $scope.SocialRecord.id;
    }
    ProfileService.upsertSocial($scope.SocialRecord, function() {
      $scope.getEntireProfile($scope.currentUser.pid);
    });

    $scope.hideSocial = true;
  };

  // ==============  EDIT TEAM FUNCTIONS ====================


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

  // ----------------- PRIMARY EMAIL FUNCTIONS -----------------

$scope.editEmail = function(){
  console.log('edit email');
};

$scope.editSocial = function(){
  console.log('edit social');
};


// ==============  PROFILE CONTROLLER ON LOAD ====================


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
      console.log('PROFILE MISSING BASE USER 2  $scope.currentUser -> LOG IN AGAIN' );
      $location.path('/login');
    }else if((!$scope.fullprofile ||   0 === $scope.fullprofile.length) && ($scope.fullMeal)){
            console.log('NO CURRENT PROFILE');
            $scope.getEntireProfile($scope.currentUser.pid);
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

  $scope.uploadProfilePic = function(files) {
      var fd = new FormData();
      //Take the first selected file
      fd.append('file', files[0]);
      console.log('FILE: '+files[0]);
      var go = $scope.profileImageUrl + '/' + $scope.currentUser.pid;
      $http.post(go, fd, {
          withCredentials: true,
          dataType: 'jsonp',
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
      }).success( function(response) {
        console.log(response);
        var imgName = response.result.name;
        var imgURL = 'https://vator.imgix.net/'+ imgName  +'?w=200&h=200&fm=png32&fit=facearea&faceindex=1&facepad=1.5';
        var random = (new Date()).toString();
        $scope.masterUser.ProfilePic = imgURL ;
        $scope.currentUser.ProfilePic = imgURL ;
        $scope.UserRecord.ProfilePic = imgURL ;

        if($scope.currentUser !== $scope.lastCurrentUser){
          $scope.saveCurrentUser($scope.currentUser);
          $scope.lastCurrentUser = $scope.currentUser;
        }

        var pid = response.pid;
      }).error(  function(err) {
        console.log(err);
      } );

  };

  $scope.uploadCoverPic = function(files) {
      var fd = new FormData();
      //Take the first selected file
      fd.append('file', files[0]);
        console.log('FILE: '+files[0]);
      var go = $scope.profileImageUrl + '/' + $scope.currentUser.pid;
      $http.post(go , fd, {
          withCredentials: true,
          dataType: 'jsonp',
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
      }).success( function(response) {
        console.log(response);
        var imgName = response.result.name;
        var imgURL = 'https://vator.imgix.net/'+  imgName +'?w=850&h=315&fm=png32&fit=crop';
        $scope.currentUser.CoverPic = imgURL;
        $scope.masterUser.CoverPic = imgURL;
        $scope.UserRecord.CoverPic = imgURL;
        var pid = response.pid;
        // should it auto update on change ?
        // is it making it tot he server UserRecord ?
      }).error(  function(err) {
        console.log(err);
      } );

  };



});
