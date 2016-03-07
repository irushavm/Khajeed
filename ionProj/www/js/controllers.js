angular.module('starter.controllers', [])

.controller('AppController',function($scope, $ionicModal, $timeout) {

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

.controller('LoginController', function($scope,$state,$ionicPopup,$window,LoginService) {
    $scope.data = {};
    $state.go($state.current, {}, {reload: true});
  $scope.performLogin = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password,function (){
        if($window.token){
          $state.go('app.preferencelist');
        }
        else{
          var alertPopup = $ionicPopup.alert({
             title: 'Login Failed',
             template: 'Please re-try again'
          });
        }
      });
    };

  $scope.performRegistration = function() {
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="email" ng-model="data.email"><input type="password" ng-model="data.password">',
      title: 'Register with an Email and Password',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        {
          text: '<b>Cancel</b>',
          type: 'button-energized'
        },
        {
          text: '<b>Save</b>',
          type: 'button-energized',
          onTap: function(e) {
            if (!$scope.data.email || !$scope.data.password) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return {email:$scope.data.email,password:$scope.data.password};
            }
          }
        },
      ]
    }).then(function(response) {
      LoginService.signupUser(response.email, response.password, function(err) {
        if(err) {
          var alertPopup = $ionicPopup.alert({
             title: 'Registration Failed',
             template: 'Please try again'
          });
        }
      });
    });
  };

})


.controller('PreferenceAddController', function($scope,$state,$ionicPopup,$window,PreferenceAddService) {
  $scope.data = {};

  $scope.addPreferences = function() {
      PreferenceAddService.AddPrefs($scope.data.tittle, $scope.data.city,
      $scope.data.category, $scope.data.keywords.split(", "), ['']/*$scope.data.filters.split(", ")*/, function (err) {
        if(err) {
          console.error(err);
        }
        else{
          $state.go('app.preferencelist');
          var alertPopup = $ionicPopup.alert({
             title: 'Preferences Added',
             template: 'Check the \'My Preferences\' page '
          });
        }
      });
  };

  $scope.doPrefs = function() {
    console.log('Doing preferences', $scope.data);
  };

})

.controller('PreferenceListController', function($scope,$window,$state,$http) {
	$scope.getChoices = function(){
		$http({
		  method: 'GET',
		  url: 'http://localhost:3000/api/Preferences/getList/',
		  params: {access_token: $window.token}
		}).then(function successCallback(response) {
                    console.log(response);
		    $scope.choices = response.data.response.data;
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
		$state.go('app.single', {}, {reload: true});
	};


$scope.$on('$ionicView.beforeEnter', function() {
  	$scope.getChoices();
});

})

.controller('ListingsController', function($scope, $window, $state, $stateParams,$http) {
	$scope.getSearchedData = function(){
    $scope.searchedData = [];
		$http({
		  method: 'GET',
		  url: 'http://localhost:3000/api/Listings/getSearchedList/',
		  params: {prefId: $window.categoryId , access_token: $window.token}
		}).then(function successCallback(response) {
		    console.log(response);
		    $scope.searchedData = response.data.response.data;

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	};
	$scope.getFavoriteData = function(){
		$http({
		  method: 'GET',
		  url: 'http://localhost:3000/api/Listings/getSavedList/',
		  params: {prefId: $window.categoryId , access_token: $window.token}
		}).then(function successCallback(response) {
		    console.log(response);
		    $scope.searchedData = response.data.response.data;
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
		$state.go('app.listingdetails');
	};

  	$scope.getSearchedData();
})

.controller('ListingDetailsController', function($scope, $window, $stateParams,$state,$http) {
	$scope.getListing = function(){
    $scope.details = {};
		$http({
		  method: 'GET',
		  url: 'http://localhost:3000/api/Listings/getDetails/',
		  params: {listingId: $window.pickedId , access_token: $window.token}
		}).then(function successCallback(response) {
		     console.log(response);
		     $scope.details = response.data.response.data;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	};

	$scope.saveListing = function(listingId){
		$http({
		  method: 'POST',
		  url: 'http://localhost:3000/api/Listings/saveListing/',
		  params: {listingId:$window.pickedId, access_token: $window.token}
		}).then(function (successResponse) {
				console.log(successResponse);
			},
			function (errorResponse) {
				console.log(errorResponse);
			});
	};

	$scope.removeListing = function(listingId){
		$http({
		  method: 'POST',
		  url: 'http://localhost:3000/api/Listings/removeListing/',
		  params: {listingId:$window.pickedId, access_token: $window.token}
		}).then(function (successResponse) {
				console.log(successResponse);
        $state.go('app.single');
			},
			function (errorResponse) {
				console.log(errorResponse);
			});
	};

  $scope.$on('$ionicView.beforeEnter', function() {
		$scope.getListing();
  });
});
