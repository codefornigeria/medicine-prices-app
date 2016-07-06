angular.module('app.controllers', ['ngAnimate'])
  
.controller('appCtrl', function($scope, $state, $stateParams) {
    
	$scope.search = function() {
        
    }

    $scope.step1 = function() {
    	$scope.one = true;
    }

    $scope.step2 = function() {
    	$scope.two = true;
    }
})
