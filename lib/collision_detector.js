var CollisionDetector = function(){
  "use strict";
};

CollisionDetector.prototype.areCollisions = function(targetSprite, obstacles){
  "use strict";
  var collision = false;
  obstacles.forEach(function(obstacle){
    var xdist = obstacle.position.x - targetSprite.position.x;
    if(xdist > ((-obstacle.width + -targetSprite.width)/2) && xdist < ((obstacle.width + targetSprite.width)/2)){
      var ydist = obstacle.position.y - targetSprite.position.y;
      if(ydist > (-obstacle.height + -targetSprite.height)/2 && ydist < (obstacle.height + targetSprite.height)/2){
        collision = true;
      }
    }
  });
  return collision;
};

module.exports = CollisionDetector;
