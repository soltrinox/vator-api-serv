'use strict';
angular.module('com.module.about')
  /**
   * @ngdoc function
   * @name com.module.about.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the clientApp
   */
  .controller('AboutCtrl', function($scope) {
    $scope.angular = angular;



    $scope.catsList = [
      {
        "name":"Advertising",
        "parent":"0",
        "seo":"advertising",
        "type":"CAT"
      },
      {
        "name":"Aerospace",
        "parent":"0",
        "seo":"aerospace",
        "type":"CAT"
      },
      {
        "name":"Art",
        "parent":"0",
        "seo":"art",
        "type":"CAT"
      },
      {
        "name":"Automotive",
        "parent":"0",
        "seo":"automotive",
        "type":"CAT"
      },
      {
        "name":"Clean technology",
        "parent":"0",
        "seo":"clean-technology",
        "type":"CAT"
      },
      {
        "name":"Commerce",
        "parent":"0",
        "seo":"commerce",
        "type":"CAT"
      },
      {
        "name":"Communications",
        "parent":"0",
        "seo":"communications",
        "type":"CAT"
      },
      {
        "name":"Consulting",
        "parent":"0",
        "seo":"consulting",
        "type":"CAT"
      },
      {
        "name":"Consumer brands",
        "parent":"0",
        "seo":"consumer-brands",
        "type":"CAT"
      },
      {
        "name":"Consumer Packaged Goods CPG",
        "parent":"0",
        "seo":"consumer-packaged-goods",
        "type":"CAT"
      },
      {
        "name":"Customization",
        "parent":"0",
        "seo":"customization",
        "type":"CAT"
      },
      {
        "name":"Data",
        "parent":"0",
        "seo":"data",
        "type":"CAT"
      },
      {
        "name":"Design",
        "parent":"0",
        "seo":"design",
        "type":"CAT"
      },
      {
        "name":"Development",
        "parent":"0",
        "seo":"development",
        "type":"CAT"
      },
      {
        "name":"Distribution",
        "parent":"0",
        "seo":"distribution",
        "type":"CAT"
      },
      {
        "name":"Education",
        "parent":"0",
        "seo":"education",
        "type":"CAT"
      },
      {
        "name":"Employment",
        "parent":"0",
        "seo":"employment",
        "type":"CAT"
      },
      {
        "name":"Entrepreneur",
        "parent":"0",
        "seo":"entrepreneur",
        "type":"CAT"
      },
      {
        "name":"Events",
        "parent":"0",
        "seo":"events",
        "type":"CAT"
      },
      {
        "name":"Finance",
        "parent":"0",
        "seo":"finance",
        "type":"CAT"
      },
      {
        "name":"Food and beverages",
        "parent":"0",
        "seo":"food-and-beverages",
        "type":"CAT"
      },
      {
        "name":"Healthcare",
        "parent":"0",
        "seo":"healthcare",
        "type":"CAT"
      },
      {
        "name":"Information technology",
        "parent":"0",
        "seo":"information-technology",
        "type":"CAT"
      },
      {
        "name":"Internet",
        "parent":"0",
        "seo":"internet",
        "type":"CAT"
      },
      {
        "name":"Internet of Things IoT",
        "parent":"0",
        "seo":"internet-of-things-iot",
        "type":"CAT"
      },
      {
        "name":"Jobs",
        "parent":"0",
        "seo":"jobs",
        "type":"CAT"
      },
      {
        "name":"Legal",
        "parent":"0",
        "seo":"legal",
        "type":"CAT"
      },
      {
        "name":"Life sciences",
        "parent":"0",
        "seo":"life-sciences",
        "type":"CAT"
      },
      {
        "name":"Lifestyle",
        "parent":"0",
        "seo":"lifestyle",
        "type":"CAT"
      },
      {
        "name":"Management systems",
        "parent":"0",
        "seo":"management-systems",
        "type":"CAT"
      },
      {
        "name":"Manufacturing",
        "parent":"0",
        "seo":"manufacturing",
        "type":"CAT"
      },
      {
        "name":"Marketing",
        "parent":"0",
        "seo":"marketing",
        "type":"CAT"
      },
      {
        "name":"Media",
        "parent":"0",
        "seo":"media",
        "type":"CAT"
      },
      {
        "name":"Mobile",
        "parent":"0",
        "seo":"mobile",
        "type":"CAT"
      },
      {
        "name":"Mobile visualization",
        "parent":"0",
        "seo":"mobile-visualization",
        "type":"CAT"
      },
      {
        "name":"Newmen",
        "parent":"0",
        "seo":"newmen",
        "type":"CAT"
      },
      {
        "name":"Online Gaming",
        "parent":"0",
        "seo":"online-gaming",
        "type":"CAT"
      },
      {
        "name":"Pets",
        "parent":"0",
        "seo":"pets",
        "type":"CAT"
      },
      {
        "name":"Real estate",
        "parent":"0",
        "seo":"real-estate",
        "type":"CAT"
      },
      {
        "name":"Research",
        "parent":"0",
        "seo":"research",
        "type":"CAT"
      },
      {
        "name":"Reviews and recommendations",
        "parent":"0",
        "seo":"reviews-and-recommendations",
        "type":"CAT"
      },
      {
        "name":"Security",
        "parent":"0",
        "seo":"security",
        "type":"CAT"
      },
      {
        "name":"Services",
        "parent":"0",
        "seo":"services",
        "type":"CAT"
      },
      {
        "name":"Small business",
        "parent":"0",
        "seo":"small-business",
        "type":"CAT"
      },
      {
        "name":"Software",
        "parent":"0",
        "seo":"software",
        "type":"CAT"
      },
      {
        "name":"Startup",
        "parent":"0",
        "seo":"startup",
        "type":"CAT"
      },
      {
        "name":"Training services",
        "parent":"0",
        "seo":"training-services",
        "type":"CAT"
      },
      {
        "name":"Travel",
        "parent":"0",
        "seo":"travel",
        "type":"CAT"
      },
      {
        "name":"Venture capital",
        "parent":"0",
        "seo":"venture-capital",
        "type":"CAT"
      },
      {
        "name":"Video",
        "parent":"0",
        "seo":"video",
        "type":"CAT"
      }
    ];


    $scope.bulkCats = function(){




    }


  });
