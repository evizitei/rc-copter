var PlaneController = function(sprite, side){
  this.side = side;
  this.plane = sprite;
  this.plane.anchor.x = 0.5;
  this.plane.anchor.y = 0.5;
  this.plane.position.x = 900;
  this.plane.position.y = 50;
  this.lateralSpeed = 4;
  this.descentSpeed = 1;
  this.inFlight = false;
  if(this.side === 'right'){
    this.plane.scale.x = -1;
    this.initX = 900;
  }else{
    this.plane.scale.x = 1;
    this.initX = -100;
  }
};

PlaneController.prototype.onTick = function(){
  if(!this.inFlight){
    this.launch();
  }else{
    this.move();
  };
};

PlaneController.prototype.launch = function(){
  this.plane.position.x = this.initX;
  this.plane.position.y = this.generateHeight();
  this.lateralSpeed = (Math.random() * 5) + 2;
  this.descentSpeed = Math.random();
  this.inFlight = true;
};

PlaneController.prototype.move = function(){
  if(this.inFlight){
    if(this.isInFrame()){
      this.moveOnTick();
    }else{
      this.inFlight = false;
    }
  }
};

PlaneController.prototype.moveOnTick = function(){
  if(this.side === 'right'){
    this.plane.position.x -= this.lateralSpeed;
  }else{
    this.plane.position.x += this.lateralSpeed;
  }
  this.plane.position.y += this.descentSpeed;
};

PlaneController.prototype.isInFrame = function(){
  if(this.plane.position.y > 625){
    return false;
  }

  if(this.side === 'right'){
    return this.plane.position.x > -50;
  }else{
    return this.plane.position.x < 850;
  }
};

PlaneController.prototype.generateHeight = function(){
  return (Math.random() * 500) + 50;
};

module.exports = PlaneController;
