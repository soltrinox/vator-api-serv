'use strict';
var app = angular.module('com.module.profile');

app.run(function($rootScope, Profile, gettextCatalog) {
  $rootScope.addMenu(gettextCatalog.getString('Profile'), 'app.profile.list',
    'fa-rocket');
  //
  // Note.find(function(data) {
  //   $rootScope.addDashboardBox(gettextCatalog.getString('Notes'),
  //     'bg-green', 'ion-clipboard', data.length, 'app.notes.list');
  // });

});
