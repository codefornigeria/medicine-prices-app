angular.module('app.controllers', ['ngAnimate'])
  
.controller('appCtrl', function($scope, $state, $stateParams, Restangular, $location, $anchorScroll) {
    Restangular.all('medicine').getList().then(function(response){
        $scope.medicines = _.uniq(response, function(o){
         return o.name
        });
        console.log($scope.medicines);
    })

    $scope.textChanged = function() {
        $scope.showResults = true;
    }
    
	$scope.scrollTo = function(id) {
		// $location.hash(id);
	    $anchorScroll();
	};

	$scope.select = function(med) {
        console.log(med)
        $scope.medList = med.name;
        $scope.showResults = false;
    }

    $scope.step1 = function() {
    	$scope.one = true;
    }

    $scope.step2 = function() {
    	$scope.two = true;
    }
})
