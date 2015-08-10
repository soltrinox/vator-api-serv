'use strict';
angular.module('com.module.programs')
  .run(function($rootScope, Program, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Programs'), 'app.programs.list',
      'fa-star');

    Program.find(function(programs) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Programs'),
        'bg-red', 'ion-document-text', programs.length, 'app.programs.list');
    });

  });
