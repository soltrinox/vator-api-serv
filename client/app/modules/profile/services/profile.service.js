'use strict';
var app = angular.module('com.module.profile');

app.service('ProfileService', ['$state', 'CoreService', 'Profile', 'User',
'Education', 'Social', 'WorkHistory', 'Team',  'gettextCatalog',
function($state, CoreService, Profile, User, Education, Social, WorkHistory, Team, gettextCatalog) {

  this.getProfiles = function(id) {
    return Profile.findOne({ filter:{where: {UUID: id}}});
  };

  this.getProfile = function(id, cb) {
    console.log('get Entire Pro : '+id);
    var response =  Profile.getEntireProfile({id:id}, function(){
      console.log('DATA GET ENTIRE : '+JSON.stringify(response));
      cb(response);
    });

  };

  this.getProfileByUUID = function(id, cb) {
    console.log('find by UUID : '+id);
    var response =  Profile.findOne({ filter:{where: {UUID: id}}}, function(){
      console.log('GOT BY UUID : '+ JSON.stringify(response));
      cb(response);
    }, function(err) {
        console.log('NO PROFILE WITH UUID : '+ JSON.stringify(id));
        cb(response);
    });

  };

  this.upsertProfile = function(profile, cb) {
    var response = Profile.upsert(profile, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Profile saved'), gettextCatalog.getString(
        'Your profile is safe with us!'));
        console.log('DATA UPSERT : '+JSON.stringify(response));
      cb(response);
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving profile '), gettextCatalog.getString(
        'This profile could not be saved: ') + err);
    });
  };

  this.deleteProfile = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Profile.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Profile deleted'), gettextCatalog.getString(
            'Your profile is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting profile'), gettextCatalog.getString(
            'Your profile is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

// =========================================================

  // this.getEducations = function() {
  //   return Education.find();
  // };
  //
  // this.getSingleEducationRecord = function(eid) {
  //   console.log('Edcuation.findById()' + eid);
  //   return Education.findById({
  //     id : eid
  //   });
  // };
  //
  // this.upsertEducation = function(creds, cb) {
  //   Education.upsert(creds, function() {
  //     CoreService.toastSuccess(gettextCatalog.getString(
  //       'Credentials saved'), gettextCatalog.getString(
  //       'Your creds is safe with us!'));
  //     cb();
  //   }, function(err) {
  //     CoreService.toastSuccess(gettextCatalog.getString(
  //       'Error saving credentials '), gettextCatalog.getString(
  //       'This creds could not be saved: ') + err);
  //   });
  // };
  //
  // this.deleteEducation = function(id, cb) {
  //   CoreService.confirm(gettextCatalog.getString('Are you sure?'),
  //     gettextCatalog.getString('Deleting this cannot be undone'),
  //     function() {
  //       Education.deleteById(id, function() {
  //         CoreService.toastSuccess(gettextCatalog.getString(
  //           'Creds deleted'), gettextCatalog.getString(
  //           'Your creds is deleted!'));
  //         cb();
  //       }, function(err) {
  //         CoreService.toastError(gettextCatalog.getString(
  //           'Error deleting creds'), gettextCatalog.getString(
  //           'Your creds is not deleted! ') + err);
  //       });
  //     },
  //     function() {
  //       return false;
  //     });
  // };

// =========================================================

  this.getSocials = function() {
    return Social.find();
  };

  this.getSingleSocialRecord = function(sid) {
    console.log('Social.findById()' + sid);
    return Social.findById({
      id : sid
    });
  };

  this.upsertSocial = function(socl, cb) {
    Social.upsert(socl, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Social saved'), gettextCatalog.getString(
        'Your creds is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving social '), gettextCatalog.getString(
        'This social could not be saved: ') + err);
    });
  };

  this.deleteSocial = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Social.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Social deleted'), gettextCatalog.getString(
            'Your social is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting social'), gettextCatalog.getString(
            'Your social is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };


// =========================================================

  this.getWorkHistorys = function() {
    return WorkHistory.find();
  };

  this.getSingleWorkHistoryRecord = function(wid) {
    console.log('WorkHistory.findById()' + wid);
    return WorkHistory.findById({
      id : wid
    });
  };

  this.upsertWorkHistory = function(workhistory, cb) {
    WorkHistory.upsert(workhistory, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'WorkHistory saved'), gettextCatalog.getString(
        'Your work history is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving WorkHistory '), gettextCatalog.getString(
        'This work history could not be saved: ') + err);
    });
  };

  this.deleteWorkHistory = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        WorkHistory.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Creds deleted'), gettextCatalog.getString(
            'Your work history is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting creds'), gettextCatalog.getString(
            'Your work history is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };


// =========================================================

this.getCompanyMembers = function (comp){
  // INTERNAL. Use Team.members.link() instead.
  // "::link::Team::members": {
  //   params: {
  //   'fk': '@fk'
  //   },
  //   url: urlBase + "/Teams/:id/members/rel/:fk",
  //   method: "PUT"
  // }


  //  Team.members.link()

  return Team.members({id: '55b1a2f141ed6e575486928e'});

}

this.upsertCompany = function(company, cb) {

  Team.members.link(company, function() {
    CoreService.toastSuccess(gettextCatalog.getString(
      'Assoc saved'), gettextCatalog.getString(
      'Your assoc is safe with us!'));
    cb();
  }, function(err) {
    CoreService.toastSuccess(gettextCatalog.getString(
      'Error saving Assoc '), gettextCatalog.getString(
      'This assoc could not be saved: ') + err);
  });
};

}]);
