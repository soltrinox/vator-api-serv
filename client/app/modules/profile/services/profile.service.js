'use strict';
var app = angular.module('com.module.profile');

app.service('ProfileService', ['$state', 'CoreService', 'Profile', 'Education', 'gettextCatalog',
function($state,
  CoreService, Profile, Education, gettextCatalog) {

  this.getProfiles = function() {
    return Profile.find();
  };

  this.getProfile = function(pid) {
    console.log('Profile.findById()' + pid);
    return Profile.findById({
      id : pid
    });
  };

  this.upsertProfile = function(profile, cb) {
    Profile.upsert(profile, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Profile saved'), gettextCatalog.getString(
        'Your profile is safe with us!'));
      cb();
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


  this.upsertEducation = function(edu, cb){
    Education.upsert(edu, function(){
      CoreService.toastSuccess(gettextCatalog.getString(
        'Credential saved'), gettextCatalog.getString(
        'Your profile is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving creds '), gettextCatalog.getString(
        'This creds could not be saved: ') + err);
    });
  }


  this.deleteEducation = function(eid, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Education.deleteById(eid, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Cred deleted'), gettextCatalog.getString(
            'Your cred is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting cred'), gettextCatalog.getString(
            'Your cred is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };


}]);
