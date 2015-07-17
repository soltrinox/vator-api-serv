'use strict';
var app = angular.module('com.module.notes');

app.service('ProfilesService', ['$state', 'CoreService', 'Profile', 'gettextCatalog',
function($state,
  CoreService, Profile, gettextCatalog) {

  this.getProfiles = function() {
    return Profile.find();
  };

  this.getProfile = function(id) {
    return Profile.findById({
      id: id
    });
  };

  this.upsertProfile = function(note, cb) {
    Profile.upsert(note, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Profile saved'), gettextCatalog.getString(
        'Your note is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving note '), gettextCatalog.getString(
        'This note could no be saved: ') + err);
    });
  };

  this.deleteProfile = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Profile.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Profile deleted'), gettextCatalog.getString(
            'Your note is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting note'), gettextCatalog.getString(
            'Your note is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

}]);
