'use strict';
angular.module('com.module.programs')
  .controller('ProgramsCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, Program, ProgramService) {

    $scope.delete = function(id) {
      ProgramsService.deleteProgram(id, function() {
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
    }

    $scope.formFields = [{
      key: 'title',
      type: 'text',
      label: gettextCatalog.getString('Title'),
      required: true
    }, {
      key: 'content',
      type: 'textarea',
      label: gettextCatalog.getString('Content'),
      required: true
    }, {
      key: 'image',
      type: 'text',
      label: gettextCatalog.getString('image'),
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

  });
