'use strict';
angular.module('com.module.programs')
  .controller('ProgramsCtrl', function($scope, $rootScope, $location, $state, $routeParams, $stateParams, CoreService,
    FormHelper, gettextCatalog, Program, ProgramService, Category) {


      $scope.tags = [];
      $scope.TagFirst = '0';


      $scope.loadItems = function() {
        $scope.categories = [];
        Category.find(function(categories) {
          angular.forEach(categories, function(category) {
            category.products = Category.products({
              id: category.id
            });
            this.push(category);
          }, $scope.categories);
        });
      };


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
      }, function() {
      }, function(err) {
        console.log(err);
      });

      console.log('PROGRAM OBJ 2 \n' + JSON.stringify($scope.ProgramObject));

      // $scope.program.Name = $scope.ProgramObject.Name;
      // var iix = $scope.ProgramObject.Details;
      // $scope.program.Details = iix.body;
      // $scope.program.Image = $scope.ProgramObject.Image;

    } else {
      $scope.program = {};

      $scope.programs = Program.find();

    }

    $scope.ProgramObject = {
        Name: '',
        Desc : '',
        Brief:  '',
        Image:  '',
        Owner:  '',
        adminId : '',
        Cats: '',
        Location : '',
        Tags : [],
        team: {}
      };


    $scope.formFields = [{
      key: 'Name',
      type: 'text',
      label: gettextCatalog.getString('Name'),
      required: true
    },
    {
      key: 'Brief',
      type: 'text',
      label: gettextCatalog.getString('Details'),
      required: true
    }, {
      key: 'Desc',
      type: 'textarea',
      label: gettextCatalog.getString('Description'),
      required: true
    }, {
      key: 'Image',
      type: 'hidden',
      label: gettextCatalog.getString('Image'),
      required: true
    },
    {
      key: 'Cats',
      type: 'hidden',
      required: true
    },
    {
      key: 'Location',
      type: 'hidden',
      required: true
    },

  ];

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


        $scope.ProgramObject.Brief = $scope.program.Brief;
        $scope.ProgramObject.Desc = $scope.program.Desc;
        $scope.ProgramObject.Cats = $scope.program.Cats;
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


    /*   =========ASYNC CATS TYPEAHEAD ======
    *   =====================================
    *   =====================================
    *   =====================================
    *   =====================================
    *
    *   =====================================
    *   =====================================
    *   =====================================
    *   =====================================
    *   =====================================
     */
     $scope.loadCats = function(val) {
       return $http.get('//api.vator.co/api/categories', {
         params: {
           filter: {
               where : {
                 or : [
                     {  name : {
                        like : val
                       }
                     },
                     {   seo : {
                       like : val
                     }
                   }
                 ]
              }
           }
         }
       }).then(function(response){
         return response.data.map(function(item){
           return item;
         });
       });
     };

     $scope.showdetails = function($tag){
         var found = $filter('getByName')($scope.tags, $tag.name);
         if(!found){
             console.log($tag.name + ' NOT FOUND'  );
         }else{
             console.log('FOUND:' + JSON.stringify(found) +' in '+  JSON.stringify($scope.tags) );
         }
     };

     $scope.newTagValue = function($tag){
       console.log('NEW TAG: ' + JSON.stringify($tag) );
       $scope.showdetails($tag);
     };

// LOCATIOnS


$scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formattedAddress;
      });
    });
  };


  });
