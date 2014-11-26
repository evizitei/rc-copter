var ChopperMovement = function(sprite){
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
  this.reset()
};

ChopperMovement.prototype.reset = function(){
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
  }
};

ChopperMovement.prototype.increaseSpeed = function(direction){
  if(this.speed[direction] >= this.maxSpeed){
    this.speed[direction] = this.maxSpeed;
  }else{
    this.speed[direction] += this.speedIncrement;
  }

  if(direction === 'right'){
    if(this.rotation >= this.maxRotation){
      this.rotation = this.maxRotation;
    }else{
      this.rotation += this.rotationIncrement;
    }
  }else if(direction === 'left'){
    this.rotation -= this.rotationIncrement;
    if(this.rotation <= (this.maxRotation * -1)){
      this.rotation = this.maxRotation * -1;
    }else{
      this.rotation -= this.rotationIncrement;
    }
  }
};

ChopperMovement.prototype.preventBoundaryViolation = function(){
  if(this.chopper.position.x > this.maxX){
    this.chopper.position.x = this.maxX;
    this.speed.right = 0;
  }
  if(this.chopper.position.x < this.minX){
    this.chopper.position.x = this.minX;
    this.speed.left = 0;
  }
  if(this.chopper.position.y > this.maxY){
    this.chopper.position.y = this.maxY;
    this.speed.down = 0;
  }
  if(this.chopper.position.y < this.minY){
    this.chopper.position.y = this.minY;
    this.speed.up = 0;
  }
};

ChopperMovement.prototype.move = function(){
  this.chopper.position.x += (this.speed.right - this.speed.left);
  this.chopper.position.y += (this.speed.down - this.speed.up);
  this.preventBoundaryViolation();
  this.chopper.rotation = this.rotation;
};

ChopperMovement.prototype.reduceSpeed = function(keyMap){
  //adjust speed
  Object.keys(keyMap).forEach(function(key){
    if((!keyMap[key]) && this.speed[key] > 0){
      this.speed[key] -= this.speedDecrement;
    }else if(this.speed[key] < 0){
      this.speed[key] = 0;
    }
  }, this);

  //adjust rotation
  if((!keyMap['right']) && this.rotation > 0){
    if(this.rotation < this.rotationDecrement){
      this.rotation = 0;
    }else{
      this.rotation -= this.rotationDecrement;
    }
  }

  if((!keyMap['left']) && this.rotation < 0){
    if(this.rotation > (this.rotationDecrement * -1)){
      this.rotation = 0;
    }else{
      this.rotation += this.rotationDecrement;
    }
  }

};

module.exports = ChopperMovement;
