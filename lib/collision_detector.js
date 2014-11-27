var SpriteComparator = require("./sprite_comparator");

var CollisionDetector = function(){
  "use strict";
};

CollisionDetector.prototype.areCollisions = function(targetSprite, obstacles){
  "use strict";
  var collision = false;
  obstacles.forEach(function(obstacle){
    var comparator = new SpriteComparator(targetSprite, obstacle);
    if(comparator.hasOverlap()){ collision = true; }
  });
  return collision;
};

module.exports = CollisionDetector;
