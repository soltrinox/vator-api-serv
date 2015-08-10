'use strict';
angular.module('com.module.programs')
  .controller('ProgramsCtrl', function($scope, $rootScope, $location, $state, $routeParams, $stateParams, CoreService,
    FormHelper, gettextCatalog, Program, ProgramService) {

    $scope.delete = function(id) {
      ProgramService.deleteProgram(id, function() {
        $state.reload();
      });
    };

    this.formHelper = new FormHelper(Program);
    $scope.cancel = function() {
      console.log('Cancel');
      console.log(this.formHelper);
      //this.formHelper.cancel('app.programs.list');
    };

    var programId = $stateParams.id;

    if (programId) {
      $scope.program = Program.findById({
        id: programId
      }, function() {}, function(err) {
        console.log(err);
      });
    } else {
      $scope.program = {};

      $scope.programs = Program.find();

    }

    $scope.ProgramObject = {
      Name: '',
      Details:  '',
      Image:  '',
      Owner:  ''
    };


    $scope.formFields = [{
      key: 'Name',
      type: 'text',
      label: gettextCatalog.getString('Name'),
      required: true
    }, {
      key: 'Details',
      type: 'textarea',
      label: gettextCatalog.getString('Details'),
      required: true
    }, {
      key: 'Image',
      type: 'text',
      label: gettextCatalog.getString('Image'),
      required: true
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function() {
      Program.upsert($scope.program, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Program saved'),
          gettextCatalog.getString('Your program is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };


    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
      console.log('Current route name: ' + $location.path());
      // Get all URL parameter
      console.log($routeParams);
    });


  });
