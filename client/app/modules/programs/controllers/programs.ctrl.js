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
      $scope.ProgramObject = Program.findById({
        id: programId
      }, function() {}, function(err) {
        console.log(err);
      });

      $scope.program.Name = $scope.ProgramObject.Name;
      $scope.program.Details = $scope.ProgramObject.Details.body;
      $scope.program.Image = $scope.ProgramObject.Image;

    } else {
      $scope.program = {};

      $scope.programs = Program.find();

    }

    $scope.ProgramObject = {
      Name: '',
      Details:  '',
      Image:  '',
      Owner:  '',
      adminId : ''
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

      // when we create a new program always create a new admins (Group object)
      // then we add the current user to that Admin Object
      // save the group object and or update on upsert at the program object on API server

        $scope.ProgramObject.Name =   $scope.program.Name;
        var obj1 = { body : $scope.program.Details }
        $scope.ProgramObject.Details =  obj1 ;
        $scope.ProgramObject.Image =   $scope.program.Image;
        $scope.ProgramObject.Owner = $scope.currentUser.pid;
        // TODO: this should pull from the selected programs admins list
        $scope.ProgramObject.adminId = '55c8ddf6a2abdc8a0672544e';

      Program.upsert($scope.ProgramObject , function() {
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
