var expect = require("expect.js");
var ChopperMovement = require("../lib/chopper_movement");

describe("ChopperMovement", function(){
  "use strict";
  var sprite, mover;
  beforeEach(function(){
    sprite = {anchor: {}, position: {}};
    mover = new ChopperMovement(sprite);
  });

  describe("#initialization", function(){
    it("sets reasonable defaults", function(){
      expect(sprite.position.x).to.equal(400);
      expect(sprite.position.y).to.equal(150);
    });
  });

  describe("#preventBoundaryViolation", function(){
    it('leaves speed and position alone if no violation', function(){
      sprite.position = {x: 400, y: 300};
      mover.speed = {right: 5, left: 0, down: 5, up: 0};
      mover.preventBoundaryViolation();
      expect(mover.speed).to.eql({right:5,left:0,down:5,up:0});
      expect(sprite.position).to.eql({x:400,y:300});
    });

    it("adjusts speed and position when over the boundary", function(){
      sprite.position = {x: mover.maxX + 100, y: 300};
      mover.speed = {right: 5, left: 0, down: 5, up: 0};
      mover.preventBoundaryViolation();
      expect(mover.speed).to.eql({right:0,left:0,down:5,up:0});
      expect(sprite.position).to.eql({x:mover.maxX,y:300});
    });
  });
});
