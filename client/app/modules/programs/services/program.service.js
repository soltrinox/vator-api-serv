'use strict';
var app = angular.module('com.module.programs');

app.service('ProgramService', ['CoreService', 'gettextCatalog', 'Program', function(
  CoreService, gettextCatalog, Program) {

  this.getprograms = function() {
    return Program.find({
      filter: {
        order: 'created DESC'
      }
    }).$promise;
  };

  this.getProgram = function(id) {
    return Program.findById({
      id: id
    }).$promise;
  };

  this.deleteProgram = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Program.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Item deleted'), gettextCatalog.getString(
            'Your item has been deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString('Oops'),
            gettextCatalog.getString('Error deleting item: ') +
            err);
          cb();
        });
      },
      function() {
        return false;
      });
  };

}]);
