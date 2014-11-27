var ChopperMovement = function(sprite){
  "use strict";
  this.sprite = sprite;
  this.chopper = sprite;
  this.maxSpeed = 5;
  this.minSpeed = 0;
  this.minX = 50;
  this.maxX = 750;
  this.minY = 25;
  this.maxY = 575;
  this.speedIncrement = 0.1;
  this.speedDecrement = 0.04;
  this.rotationIncrement = 0.03;
  this.rotationDecrement = 0.02;
  this.maxRotation = 0.65;
  this.setBoundsTemplates();
  this.reset();
};

ChopperMovement.prototype.setBoundsTemplates = function(){
  "use strict";
  this.bounds = {
    x: {
      maxBound: this.maxX,
      minBound: this.minX,
      maxDir: 'right',
      minDir: 'left'
    },
    y: {
      maxBound: this.maxY,
      minBound: this.minY,
      maxDir: 'down',
      minDir: 'up'
    }
  };
};

ChopperMovement.prototype.reset = function(){
  "use strict";
  this.chopper.anchor.x = 0.5;
  this.chopper.anchor.y = 0.5;
  this.chopper.position.x = 400;
  this.chopper.position.y = 150;
  this.rotation = 0;
  this.speed = {
    left: 0,
    right: 0,
    up: 0,
    down: 0
  };
};

ChopperMovement.prototype.increaseSpeed = function(direction){
  "use strict";
  if(this.speed[direction] >= this.maxSpeed){
    this.speed[direction] = this.maxSpeed;
  }else{
    this.speed[direction] += this.speedIncrement;
  }

  if(direction === "right"){
    if(this.rotation >= this.maxRotation){
      this.rotation = this.maxRotation;
    }else{
      this.rotation += this.rotationIncrement;
    }
  }else if(direction === "left"){
    this.rotation -= this.rotationIncrement;
    if(this.rotation <= (this.maxRotation * -1)){
      this.rotation = this.maxRotation * -1;
    }else{
      this.rotation -= this.rotationIncrement;
    }
  }
};

ChopperMovement.prototype.checkBoundary = function(pos){
  "use strict";
  var boundary = this.bounds[pos];
  if(this.chopper.position[pos] > boundary.maxBound){
    this.chopper.position[pos] = boundary.maxBound;
    this.speed[boundary.maxDir] = 0;
  }else if(this.chopper.position[pos] < boundary.minBound){
    this.chopper.position[pos] = boundary.minBound;
    this.speed[boundary.minDir] = 0;
  }
};

ChopperMovement.prototype.preventBoundaryViolation = function(){
  "use strict";
  this.checkBoundary('x');
  this.checkBoundary('y');
};

ChopperMovement.prototype.move = function(){
  "use strict";
  this.chopper.position.x += (this.speed.right - this.speed.left);
  this.chopper.position.y += (this.speed.down - this.speed.up);
  this.preventBoundaryViolation();
  this.chopper.rotation = this.rotation;
};

ChopperMovement.prototype.reduceSpeed = function(keyMap){
  "use strict";
  //adjust speed
  Object.keys(keyMap).forEach(function(key){
    if((!keyMap[key]) && this.speed[key] > 0){
      this.speed[key] -= this.speedDecrement;
    }else if(this.speed[key] < 0){
      this.speed[key] = 0;
    }
  }, this);

  //adjust rotation
  if((!keyMap.right) && this.rotation > 0){
    if(this.rotation < this.rotationDecrement){
      this.rotation = 0;
    }else{
      this.rotation -= this.rotationDecrement;
    }
  }

  if((!keyMap.left) && this.rotation < 0){
    if(this.rotation > (this.rotationDecrement * -1)){
      this.rotation = 0;
    }else{
      this.rotation += this.rotationDecrement;
    }
  }

};

module.exports = ChopperMovement;
