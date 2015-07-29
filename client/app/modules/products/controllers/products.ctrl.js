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
  }
}).controller('ProductsCtrl', function($scope, $location, $route, $routeParams,
   $document, $filter, $state, $stateParams, $http,
    CoreService, ProfileService, gettextCatalog, Product, Category, Profile, User) {

    var productId = $stateParams.id;
    var categoryId = $stateParams.categoryId;

    // is product ID present
    if (productId) {
      // lest go get the product now
      $scope.product = Product.findById({
        // set the query path / string for POST / GET
        id: productId
        // handle in case of valid response
      }, function(product) {
        // add the product tot he category
        product.category = Product.category({
          id: product.id
        });
        // handle in case of bad response
      }, function(err) {
        console.log(err);
      });
    } else {
      $scope.product = {};
    }

    if (categoryId) {
      $scope.product.categoryId = categoryId;
    }

    function loadItems() {
      $scope.categories = [];
      Category.find(function(categories) {
        angular.forEach(categories, function(category) {
          category.products = Category.products({
            id: category.id
          });
          this.push(category);
        }, $scope.categories);
      });
    }

    loadItems();

    $scope.delete = function(id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function() {
          Product.deleteById(id, function() {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Product deleted'), gettextCatalog.getString(
              'Your product is deleted!'));
            loadItems();
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

    $scope.deletecategory = function(id) {
      // Category.deleteById(id, function() {
      //   CoreService.toastSuccess(gettextCatalog.getString(
      //     'Category deleted'), gettextCatalog.getString(
      //     'Your category is deleted!'));
      //   loadItems();
      // }, function(err) {
      //   CoreService.toastError(gettextCatalog.getString(
      //     'Error deleting category'), gettextCatalog.getString(
      //     'Your category is not deleted: ') + err);
      // });
    };

    $scope.CompanyRecord = {
      name: '',
      id : '',
      categoryId : '55a8a1d5d41ad56657952284',
      companyId: '',
      profileId: '',
      location: '',
      pitch : '',
      website : '',
      founded : '',
      tags : [{id:'55a8a1d5d41ad56657952284'}]
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

    }

    $scope.newTagValue = function($tag){
      console.log('NEW TAG: ' + JSON.stringify($tag) );
      $scope.showdetails($tag);
    }


    $scope.tags = [];
    $scope.TagFirst = '0';
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
          $scope.ProfileRecord.CoverPic = response.CoverPic;
          $scope.ProfileRecord.id = response.id;
          // be sure to set the global user object
          $scope.currentUser.pid = response.id;
          console.log( ' CUURENT USER : ' +  JSON.stringify($scope.currentUser)
          + ' \n COMP REC : '  + JSON.stringify($scope.CompanyRecord));
        });
      }
    };

    $scope.saveCompany = function(  CompanyRecord ){
      if ((!$scope.CompanyRecord.profileId ) || (0 === $scope.CompanyRecord.profileId.length )) {
            console.log('NO OWNER -> RERUN GETBYUUID');
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
              $location.path('/app/myprofile');
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
            return item.formatted_address;
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
       return $http.get('//api.vator.co/api/Categories', {
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

 $scope.catsList = [
   {
     name :"Advertising",
     parent :"0",
     seo :"advertising",
     type :"CAT"
   },
   {
     name :"Aerospace",
     parent :"0",
     seo :"aerospace",
     type :"CAT"
   },
   {
     name :"Art",
     parent :"0",
     seo :"art",
     type :"CAT"
   },
   {
     name :"Automotive",
     parent :"0",
     seo :"automotive",
     type :"CAT"
   },
   {
     name :"Clean technology",
     parent :"0",
     seo :"clean-technology",
     type :"CAT"
   },
   {
     name :"Commerce",
     parent :"0",
     seo :"commerce",
     type :"CAT"
   },
   {
     name :"Communications",
     parent :"0",
     seo :"communications",
     type :"CAT"
   },
   {
     name :"Consulting",
     parent :"0",
     seo :"consulting",
     type :"CAT"
   },
   {
     name :"Consumer brands",
     parent :"0",
     seo :"consumer-brands",
     type :"CAT"
   },
   {
     name :"Consumer Packaged Goods CPG",
     parent :"0",
     seo :"consumer-packaged-goods",
     type :"CAT"
   },
   {
     name :"Customization",
     parent :"0",
     seo :"customization",
     type :"CAT"
   },
   {
     name :"Data",
     parent :"0",
     seo :"data",
     type :"CAT"
   },
   {
     name :"Design",
     parent :"0",
     seo :"design",
     type :"CAT"
   },
   {
     name :"Development",
     parent :"0",
     seo :"development",
     type :"CAT"
   },
   {
     name :"Distribution",
     parent :"0",
     seo :"distribution",
     type :"CAT"
   },
   {
     name :"Education",
     parent :"0",
     seo :"education",
     type :"CAT"
   },
   {
     name :"Employment",
     parent :"0",
     seo :"employment",
     type :"CAT"
   },
   {
     name :"Entrepreneur",
     parent :"0",
     seo :"entrepreneur",
     type :"CAT"
   },
   {
     name :"Events",
     parent :"0",
     seo :"events",
     type :"CAT"
   },
   {
     name :"Finance",
     parent :"0",
     seo :"finance",
     type :"CAT"
   },
   {
     name :"Food and beverages",
     parent :"0",
     seo :"food-and-beverages",
     type :"CAT"
   },
   {
     name :"Healthcare",
     parent :"0",
     seo :"healthcare",
     type :"CAT"
   },
   {
     name :"Information technology",
     parent :"0",
     seo :"information-technology",
     type :"CAT"
   },
   {
     name :"Internet",
     parent :"0",
     seo :"internet",
     type :"CAT"
   },
   {
     name :"Internet of Things IoT",
     parent :"0",
     seo :"internet-of-things-iot",
     type :"CAT"
   },
   {
     name :"Jobs",
     parent :"0",
     seo :"jobs",
     type :"CAT"
   },
   {
     name :"Legal",
     parent :"0",
     seo :"legal",
     type :"CAT"
   },
   {
     name :"Life sciences",
     parent :"0",
     seo :"life-sciences",
     type :"CAT"
   },
   {
     name :"Lifestyle",
     parent :"0",
     seo :"lifestyle",
     type :"CAT"
   },
   {
     name :"Management systems",
     parent :"0",
     seo :"management-systems",
     type :"CAT"
   },
   {
     name :"Manufacturing",
     parent :"0",
     seo :"manufacturing",
     type :"CAT"
   },
   {
     name :"Marketing",
     parent :"0",
     seo :"marketing",
     type :"CAT"
   },
   {
     name :"Media",
     parent :"0",
     seo :"media",
     type :"CAT"
   },
   {
     name :"Mobile",
     parent :"0",
     seo :"mobile",
     type :"CAT"
   },
   {
     name :"Mobile visualization",
     parent :"0",
     seo :"mobile-visualization",
     type :"CAT"
   },
   {
     name :"Newmen",
     parent :"0",
     seo :"newmen",
     type :"CAT"
   },
   {
     name :"Online Gaming",
     parent :"0",
     seo :"online-gaming",
     type :"CAT"
   },
   {
     name :"Pets",
     parent :"0",
     seo :"pets",
     type :"CAT"
   },
   {
     name :"Real estate",
     parent :"0",
     seo :"real-estate",
     type :"CAT"
   },
   {
     name :"Research",
     parent :"0",
     seo :"research",
     type :"CAT"
   },
   {
     name :"Reviews and recommendations",
     parent :"0",
     seo :"reviews-and-recommendations",
     type :"CAT"
   },
   {
     name :"Security",
     parent :"0",
     seo :"security",
     type :"CAT"
   },
   {
     name :"Services",
     parent :"0",
     seo :"services",
     type :"CAT"
   },
   {
     name :"Small business",
     parent :"0",
     seo :"small-business",
     type :"CAT"
   },
   {
     name :"Software",
     parent :"0",
     seo :"software",
     type :"CAT"
   },
   {
     name :"Startup",
     parent :"0",
     seo :"startup",
     type :"CAT"
   },
   {
     name :"Training services",
     parent :"0",
     seo :"training-services",
     type :"CAT"
   },
   {
     name :"Travel",
     parent :"0",
     seo :"travel",
     type :"CAT"
   },
   {
     name :"Venture capital",
     parent :"0",
     seo :"venture-capital",
     type :"CAT"
   },
   {
     name :"Video",
     parent :"0",
     seo :"video",
     type :"CAT"
   }
 ];

 $scope.debugOut = [];

 $scope.bulkCats = function(){

   for(var i = 0; i < $scope.catsList.length; i++ ){

    $scope.cat =  $scope.catsList[i];
      console.log('SCOPE: '+ JSON.stringify(  $scope.cat ));
     $scope.CategoryModel = {
       name : '',
       type : '',
       parent : '',
       seo : '',
       id : ''
     }

     $scope.CategoryModel.name = $scope.cat.name;
     $scope.CategoryModel.parent = $scope.cat.parent;
     $scope.CategoryModel.seo  = $scope.cat.seo;
     $scope.CategoryModel.type = $scope.cat.type;

     if((!$scope.CategoryModel.id ) || ($scope.CategoryModel.id === '')){
       delete $scope.CategoryModel.id;
     }

     console.log('SCOPE: '+ JSON.stringify(  $scope.CategoryModel ));
     $scope.debugOut.push( $scope.CategoryModel.name);

     //  insert
     Category.upsert($scope.CategoryModel, function() {
       CoreService.toastSuccess(gettextCatalog.getString(
         'Category saved'), gettextCatalog.getString(
         'Your category is safe with us!'));

     }, function(err) {
       console.log(err);
     });



   }
 }



  });
