(function() {
  angular.module('MarsRobo').controller('process',process);

  function process($scope,RoboMove) {
    
    $scope.output = new Array();
    $scope.refresh = function() {
		refreshView();
		$scope.maxX = "";
		$scope.maxY = "";
		$scope.output = new Array();
    	$scope.xCoord = "";
    	$scope.yCoord = "";
    	$scope.direction = "";
    	$scope.moves = "";
    }


    $scope.show = function() {
    	if ($scope.input_form.$valid) {
	      	RoboMove.setGridSize($scope.maxX,$scope.maxY);
			RoboMove.setPosition($scope.xCoord, $scope.yCoord, $scope.direction);
	    	RoboMove.setMoves($scope.moves);
	    	var posObj = RoboMove.getPosition();
	    	posObj.status = (posObj.lost) ? "LOST" : "";
	    	$scope.output.push(posObj);
	    	console.log("posObj : "+JSON.stringify(posObj));
	    	$scope.xCoord = "";
	    	$scope.yCoord = "";
	    	$scope.direction = "";
	    	$scope.moves = "";
	    } else {
	    	alert("Please enter input fields");
	      $scope.input_form.submitted = true;
	    }
    	
    }


  }
  process.$inject = ['$scope','RoboMove'];

})();