var SpriteComparator = function(target, obstacle){
  "use strict";
  this.target = target;
  this.obstacle = obstacle;
};

SpriteComparator.prototype.xDelta = function(){
  "use strict";
  return this.obstacle.position.x - this.target.position.x;
};

SpriteComparator.prototype.yDelta = function(){
  "use strict";
  return this.obstacle.position.y - this.target.position.y;
};

SpriteComparator.prototype.hasXOverlap = function(){
  "use strict";
  var widthDelta = (this.obstacle.width + this.target.width)/2;
  var positiveOverlap = this.xDelta() < widthDelta;
  var negativeOverlap = this.xDelta() > (widthDelta * -1);
  return (positiveOverlap && negativeOverlap);
};

SpriteComparator.prototype.hasYOverlap = function(){
  "use strict";
  var heightDelta = (this.obstacle.height + this.target.height)/2;
  var positiveOverlap = this.yDelta() < heightDelta;
  var negativeOverlap = this.yDelta() > (heightDelta * -1);
  return (positiveOverlap && negativeOverlap);
};

SpriteComparator.prototype.hasOverlap = function(){
  "use strict";
  return (this.hasXOverlap() && this.hasYOverlap());
};
//end SpriteComparator

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
