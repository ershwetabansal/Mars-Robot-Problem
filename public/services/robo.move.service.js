(function() {
  angular.module('MarsRobo').service('RoboMove',roboMove);

  var dirObj = {L : {N : 'W', W : 'S', S : 'E', E : 'N'}, R : {N : 'E', E : 'S', S : 'W', W : 'N'}};

  var validTurn = ['L','R'];
  var forward = 'F';

  function roboMove() {
    var maxX;
    var maxY;
    var x;
    var y;
    var direction;
    var lost;
    var scentedCoords = [];

    	this.setGridSize = function(xCoord,yCoord){
    		maxX = xCoord;
    		maxY = yCoord;
    	};
    	this.setPosition = function(xCoord,yCoord,dir){
    		x = xCoord;
    		y = yCoord;
    		direction = dir;
    		lost = false;
    		validate();
    	};
    	this.getPosition = function(){
    		return {
    			x : x,
    			y : y,
    			d : direction,
    			lost : lost
    		};
    	};
    	this.setMoves = function(moves){
 
    		if (typeof(moves) === "undefined") return;
    		var movesArray = moves.split('');
    		for (var i=0,len = movesArray.length; i < len; i++) { 
    			var move = movesArray[i];
    			if (validTurn.indexOf(move) > -1)  direction = (dirObj[move])[direction];
    			if (move === forward) setPosOnForward();
    			validate();
    			if(lost) return false;
    		}
    		
    	};    


    	function setPosOnForward(){
    		switch (direction) {
    			case 'N' : {y++;break;}
    			case 'E' : {x++;break;}
    			case 'W' : {x--;break;}
    			case 'S' : {y--;break;}
    		}
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
  				if (x > maxX || x < 0) x = maxX;
  				if (y > maxY || y < 0) y = maxY;
  			}
  			
  		}
  }

})();