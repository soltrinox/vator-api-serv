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
}).controller('ProductsCtrl', function($scope, $location, $route, $routeParams,
   $document, $filter, $state, $stateParams, $http,
    CoreService, ProfileService, gettextCatalog, Product, Category) {

    var productId = $stateParams.id;
    var categoryId = $stateParams.categoryId;

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
      // lest go get the product now
      $scope.product = Product.find(
        {filter : { where : { id : productId}  }  }, function(product) {

          if(product.length === 1){
            $scope.CompanyRecord = product[0];
            $scope.tags = product[0].tags;
          }


        // add the product tot he category
        // product.category = Product.category({
        //   id: product.id
        // });
        // handle in case of bad response
      }, function(err) {
        console.log(err);
      });
    } else {
      $scope.product = {};
      $scope.loadItems();
    }

    if (categoryId) {
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
            $state.go('app.products.list');
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
      tags : []
    };

    $scope.formFields = [{
      key: 'name',
      type: 'text',
      label: gettextCatalog.getString('Name'),
      required: true
    }, {
      key: 'categoryId',
      type: 'hidden',
      label: gettextCatalog.getString('Group'),
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


    $scope.tags = [];
    $scope.TagFirst = '0';
    $scope.members = [];
    $scope.MemberFirst = '0';
    $scope.OWNER = '';

    $scope.ProfileRecord = {
      Name:'',
      Bio:'',
      UUID:'',
      ProfilePic:'',
      CoverPic:'',
      id:''
    };


    $scope.getUserRecord = function(){

      if(!$scope.currentUser.id || 0 === $scope.currentUser.id.length){
        console.log('MISSING BASE USER  $scope.currentUser -> LOG IN AGAIN' );
          $location.path('/login');
      }else{
        ProfileService.getProfileByUUID($scope.currentUser.id, function(response){
          $scope.ProfileRecord.Name= response.Name;
          $scope.ProfileRecord.Bio= response.Bio;
          $scope.ProfileRecord.UUID = response.UUID;

          $scope.ProfileRecord.ProfilePic = response.ProfilePic;
          if(!response.ProfilePic || 0 === response.ProfilePic.length){
            response.ProfilePic = 'https://s3.amazonaws.com/vatorprofilecache/profile.png';
          }
          $scope.ProfileRecord.CoverPic = response.CoverPic;
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
            console.log('MISSING BASE USER  $scope.currentUser -> LOG IN AGAIN' );
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

    $scope.modd = {};
    $scope.result2 = '';
    $scope.options2 = {
      watchEnter: true,
      country: 'us',
      types: '(cities)'
    };
    $scope.details2 = '';

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

          $scope.teamLookUp = {};

          $scope.teamMembers = [];

          $scope.getTeams = function(val) {
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

            $scope.teamMembers.push($member);
            console.log('NEW MEMBER ADDED ID: ' + $member.id  +'\n'+ JSON.stringify($scope.teamMembers) );
            $scope.showmembers($member);
          };

          $scope.showmembers = function($member){
              var found = $filter('getByName')($scope.members, $member.name);
              if(!found){
                  console.log($member.name + ' NOT FOUND'  );
              }else{
                  console.log('FOUND:' + JSON.stringify(found) +' in '+  JSON.stringify($scope.members) );
              }

          };


  });
