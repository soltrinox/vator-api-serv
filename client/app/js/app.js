'use strict';
/**
 * @ngdoc overview
 * @name loopbackApp
 * @description
 * # loopbackApp
 *
 * Main module of the application.
 */
angular.module('loopbackApp', [
    'angular-loading-bar',
    'angular.filter',
    'angularBootstrapNavTree',
    'angularFileUpload',
    'btford.markdown',
    'oitozero.ngSweetAlert',
    'config',
    'formly',
    'lbServices',
    'monospaced.elastic',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTagsInput',
    'ngAutocomplete',
    'ngTouch',
    'ui.bootstrap',
    'ui.codemirror',
    'ui.gravatar',
    'ui.grid',
    'ui.router',
    'ui.router.stateHelper',
    'toasty',
    'autofields',
    'gettext',
    'com.module.core',
    'com.module.about',
    'com.module.events',
    'com.module.files',
    'com.module.notes',
    'com.module.pages',
    'com.module.posts',
    'com.module.programs',
    'com.module.products',
    'com.module.sandbox',
    'com.module.settings',
    'com.module.profile',
    'com.module.users'
  ]).config(['$routeProvider', function($routeProvider) {


  }]).run(function($rootScope, $cookies, gettextCatalog) {

    $rootScope.masterUser = {};
    $rootScope.isXsession = false;
    $rootScope.goLocation = '';

    $rootScope.menu = [];

    // Add Sidebar Menu
    $rootScope.addMenu = function(name, uisref, icon) {
      console.log('MENU:' + JSON.stringify($rootScope.menu));

        $rootScope.menu.push({
          name: name,
          sref: uisref,
          icon: icon
        });
    };

    // Add Menu Dashboard

      $rootScope.addMenu(gettextCatalog.getString('vatorCO'), 'app.home',
        'fa-dashboard');

        if($rootScope.isXsession){
          console.log('MENU:' + JSON.stringify($rootScope.menu));

          $rootScope.addMenu(gettextCatalog.getString('vatorX'), 'app.x',
            'fa-cog');
        }else{

        }

        $rootScope.addMenu(gettextCatalog.getString('Programs'), 'app.programs.list',
          'fa-star');
        $rootScope.addMenu(gettextCatalog.getString('Company'),
            'app.products.list', 'fa-bank');
        $rootScope.addMenu(gettextCatalog.getString('Profile'), 'app.myprofile.list',
              'fa-user');



    $rootScope.locales = {

      'en': {
        lang: 'en',
        country: 'US',
        name: gettextCatalog.getString('English')
      },
      'es': {
        lang: 'es',
        country: 'ES',
        name: gettextCatalog.getString('Spanish')
      },
      'pt-BR': {
        lang: 'pt_BR',
        country: 'BR',
        name: gettextCatalog.getString('Portuguese Brazil')
      },
      'nl': {
        lang: 'nl',
        country: 'NL',
        name: gettextCatalog.getString('Dutch')
      },
      'de': {
        lang: 'de',
        country: 'DE',
        name: gettextCatalog.getString('German')
      },
      'fr': {
        lang: 'fr',
        country: 'FR',
        name: gettextCatalog.getString('Français')
      }
    };

    // console.log('XXXXXXXXXX => CONTROLLER NAME:' );

    var lang = $cookies.lang || navigator.language || navigator.userLanguage;

    $rootScope.locale = $rootScope.locales[lang];



    if ($rootScope.locale === undefined) {
      $rootScope.locale = $rootScope.locales[lang];
      if ($rootScope.locale === undefined) {
        $rootScope.locale = $rootScope.locales['en'];
      }
    }

    gettextCatalog.setCurrentLanguage($rootScope.locale.lang);

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
    });


  });
