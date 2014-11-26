var PIXI = require("./vendor/pixi.dev.js");
var keydrown = require("./vendor/keydrown.js");
var ChopperMovement = require('./chopper_movement.js');
var PlaneController = require('./plane_controller.js');

var stage = new PIXI.Stage(0x66FF99);
var renderer = new PIXI.CanvasRenderer(800, 600);
var requestAnimFrame = window.requestAnimationFrame;

document.body.appendChild(renderer.view);

var backgroundTexture = PIXI.Texture.fromImage("background.jpg");
var chopperTexture = PIXI.Texture.fromImage("chopper.png");
var airplaneTexture = PIXI.Texture.fromImage("plane.png");
var background = new PIXI.Sprite(backgroundTexture);
var chopper = new PIXI.Sprite(chopperTexture);
var plane1 = new PIXI.Sprite(airplaneTexture);
var plane2 = new PIXI.Sprite(airplaneTexture);

background.position.x = 0;
background.position.y = 0;
background.scale.x = 1.25;
background.scale.y = 1.25;

chopper.position.x = 200;
chopper.position.y = 150;

stage.addChild(background);
stage.addChild(chopper);
stage.addChild(plane1);
stage.addChild(plane2);

var chopMovement = new ChopperMovement(chopper);
var oncomingPlane = new PlaneController(plane1, 'right');
var overtakingPlane = new PlaneController(plane2, 'left');
var planes = [oncomingPlane, overtakingPlane];

keydrown.LEFT.down(function(){ chopMovement.increaseSpeed('left'); });
keydrown.RIGHT.down(function(){ chopMovement.increaseSpeed('right'); });
keydrown.UP.down(function(){ chopMovement.increaseSpeed('up'); });
keydrown.DOWN.down(function(){ chopMovement.increaseSpeed('down'); });

var buildKeyStateMap = function(){
  return {
    up: keydrown.UP.isDown(),
    down: keydrown.DOWN.isDown(),
    left: keydrown.LEFT.isDown(),
    right: keydrown.RIGHT.isDown()
  };
};

var processChopperMoves = function(){
  chopMovement.move();
  chopMovement.reduceSpeed(buildKeyStateMap());
  keydrown.tick();
};

var processPlaneMoves = function(controllers){
  controllers.forEach(function(plane){
    plane.onTick();
  });
};

var animate = function () {
  requestAnimFrame(animate);
  processChopperMoves();
  processPlaneMoves(planes);
  renderer.render(stage);
};

requestAnimFrame(animate);
