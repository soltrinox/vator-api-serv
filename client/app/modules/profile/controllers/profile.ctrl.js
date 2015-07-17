'use strict';
var app = angular.module('com.module.profile');

app.controller('MyProfileCtrl', function($scope, $state, $stateParams, User, ProfileService, formlyVersion) {

    $scope.pid = $stateParams.id;
    console.log('PID: '+$scope.pid);




  // variable assignment
  $scope.author = { // optionally fill in your info below :-)
    name: 'Kent C. Dodds',
    url: 'https://twitter.com'
  };
  $scope.exampleTitle = 'Formly Bootstrap Select'; // add this
  $scope.env = {
    angularVersion: angular.version.full,
    formlyVersion: formlyVersion
  };

  $scope.model = {};
  $scope.options = {};

  $scope.fields = [
    {
      key: 'marvel1',
      type: 'select',
      templateOptions: {
        label: 'Normal Select',
        options: [
          {name: 'Iron Man', value: 'iron_man'},
          {name: 'Captain America', value: 'captain_america'},
          {name: 'Black Widow', value: 'black_widow'},
          {name: 'Hulk', value: 'hulk'},
          {name: 'Captain Marvel', value: 'captain_marvel'}
        ]
      }
    },
    {
      key: 'marvel2',
      type: 'select',
      templateOptions: {
        label: 'Grouped Select',
        options: [
          {name: 'Iron Man', value: 'iron_man', group: 'Male'},
          {name: 'Captain America', value: 'captain_america', group: 'Male'},
          {name: 'Black Widow', value: 'black_widow', group: 'Female'},
          {name: 'Hulk', value: 'hulk', group: 'Male'},
          {name: 'Captain Marvel', value: 'captain_marvel', group: 'Female'}
        ]
      }
    },
    {
      key: 'marvel3',
      type: 'select',
      templateOptions: {
        label: 'Select with custom name/value/group',
        options: [
          {label: 'Iron Man', id: 'iron_man', gender: 'Male'},
          {label: 'Captain America', id: 'captain_america', gender: 'Male'},
          {label: 'Black Widow', id: 'black_widow', gender: 'Female'},
          {label: 'Hulk', id: 'hulk', gender: 'Male'},
          {label: 'Captain Marvel', id: 'captain_marvel', gender: 'Female'}
        ],
        groupProp: 'gender',
        valueProp: 'id',
        labelProp: 'label'
      }
    },
    {
      key: 'marvel3',
      type: 'select',
      templateOptions: {
        label: 'Custom ng-options',
        options: [
          {label: 'Iron Man', id: 'iron_man', gender: 'Male'},
          {label: 'Captain America', id: 'captain_america', gender: 'Male'},
          {label: 'Black Widow', id: 'black_widow', gender: 'Female'},
          {label: 'Hulk', id: 'hulk', gender: 'Male'},
          {label: 'Captain Marvel', id: 'captain_marvel', gender: 'Female'}
        ],
        ngOptions: 'option as option.label group by option.gender for option in to.options'
      }
    }
  ];

  $scope.originalFields = angular.copy($scope.fields);

  // function $scope.onSubmit() {
  //     $scope.options.updateInitialValue();
  //     alert(JSON.stringify($scope.model), null, 2);
  //   }





  $scope.delete = function(id) {
    ProfileService.deleteProfile(id, function() {
      $scope.profiles = ProfileService.getProfiles();
      $state.go('^.list');
    });
  };

  $scope.onSubmit = function() {
    ProfileService.upsertProfile($scope.profile, function() {
      $scope.profiles = ProfileService.getProfiles();
      $state.go('^.view');
    });
  };

  $scope.onCredSubmit = function() {
    ProfileService.upsertEducation($scope.profile, function() {
      // this returns the whole object
      $scope.profiles = ProfileService.getProfile($stateParams.id);
      // send us to the view page and look at our profile
      $state.go('^.view');
    });
  };

  $scope.profiles = ProfileService.getProfiles();

  if ($stateParams.id) {
    $scope.profile = ProfileService.getProfile($stateParams.id);
  } else {
    $scope.profile = {};
  }

});
