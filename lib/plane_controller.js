var PlaneController = function(sprite, side){
  "use strict";
  this.sprite = sprite;
  this.side = side;
  this.plane = sprite;
  this.lateralSpeed = 0;
  this.descentSpeed = 0;
  this.maxSpeed = 6;
  this.minSpeed = 2.5;
  if(this.side === "right"){
    this.plane.scale.x = -1;
    this.initX = 900;
  }else{
    this.plane.scale.x = 1;
    this.initX = -100;
  }
  this.reset();
};

PlaneController.prototype.reset = function(){
  "use strict";
  this.inFlight = false;
  this.plane.anchor.x = 0.5;
  this.plane.anchor.y = 0.5;
  this.plane.position.x = 900;
  this.plane.position.y = 50;
};

PlaneController.prototype.onTick = function(dodgedCallback){
  "use strict";
  if(!this.inFlight){
    this.launch();
  }else{
    var ableToMove = this.move();
    if(!ableToMove){
      dodgedCallback.call();
    }
  }
};

PlaneController.prototype.launch = function(){
  "use strict";
  this.plane.position.x = this.initX;
  this.plane.position.y = this.generateHeight();
  this.lateralSpeed = (Math.random() * this.maxSpeed) + this.minSpeed;
  this.descentSpeed = Math.random();
  this.inFlight = true;
};

PlaneController.prototype.move = function(){
  "use strict";
  if(this.inFlight){
    if(this.isInFrame()){
      this.moveOnTick();
      return true;
    }else{
      this.inFlight = false;
      return false;
    }
  }
};

PlaneController.prototype.moveOnTick = function(){
  "use strict";
  if(this.side === "right"){
    this.plane.position.x -= this.lateralSpeed;
  }else{
    this.plane.position.x += this.lateralSpeed;
  }
  this.plane.position.y += this.descentSpeed;
};

PlaneController.prototype.isInFrame = function(){
  "use strict";
  if(this.plane.position.y > 625){
    return false;
  }

  if(this.side === "right"){
    return this.plane.position.x > -50;
  }else{
    return this.plane.position.x < 850;
  }
};

PlaneController.prototype.generateHeight = function(){
  "use strict";
  return (Math.random() * 575) + 25;
};

module.exports = PlaneController;
