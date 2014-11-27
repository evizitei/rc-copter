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

SpriteComparator.prototype.checkOverlap = function(dimension, coordDelta){
  "use strict";
  var dimensionDelta = (this.obstacle[dimension] + this.target[dimension])/2;
  var positiveOverlap = coordDelta < dimensionDelta;
  var negativeOverlap = coordDelta > (dimensionDelta * -1);
  return (positiveOverlap && negativeOverlap);
};

SpriteComparator.prototype.hasXOverlap = function(){
  "use strict";
  return this.checkOverlap("width", this.xDelta());
};

SpriteComparator.prototype.hasYOverlap = function(){
  "use strict";
  return this.checkOverlap("height", this.yDelta());
};

SpriteComparator.prototype.hasOverlap = function(){
  "use strict";
  return (this.hasXOverlap() && this.hasYOverlap());
};

module.exports = SpriteComparator;
