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

.controller('LoginCtrl', function($scope,$state,$ionicPopup,LoginService) {
    $scope.data = {};
 
    $scope.performLogin = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('app.browse');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('TopicsCtrl', function($scope) {
  $scope.topics = [
    { title: 'Car', id: 1 },
    { title: 'Rent', id: 2 }]
})

.controller('TopicCtrl', function($scope, $window, $state, $stateParams) {
  $scope.result = [
    { title: 'Frontenacs VS Ottawa 67 march 12 7:00pm (7) tickets', imglink: 'http://i.ebayimg.com/00/s/NDEzWDMxMA==/z/xrMAAOSwu1VW2d3k/$_35.JPG', url: 'http://www.kijiji.ca/v-tickets/kingston-on/frontenacs-vs-ottawa-67-march-12-7:00pm-7-tickets/1144997559', price: 'PRICE', id: 1 },
    { title: 'YOLOFrontenacs VS Ottawa 67 march 12 7:00pm (7) tickets', imglink: 'http://i.ebayimg.com/00/s/NDEzWDMxMA==/z/xrMAAOSwu1VW2d3k/$_35.JPG', url: 'http://www.kijiji.ca/v-tickets/kingston-on/frontenacs-vs-ottawa-67-march-12-7:00pm-7-tickets/1144997559', price: 'PRICE', id: 2 }];

	$scope.goToPickedResult = function(topicId) {
		$window.pickedId = topicId;
		$state.go('app.result');
	};
})

.controller('ResultCtrl', function($scope, $window, $stateParams) {
  $scope.pickedId = $window.pickedId;
});
