angular.module('app.controllers', ['ngAnimate'])
  
.controller('appCtrl', function($scope, $state, $stateParams, Restangular, $location, $anchorScroll, $timeout, anchorSmoothScroll) {
    Restangular.all('medicine').getList().then(function(response){
        $scope.medicines = _.uniq(response, function(o){
         return o.name
        });
        $scope.unfilteredMedicines = response;
    })

    $scope.textChanged = function() {
        $scope.showResults = true;
    }
    
	$scope.scrollTo = function(eID) {
		$location.hash('main');
        anchorSmoothScroll.scrollTo(eID);
	    // $anchorScroll();
	};

    $scope.initTyper = function (nname,price,outcome) {
        $scope.typing = $(".typing").typed({
            strings: ["At &#8358;" +price+ ", you are paying "  +outcome+ "% of the global average price for " +nname+ "."],
            contentType: 'html',
            typeSpeed: 30,
            backDelay: 750,
            showCursor: false,
            callback: function(){ 
                $('.address').show();
            }
        });
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
        $scope.answer =  ($scope.credentials.price / (select.price * 300)) * 100;
        $scope.outcome = Math.round($scope.answer);
    	$scope.two = true;
        $scope.personNode = true;
        $scope.initTyper($scope.credentials.name,$scope.credentials.price,$scope.outcome);
        $timeout(function(){$scope.loaded = true}, 1000);
        
    }



    
    // $scope.share = function() {
    //     FB.ui({
    //         method: 'feed',
    //         name: 'At &#8358 $scope.credentials.price, we are paying $scope.judgement percent of the global average price for $scope.credentials.name',
    //         link: 'http://medicine-prices.herokuapp.com',
    //         picture: '',
    //         caption: '',
    //         description: 'This is the content of the "description" field, below the caption.',
    //         message: ''
    //     });
    // }

    
    $scope.close = function() {
        $scope.personNode = false;
        $state.reload();
    }
})

.directive('fbShare', [
    function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    FB.ui({
                        method: 'feed',
                        name: 'Name you want to show',
                        link: 'http://link-you-want-to-show',
                        picture: 'http://picture-you-want-to-show',
                        caption: 'Caption you want to show',
                        description: 'Description you want to show',
                        message: 'Message you want to show'
                    });
                });
            }
        };
    }
]);
