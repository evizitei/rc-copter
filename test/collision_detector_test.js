var expect = require("expect.js");
var CollisionDetector = require("../lib/collision_detector");

describe("CollisionDetector", function(){
  "use strict";
  describe("#areCollisions", function(){
    var detector, target;

    beforeEach(function(){
      detector = new CollisionDetector();
      target = {position: {x: 10, y: 10}, width: 20, height: 20};
    });

    it("returns true if rectangles overlap", function(){
      var obstacles = [{position: {x: 10, y: 10}, width: 20, height: 20}];
      expect(detector.areCollisions(target, obstacles)).to.be.ok();
    });

    it("returns true if rectangles overlap corners", function(){
      var obstacles = [{position: {x: 29, y: 29}, width: 20, height: 20}];
      expect(detector.areCollisions(target, obstacles)).to.be.ok();
    });

    it("returns false if rectangles just touch corners", function(){
      var obstacles = [{position: {x: 30, y: 30}, width: 20, height: 20}];
      expect(detector.areCollisions(target, obstacles)).to.not.be.ok();
    });

    it("returns false if rectangles touch a whole edge", function(){
      var obstacles = [{position: {x: 30, y: 10}, width: 20, height: 20}];
      expect(detector.areCollisions(target, obstacles)).to.not.be.ok();
    });
  });
});

