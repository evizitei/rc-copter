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
    it("leaves speed and position alone if no violation", function(){
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

  describe("#reset", function(){
    it("re-anchors the sprite", function(){
      sprite.anchor.x = 1;
      mover.reset();
      expect(sprite.anchor.x).to.equal(0.5);
    });

    it("puts the sprite back in starting position", function(){
      sprite.position = {x:1, y:1};
      mover.reset();
      expect(sprite.position).to.eql({x: 400, y: 150});
    });

    it("kills speed in all directions", function(){
      mover.speed = {left:2,right:1,up:4,down:3};
      mover.reset();
      expect(mover.speed).to.eql({left:0,right:0,up:0,down:0});
    });
  });

  describe("#increaseSpeed", function(){
    it("increases directional speed by the default increment", function(){
      mover.speed = {left:0,right:0,up:0,down:0};
      mover.increaseSpeed("right");
      expect(mover.speed.right).to.eql(mover.speedIncrement);
    });

    it("increases rotation when moving right", function(){
      mover.increaseSpeed("right");
      expect(mover.rotation).to.eql(mover.rotationIncrement);
    });

    it("decreases rotation when moving left", function(){
      mover.increaseSpeed("left");
      expect(mover.rotation).to.eql(mover.rotationIncrement * -1);
    });

    it("wont increase speed past max", function(){
      mover.speed.up = mover.maxSpeed;
      mover.increaseSpeed("up");
      expect(mover.speed.up).to.equal(mover.maxSpeed);
    });

    it("wont rotate past max", function(){
      mover.rotation = mover.maxRotation;
      mover.increaseSpeed("right");
      expect(mover.rotation).to.equal(mover.maxRotation);
    });
  });
});
