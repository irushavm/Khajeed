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
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

  .state('app.preferences', {
      url: '/preferences',
      views: {
        'menuContent': {
          templateUrl: 'templates/preferences.html'
        }
      },
      controller: 'PreferencesCtrl' 
      }       
    )

    .state('app.topics', {
      url: '/topics',
      views: {
        'menuContent': {
          templateUrl: 'templates/topics.html',
          controller: 'TopicsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/topics/:topicId',
    views: {
      'menuContent': {
        templateUrl: 'templates/topic.html',
        controller: 'TopicCtrl'
      }
    }
  })

   .state('app.result', {
      url: '/result',
      views: {
        'menuContent': {
          templateUrl: 'templates/result.html',
          controller: 'ResultCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
