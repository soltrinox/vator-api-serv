'use strict';
angular.module('com.module.products')
.filter('getByName', function() {
  return function(input, name) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i].name === name) {
        return input[i];
      }
    }
    return null;
  };
}).controller('ProductsCtrl', function($scope, $location, $route,  $rootScope,  $routeParams,$document, $filter,
  $state, $stateParams, $http, CoreService, ProfileService, gettextCatalog,
  Product, Category, User, Profile, Team, Media ) {

    var productId = $stateParams.id;
    var categoryId = $stateParams.categoryId;


    $scope.teamMembers = [];
    $scope.teamDetails = {};
    $scope.tags = [];
    $scope.TagFirst = '0';
    $scope.members = [];
    $scope.MemberFirst = '0';
    $scope.OWNER = '';
    $scope.details2 = '';
    $scope.modd = {};
    $scope.result2 = '';

    $scope.options2 = {
      watchEnter: true,
      country: 'us',
      types: '(cities)'
    };

    $scope.ProfileRecord = {
      Name:'',
      Bio:'',
      UUID:'',
      ProfilePic:'',
      CoverPic:'',
      id:''
    };

    $scope.TeamRecord = {
      Name: '',
      URL: '',
      founded: '',
      pitch: '',
      tags: [],
      cats: [],
      owner: [],
      location: []
    };

    $scope.CompanyRecord = {
      name: '',
      id : '',
      categoryId : '55ba9286966a114937493efe',
      companyId: '',
      profileId: '',
      location: '',
      pitch : '',
      website : '',
      founded : '',
      tags : [],
      team:{}
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

    // is product ID present
    if (productId) {
      // lest go get the full product now
      $scope.product = Product.getEntireProduct(
            {  id : productId }, function(product) {
              console.log('SUCCESS Product.getEntireProduct:');
            $scope.CompanyRecord = product.company.details;

            console.log('company:' + JSON.stringify($scope.CompanyRecord));
            if(!product.company.team || 0 === product.company.team.length || (typeof product.company.team === 'undefined')){
              // product.company.team =
              // TODO: create new product object
            }else{
              $scope.teamMembers = product.team.members;
              $scope.members = product.team.members;
              $scope.teamDetails = product.company.team.details;
              console.log('teamMembers:' + JSON.stringify($scope.teamMembers));
              console.log('teamDetails:' + JSON.stringify($scope.teamDetails));
            }


            $scope.tags = product.company.details.tags;
            console.log('tags:' + JSON.stringify($scope.tags));



      }, function(err) {
        console.log(err);
      });
    } else {
      // load for the list view
      $scope.product = {};

      $scope.loadItems();
    }

    if (categoryId) {
      // set this for the category default of specified
      // at time of creation
      $scope.product.categoryId = categoryId;
    }


    $scope.delete = function(id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function() {
          Product.deleteById(id, function() {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Product deleted'), gettextCatalog.getString(
              'Your product is deleted!'));
            $scope.loadItems();
            $state.go('app.companies.list');
          }, function(err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting product'), gettextCatalog.getString(
              'Your product is not deleted: ') + err);
          });
        },
        function() {
          return false;
        });
    };


    $scope.formFields = [{
      key: 'name',
      type: 'text',
      label: gettextCatalog.getString('Name'),
      required: true
    }, {
      key: 'categoryId',
      type: 'hidden',
      required: true
    }, {
      key: 'profileId',
      type: 'hidden',
      required: true
    }, {
      key: 'pitch',
      type: 'textarea',
      label: gettextCatalog.getString('Brief Pitch')
    },{
      key: 'website',
      type: 'text',
      placeholder : 'http://www.website.com',
      label: gettextCatalog.getString('Website URL')
    },{
      key: 'founded',
      type: 'date',
      label: gettextCatalog.getString('Year Founded'),
      required: true
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };






    $scope.getUserRecord = function(){

      if(!$scope.currentUser.id || 0 === $scope.currentUser.id.length || (typeof $scope.currentUser.id === 'undefined')){
        console.log('PRODUCT MISSING BASE USER 1 $scope.currentUser -> LOG IN AGAIN' );
          $location.path('/login');
      }else{
        ProfileService.getProfileByUUID($scope.currentUser.id, function(response){
          $scope.ProfileRecord.Name= response.Name;
          $scope.ProfileRecord.Bio= response.Bio;
          $scope.ProfileRecord.UUID = response.UUID;

          $scope.ProfileRecord.ProfilePic = response.ProfilePic;
          if(!response.ProfilePic || 0 === response.ProfilePic.length){
            $scope.ProfileRecord.ProfilePic = 'https://s3.amazonaws.com/vatorprofilecache/profile.png';
          }
          $scope.ProfileRecord.CoverPic = response.CoverPic;
          if(!response.CoverPic || 0 === response.CoverPic.length){
            $scope.ProfileRecord.CoverPic = 'https://s3.amazonaws.com/vatorprofilecache/456498.jpg';
          }
          $scope.ProfileRecord.id = response.id;
          // be sure to set the global user object
          $scope.currentUser.pid = response.id;
          console.log( ' CUURENT USER : ' +  JSON.stringify($scope.currentUser)+
          ' \n COMP REC : '  + JSON.stringify($scope.CompanyRecord));
        });
      }
    };

    $scope.saveCompany = function(  companyRecord ){
      if ((!$scope.CompanyRecord.profileId ) || (0 === $scope.CompanyRecord.profileId.length )) {
            console.log('NO OWNER -> RERUN GETBYUUID' + JSON.stringify(companyRecord));
            $scope.onSubmit();
      }else {
        console.log('YES OWNER -> RUN UPSERT');
        console.log('Comp Rec: ' + JSON.stringify($scope.CompanyRecord) );
        if($scope.CompanyRecord.id === ''){
          delete $scope.CompanyRecord.id;
        }

        $scope.CompanyRecord.categoryId =  categoryId;

        $scope.CompanyRecord.tags = $scope.tags;
        Product.upsert($scope.CompanyRecord, function(response) {
          console.log('NEW COMP REC: '  + JSON.stringify(response));

          CoreService.toastSuccess(gettextCatalog.getString(
            'Company saved'), gettextCatalog.getString(
            'Your comapny record is safe with us!'));
              //$location.path('/app/myprofile');
        }, function(err) {
          console.log(err);
        });

      }
    };

    $scope.onSubmit = function() {

      if(!$scope.CompanyRecord.profileId || 0 === $scope.CompanyRecord.profileId.length  ){
        if(!$scope.currentUser.pid || 0 === $scope.currentUser.pid.length  ){
          if(!$scope.currentUser.id || 0 === $scope.currentUser.id.length  ){
            console.log('PRODUCT MISSING BASE USER 2 $scope.currentUser -> LOG IN AGAIN' );
              $location.path('/login');
          }else {
            console.log('MISSING PROFILEID'  + JSON.stringify($scope.currentUser));
            $scope.getUserRecord($scope.currentUser.id);
            $scope.CompanyRecord.profileId =  $scope.currentUser.pid;
            $scope.saveCompany(  $scope.CompanyRecord );
          }
        }else {
          $scope.CompanyRecord.profileId =  $scope.currentUser.pid;
          $scope.saveCompany(  $scope.CompanyRecord );
        }
      }else {
        $scope.saveCompany(  $scope.CompanyRecord );
      }
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


         /*   =========ASYNC MEMBERS TYPEAHEAD ======
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




          $scope.getMembers = function(val) {
            return $http.get('//api.vator.co/api/Profiles', {
              params: {
                filter: {
                    where : {
                        Name : {
                             like : val
                            }
                        }
                    }
                }
            }).then(function(response){
              return response.data.map(function(item){
                if(!item.ProfilePic || 0 ===  item.ProfilePic.length){
                  item.ProfilePic = 'https://s3.amazonaws.com/vatorprofilecache/profile.png';
                }
                return item;
              });
            });
          };


          $scope.newMemberValue = function($member){
	           //$scope.members.push($member);
             $scope.teamMembers.push($member);
             console.log('NEW MEMBER ADDED ID: ' + $member.id  +'\n'+ JSON.stringify($scope.teamMembers) );
             $scope.showmembers($member);
          };

          $scope.showmembers = function($member){
              var found = $filter('getByName')($scope.members, $member.Name);
              if(!found){
                  console.log($member.Name + ' NOT FOUND'  );
              }else{
                  console.log('FOUND:' + JSON.stringify(found) +' in '+  JSON.stringify($scope.members) );
              }
          };

          $scope.onSaveMembers = function(){
              console.log('SUBMIT MEMBERS TO TEAM: ' +  JSON.stringify($scope.teamMembers) );
              $scope.CompanyRecord.team.members = $scope.members;
          };


  });
