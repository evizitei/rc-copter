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
  this.speedIncrement = 0.15;
  this.speedDecrement = 0.04;
};

ChopperMovement.prototype.increaseSpeed = function(direction){
  if(this.speed[direction] >= this.maxSpeed){
    this.speed[direction] = this.maxSpeed;
  }else{
    this.speed[direction] += this.speedIncrement;
  }
};

ChopperMovement.prototype.move = function(){
  this.chopper.position.x += (this.speed.right - this.speed.left);
  this.chopper.position.y += (this.speed.down - this.speed.up);
};

ChopperMovement.prototype.reduceSpeed = function(keyMap){
  Object.keys(keyMap).forEach(function(key){
    if((!keyMap[key]) && this.speed[key] > 0){
      this.speed[key] -= this.speedDecrement;
    }else if(this.speed[key] < 0){
      this.speed[key] = 0;
    }
  }, this);
};

module.exports = ChopperMovement;
