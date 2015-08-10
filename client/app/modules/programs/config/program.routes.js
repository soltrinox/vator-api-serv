'use strict';

var app = angular.module('com.module.programs');

app.config(function($stateProvider) {
  $stateProvider.state('app.programs', {
    abstract: true,
    url: '/programs',
    templateUrl: 'modules/programs/views/main.html',
    controller: 'ProgramsCtrl',
    controllerAs: 'ctrl'
  }).state('app.programs.list', {
    url: '',
    templateUrl: 'modules/programs/views/list.html',
    resolve: {
      programs: ['ProgramsService', function(ProgramsService) {
        return ProgramsService.getPrograms();
      }]
    },
    controller: function($scope, programs) {
      $scope.programs = programs;
    }
  }).state('app.programs.add', {
    url: '/add',
    templateUrl: 'modules/programs/views/form.html',
    controller: 'ProgramsCtrl'
  }).state('app.programs.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/programs/views/form.html',
    controller: 'ProgramsCtrl'
  }).state('app.programs.view', {
    url: '/:id',
    templateUrl: 'modules/programs/views/view.html',
    resolve: {
      program: ['$stateParams', 'ProgramsService', function($stateParams,
        ProgramsService) {
        return ProgramsService.getProgram($stateParams.id);
      }]
    },
    controller: function($scope, program) {
      $scope.program = program;
    }
  });
});
