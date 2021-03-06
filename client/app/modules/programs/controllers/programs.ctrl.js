'use strict';
angular.module('com.module.programs')
.filter('getItemName', function() {
  return function(input, name) {
    if(typeof (input) === 'undefined'){
      // input is empty
    }else{
      var i=0, len=input.length;
      for (; i<len; i++) {
        if (input[i].name === name) {
          return input[i];
        }
      }
    }
    return null;
  };
})
.controller('ProgramsCtrl', function($scope, $rootScope, $location, $http, $filter, $state, $routeParams,  $modal,  $stateParams, CoreService,
    FormHelper, gettextCatalog, Program,  ProgramService, Category) {


      $scope.tags = [];
      $scope.TagFirst = '0';
      $scope.workLookUp = '';
      $scope.program = {};

      $scope.ProgramObject = {
          Name: '',
          Desc : '',
          Brief:  '',
          Image:  '',
          Owner:  '',
          adminId : '',
          Cats: '',
          location : '',
          Tags : '',
          Company : '',
          team: ''
        };

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

      $scope.onCompanySelect = function(item, model, label){
            $scope.ProgramObject.Company = model;
            $scope.workLookUp = model;
            label = null;
      };

      $scope.lookCompany = function(val){
        // TODO:  set the id of the record
          $scope.workLookUp = val;
      };

      $scope.getCompanyProjects = function(val) {
        return $http.get('//api.vator.co/api/products', {
          params: {
            filter: {
                where : {
                  name : {
                    like : val
                  }
                }
            }
          }
        }).then(function(response){
          // $scope.prettyPrint('Company : ' , response);
          return response.data.map(function(item){
            return item.name;
          });
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
      Program.findById({
        id: programId
      }, function(response) {
        console.log('PROGRAM OBJ 2 \n' + JSON.stringify(response));
        $scope.tags = response.Cats;
        $scope.workLookUp = response.Company;
        $scope.ProgramObject = response;
        $scope.program = response;
      }, function(err) {
        console.log(err);
      });



    } else {
      $scope.program = {};

      $scope.programs = Program.find();

    }




    $scope.formFields = [{
      key: 'Name',
      type: 'text',
      label: gettextCatalog.getString('Program Name'),
      required: true
    },
    {
      key: 'Brief',
      type: 'text',
      label: gettextCatalog.getString('Short Description'),
      required: false
    }, {
      key: 'Desc',
      type: 'hidden',
      label: gettextCatalog.getString('Long Description'),
      required: false
    }, {
      key: 'Image',
      type: 'hidden',
      label: gettextCatalog.getString('Image'),
      required: false
    }
  ];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

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

      $scope.ok = function () {
        $scope.onSubmit();
      };

      $scope.cancel = function () {
        $rootScope.modalInstance.dismiss('cancel');
      };

    $scope.onSubmit = function() {
      // $rootScope.masterUser = $scope.currentUser;
      // when we create a new program always create a new admins (Group object)
      // then we add the current user to that Admin Object
      // save the group object and or update on upsert at the program object on API server

        $scope.ProgramObject.Name =   $scope.program.Name;
        $scope.ProgramObject.Company = $scope.workLookUp;
        $scope.ProgramObject.location = $scope.program.location;
        $scope.ProgramObject.Brief = $scope.program.Brief;
        $scope.ProgramObject.Desc = $scope.program.Desc;
        $scope.ProgramObject.Cats = $scope.tags;
        $scope.ProgramObject.Tags = $scope.tags;
        $scope.ProgramObject.Image =   $scope.program.Image;
        $scope.ProgramObject.Owner = $rootScope.masterUser.pid;
        // TODO: this should pull from the selected programs admins list
        $scope.ProgramObject.adminId = $rootScope.masterUser.pid;
        console.log('FULL PROGRAM'+ JSON.stringify($scope.ProgramObject));

      Program.upsert($scope.ProgramObject , function() {
        CoreService.toastSuccess(gettextCatalog.getString('Program saved'),
          gettextCatalog.getString('Your program is safe with us!'));
          $scope.goAway();

      }, function(err) {
        if( typeof ($rootScope.modalInstance) !== 'undefined'){
          $modal.dismiss('error');
        }
        console.log(err);
      });
    };

    $scope.goAway = function(){

      if( typeof ($rootScope.modalInstance) !== 'undefined'){
        $rootScope.modalInstance.dismiss('completed');
        $state.go('app.programs.list');
      }else{
          $state.go('^.list');
      }

    };


    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
      console.log('Current route name: ' + $location.path());
        if( typeof ($rootScope.modalInstance) !== 'undefined'){
          console.log('modalInstance: ' + JSON.stringify($rootScope.modalInstance) );
        }
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
         var found = $filter('getItemName')($scope.tags, $tag.Name);
         if(!found){
             console.log($tag.Name + ' NOT FOUND'  );
             //$scope.tags.push($tag);
         }else{
             console.log('FOUND:' + JSON.stringify(found) +' in '+  JSON.stringify($scope.tags) );
         }
     };

     $scope.newTagValue = function($tag){
       console.log('NEW TAG: ' + JSON.stringify($tag) );
       $scope.showdetails($tag);
     };

// LOCATIOnS





  // picture logo

      $scope.logoImageURL = 'http://api.vator.co/uploadmedia/vatorprofilecache';


  $scope.uploadLogo = function(files) {
      var fd = new FormData();
      //Take the first selected file
      fd.append('file', files[0]);
      console.log('FILE: '+files[0]);
      var go = $scope.logoImageURL + '/' + 'programlogo';
      $http.post(go, fd, {
          withCredentials: true,
          dataType: 'jsonp',
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
      }).success( function(response) {
        console.log(response);
        var imgName = response.result.name;
        var imgURL = 'https://vator.imgix.net/'+ imgName  +'?w=200&h=200&fm=png32&fit=fill';
        // var random = (new Date()).toString();

        $scope.program.Image = imgURL ;
      }).error(  function(err) {
        console.log(err);
      } );

  };


  });
