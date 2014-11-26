var ChopperMovement = function(sprite){
  this.chopper = sprite;
  this.speed = {
    left: 0,
    right: 0,
    up: 0,
    down: 0
  }
  this.maxSpeed = 5;
  this.minSpeed = 0;
  this.speedIncrement = 0.1;
  this.speedDecrement = 0.04;
  this.rotationIncrement = 0.03;
  this.rotationDecrement = 0.02;
  this.maxRotation = 0.65;
  this.rotation = 0;
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

ChopperMovement.prototype.move = function(){
  this.chopper.position.x += (this.speed.right - this.speed.left);
  this.chopper.position.y += (this.speed.down - this.speed.up);
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
