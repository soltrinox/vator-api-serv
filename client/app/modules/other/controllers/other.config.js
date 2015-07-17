'use strict';
angular.module('com.module.other')
  .run(function($rootScope, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Other'), 'app.other',
      'fa-file-o');
    // $rootScope.addDashboardBox(gettextCatalog.getString('Other'), 'bg-maroon',
    //    'ion-information', 0, 'app.other.index');

  });
