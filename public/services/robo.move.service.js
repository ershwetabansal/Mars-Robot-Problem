(function() {
  'use strict';
  angular.module('MarsRobo').service('RoboMove',roboMove);


  var dirObj = {L : {N : 'W', W : 'S', S : 'E', E : 'N'}, R : {N : 'E', E : 'S', S : 'W', W : 'N'}};
  var validTurns = ['L','R'];
  var validMoves = ['F'];
  
//If there is any new command added in future then we need to add the same in the above corresponding arrays.
//For example, if 'T' is added which may mean Left and forward. Then 'T' needs to be present in validTurn and forward array.
//At the same time, 'T' needs to be added dirObj for getting the new directions.

  
  function roboMove() {
    var maxX;
    var maxY;
    var x;
    var y;
    var direction;
    var lost;
    var scentedCoords = [];
    var posRecord = new Array();

      var vm = this;

    	vm.setGridSize = function(xCoord,yCoord){
    		maxX = xCoord;
    		maxY = yCoord;
    	};
      vm.getGridSize = function() {
        return {x : maxX, y : maxY};
      };
    	vm.setPosition = function(xCoord,yCoord,dir){
    		x = xCoord;
    		y = yCoord;
    		direction = dir;
    		lost = false;
    		validate();
    	};
    	vm.getPosition = function(){
    		return {
    			x : x,
    			y : y,
    			d : direction,
    			lost : lost
    		};
    	};
    	vm.setMoves = function(moves){
 
    		if (typeof(moves) === "undefined") return;
    		var movesArray = moves.split('');
        posRecord = new Array();
    		for (var i=0,len = movesArray.length; i < len; i++) { 
    			var move = movesArray[i];
    			if (validTurns.indexOf(move) > -1) {
            direction = (dirObj[move])[direction];
            validate();
            record();
          }
    			if (validMoves.indexOf(move) > -1) {
            setPosOnMove(move);
            validate();
            record();
          }
          if(lost) return false;
    		}
    		
    	};    
      vm.getPositionRecord = function() {
        return posRecord;
      }
    	function setPosOnMove(move){
        if (move === 'F') {
          switch (direction) {
            case 'N' : {y++;break;}
            case 'E' : {x++;break;}
            case 'W' : {x--;break;}
            case 'S' : {y--;break;}
          }          
        }
        //If there is any other forward command in future which might mean 2 steps forward or something else. That can be handled here.
    	}

    	function validate() {
    		if (x > maxX || y > maxY || x < 0 || y < 0) lost = true;
  			if (lost) {
  				var val = x + "-" + y;
  				if (scentedCoords.length ===0 || scentedCoords.indexOf(val) === -1) {
  					scentedCoords.push(val); 	
   				} else {
  					lost = false;
  				}
  				if (x > maxX) x = maxX;
          if (x < 0) x = 0;
  				if (y > maxY) y = maxY;
          if (y < 0) y =0;
  			}
  			
  		}

      function record(){
        posRecord.push(vm.getPosition());
      }
  }

})();