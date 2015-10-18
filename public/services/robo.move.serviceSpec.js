describe('Mars Robo Service Testing', function() {
  'use strict';

  // Service instance
  var service;

  beforeEach(function() {
    module('MarsRobo');
  });
  beforeEach(
      inject(function(RoboMove){
        service = RoboMove;
      }));


  describe('should test Robo set positon', function() {
    beforeEach(function(){
      service.setGridSize(5,3);    
    });

    var posObj;
    beforeEach(function(){
      service.setPosition(1,1,'E');
      posObj = service.getPosition();        
    });

    it('should test the position', function() {
        expect(posObj.x).toBe(1);
        expect(posObj.y).toBe(1);
        expect(posObj.d).toBe('E');
        expect(posObj.lost).toBe(false);
    });
  });

  describe('should test the moves', function() {
    beforeEach(function(){
      service.setGridSize(5,3);    
    });
    
    it('should pass all scenarios', function() {
        //Scenario -1
        service.setPosition(1,1,'E');
        service.setMoves('RFRFRFRF');
        var posObj = service.getPosition();        
        expect(posObj.x).toBe(1);
        expect(posObj.y).toBe(1);
        expect(posObj.d).toBe('E');
        expect(posObj.lost).toBe(false);
    
        //Scenarion-2
        service.setPosition(3,2,'N');
        service.setMoves('FRRFLLFFRRFLL');
        var posObj = service.getPosition();        
        expect(posObj.x).toBe(3);
        expect(posObj.y).toBe(3);
        expect(posObj.d).toBe('N');
        expect(posObj.lost).toBe(true);
    
        //Scenario - 3
        service.setPosition(0,3,'W');
        service.setMoves('LLFFFLFLFL');
        var posObj = service.getPosition();        
        expect(posObj.x).toBe(2);
        expect(posObj.y).toBe(3);
        expect(posObj.d).toBe('S');
        expect(posObj.lost).toBe(false);
    });

});

  describe('should test the moves', function() {
    beforeEach(function(){
      service.setGridSize(2,2);    
    });

    it('should pass all scenarios', function() {
        //Scenario -1
        service.setPosition(1,1,'W');
        service.setMoves('FF');
        var posObj = service.getPosition();        
        expect(posObj.x).toBe(0);
        expect(posObj.y).toBe(1);
        expect(posObj.d).toBe('W');
        expect(posObj.lost).toBe(true);
    
        service.setPosition(1,1,'S');
        service.setMoves('FF');
        var posObj = service.getPosition();        
        expect(posObj.x).toBe(1);
        expect(posObj.y).toBe(0);
        expect(posObj.d).toBe('S');
        expect(posObj.lost).toBe(true);
    
    });

});

});