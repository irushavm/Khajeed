angular.module('starter.controllers', [])

.controller('AppCtrl',function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LoginCtrl', function($scope,$state,$ionicPopup,$window,LoginService) {
    $scope.data = {};
 
  $scope.performLogin = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password);
    
      if($window.token){       
        $state.go('app.preferences');
      }
      else{
        var alertPopup = $ionicPopup.alert({
           title: 'Login Failed!',
           template: 'Please Check your information!!!'
        }); 
      }
    };

  $scope.performSignUp = function() {
	  $state.go('signup');
  };
})

.controller('SignupCtrl', function($scope,$state,$ionicPopup,SignupService) {
    $scope.data = {};
 
    $scope.finishSignupProcess = function() {
        SignupService.signupUser($scope.data.username, $scope.data.password);
	$state.go('login');
    };

})

.controller('PreferencesCtrl', function($scope,$state,$ionicPopup,$window,PreferencesService) {
    $scope.data = {};
 
    $scope.addPreferences = function() {
        PreferencesService.AddPrefs($scope.data.tittle, $scope.data.city, $scope.data.category, $scope.data.keywords, $scope.data.filters);
        // $state.go('preferences');

        // if($window.token){       
          var alertPopup = $ionicPopup.alert({
             title: 'Preferences Added',
             template: 'WE ADDED YOUR PREFERENCES!!!'
          });
        // }
    };  

  $scope.doPrefs = function() {
    console.log('Doing preferences', $scope.prefsData);
  };

})

.controller('TopicsCtrl', function($scope,$window,$state,$http) {
	$scope.getChoices = function(){
		$http({
		  method: 'GET',
		  url: 'http://10.216.234.94:3000/api/Preferences/getList/',
		  params: {access_token: $window.token}
		}).then(function successCallback(response) {
                    console.log(response);
		    $scope.Choices = response.data;
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	};
	$scope.getSearchData = function(categoryId) {
		$window.categoryId = categoryId;
		// do the api call to get all the data using the topicId
		$state.go('app.single');
	};
	$scope.getChoices();
})

.controller('TopicCtrl', function($scope, $window, $state, $stateParams,$http) {
	$scope.getSearchedData = function(){
		$http({
		  method: 'GET',
		  url: 'http://10.216.234.94:3000/api/Listings/getSearchedList/',
		  params: {prefId: $window.categoryId}
		}).then(function successCallback(response) {
		    console.log(response);
		    $scope.searchedData = response.data;
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	};
	$scope.goToPickedResult = function(topicId) {
		$window.pickedId = topicId;
		// do the api call to get all the data using the topicId
		$state.go('app.result');
	};
	$scope.getSearchedData();
})

.controller('ResultCtrl', function($scope, $window, $stateParams) {
  	$scope.pickedId = $window.pickedId;

	$scope.getListing = function(){
		$http({
		  method: 'GET',
		  url: 'http://10.216.234.94:3000/api/Listings/getDetails/',
		  params: {listingId: $scope.pickedId}
		}).then(function successCallback(response) {
		     console.log(response);
		     $scope.details = response.data;
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	};
});