angular.module('app.controllers', ['ngAnimate'])
  
.controller('appCtrl', function($scope, $state, $stateParams, $location, $anchorScroll) {
    
	$scope.scrollTo = function(id) {
		$location.hash(id);
	    console.log($location.hash());
	    $anchorScroll();
	};

	$scope.search = function() {
        
    }

    $scope.step1 = function() {
    	$scope.one = true;
    }

    $scope.step2 = function() {
    	$scope.two = true;
    }
})
