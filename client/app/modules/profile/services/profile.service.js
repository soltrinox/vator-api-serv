'use strict';
var app = angular.module('com.module.profile');

app.service('ProfileService', ['$state', 'CoreService', 'Profile', 'User',
'Education', 'Social', 'WorkHistory', 'Investment','Team',  'gettextCatalog',
function($state, CoreService, Profile, User, Education, Social, WorkHistory, Investment, Team, gettextCatalog) {

  this.getProfiles = function(id) {
    return Profile.find({ filter:{where: {UUID: id}}});
  };

  this.getProfile = function(id, cb) {
    console.log('get Entire Pro : '+id);
    var response =  Profile.getEntireProfile({id:id}, function(){
    //  console.log('DATA GET ENTIRE : '+JSON.stringify(response));
      cb(response);
    });

  };

  this.getProfileByUUID = function(id, cb) {
    //console.log('find by UUID : '+id);
    var response =  Profile.find({ filter:{where: {UUID: id}, limit : 1}}, function(){
      //console.log('GOT BY UUID : '+ JSON.stringify(response));
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
        //console.log('DATA UPSERT : '+JSON.stringify(response));
      cb(response);
    }, function(err) {

      console.log('ERROR OBJECT: '+ JSON.stringify( err.config.data ) );
      // if(err.config.data && err.config.data.length > 0){
      //    console.log('ERROR OBJECT: '+ JSON.stringify(err.config.data.length) );
      // }

    });
  };

  this.deleteProfile = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {

        CoreService.toastSuccess(gettextCatalog.getString(
            'Profile deletion disable at Service Level'),
            gettextCatalog.getString(
            'Your profile is still alive!'));

        // Profile.deleteById(id, function() {
        //   CoreService.toastSuccess(gettextCatalog.getString(
        //     'Profile deleted'), gettextCatalog.getString(
        //     'Your profile is deleted!'));
        //   cb();
        // }, function(err) {
        //   CoreService.toastError(gettextCatalog.getString(
        //     'Error deleting profile'), gettextCatalog.getString(
        //     'Your profile is not deleted! ') + err);
        // });
      },
      function() {
        return false;
      });
  };

// =========================================================


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

    console.log('##### EXPR workhistory : ' + JSON.stringify(workhistory));


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

  this.deleteWorkHistory = function(hid, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        WorkHistory.deleteById({id : hid}, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Work deleted'), gettextCatalog.getString(
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

};

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


// ==================================

this.upsertInvestments = function(investment, cb) {
  console.log('@@@@ Investment : ' + JSON.stringify(investment));
  Investment.upsert(investment, function() {
    CoreService.toastSuccess(gettextCatalog.getString(
      'Investment saved'), gettextCatalog.getString(
      'Your investment is safe with us!'));
    cb();
  }, function(err) {
    CoreService.toastSuccess(gettextCatalog.getString(
      'Error saving Investment '), gettextCatalog.getString(
      'This investment could not be saved: ') + err);
  });
};

this.deleteInvestment = function(hid, cb) {
  CoreService.confirm(gettextCatalog.getString('Are you sure?'),
    gettextCatalog.getString('Deleting this cannot be undone'),
    function() {
      Investment.deleteById({id : hid}, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Investment deleted'), gettextCatalog.getString(
          'Your investment is deleted!'));
        cb();
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error deleting invesment'), gettextCatalog.getString(
          'Your investment is not deleted! ') + err);
      });
    },
    function() {
      return false;
    });
};



}]);
