// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/userlogin.html',
      controller: 'LoginController'
  })

  .state('app.preferenceadd', {
      url: '/preferenceadd',
      views: {
        'menuContent': {
          templateUrl: 'templates/preferenceadd.html',
          controller: 'PreferenceAddController'
        }
      }
    })

    .state('app.preferencelist', {
      url: '/preferencelist',
      views: {
        'menuContent': {
          templateUrl: 'templates/preferencelist.html',
          controller: 'PreferenceListController'
        }
      }
    })

  .state('app.single', {
    url: '/listings',
    views: {
      'menuContent': {
        templateUrl: 'templates/listings.html',
        controller: 'ListingsController'
      }
    }
  })

   .state('app.listingdetails', {
      url: '/details',
      views: {
        'menuContent': {
          templateUrl: 'templates/listingdetails.html',
          controller: 'ListingDetailsController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
