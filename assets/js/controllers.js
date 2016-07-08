angular.module('app.controllers', ['ngAnimate'])
  
.controller('appCtrl', function($scope, $state, $stateParams, Restangular, $location, $anchorScroll) {
    Restangular.all('medicine').getList().then(function(response){
        $scope.medicines = _.uniq(response, function(o){
         return o.name
        });
        $scope.unfilteredMedicines = response;
    })

    $scope.textChanged = function() {
        $scope.showResults = true;
    }
    
	$scope.scrollTo = function(id) {
        console.log(id)
		$location.hash(id);
	    $anchorScroll();
	};

	$scope.select = function(med) {
        $scope.credentials.name = med.name;
        $scope.showResults = false;
    }

    $scope.step1 = function() {
    	$scope.one = true;
        var selectedName = $scope.credentials.name;
        $scope.selected = _.filter($scope.unfilteredMedicines, function(o){ 
            return o.name == selectedName; 
        });
        console.log($scope.selected)
    }

    $scope.step2 = function(select) {
        $scope.judgement =  ($scope.credentials.price / select.price * 300) * 100;
        console.log($scope.judgement)
    	$scope.two = true;
        $scope.personNode = true;
    }

    $scope.close = function() {
        $scope.personNode = false;
        $state.reload();
    }
})
