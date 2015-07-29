'use strict';
var app = angular.module('com.module.about');

app.service('AboutService',  ['$state', 'CoreService', 'ProfileService', 'AppAuth' 'Profile', 'User',
'keys', 'Categories', 'Tags', 'Graphs',  'gettextCatalog',
function($state, CoreService, Profile, User, Education, Social, WorkHistory, Team, gettextCatalog) {



  this.upsertCategory = function(catItem, cb) {
    var response = Categories.upsert(catItem, function() {
        console.log('CAT DATA UPSERT : '+JSON.stringify(response));
      cb(response);
    }, function(err) {
      console.log('This cat could not be saved: ') + err);
    });
  };



}]);
