var PIXI = require("./vendor/pixi.dev.js");
var keydrown = require("./vendor/keydrown.js");
var ChopperMovement = require('./chopper_movement.js');
var PlaneController = require('./plane_controller.js');
var CollisionDetector = require('./collision_detector.js');

var stage = new PIXI.Stage(0x66FF99);
var renderer = new PIXI.CanvasRenderer(800, 600);
var gameOver = false;
var score = 0;
var requestAnimFrame = window.requestAnimationFrame;

//build all textures and sprites
var backgroundTexture = PIXI.Texture.fromImage("background.jpg");
var chopperTexture = PIXI.Texture.fromImage("chopper.png");
var airplaneTexture = PIXI.Texture.fromImage("plane.png");
var background = new PIXI.Sprite(backgroundTexture);
var chopper = new PIXI.Sprite(chopperTexture);
var planeCount = 4;
var planeSprites = [];
var planes = [];
//build motion and collision controllers
var collisionManager = new CollisionDetector();
var chopMovement = new ChopperMovement(chopper);

var renderView = function(){
  var scoreLabel = document.getElementById("score");
  scoreLabel.innerHTML = score;
};

var resetGame = function(){
  gameOver = false;
  score = 0;
  chopMovement.reset();
  planes.forEach(function(controller){
    controller.reset();
  });
  renderView();
};

var buildResetButton = function(){
  var button = document.createElement('button');
  button.innerHTML = 'Reset';
  button.onclick = function(){
    resetGame();
    return false;
  };
  window.onload = function(){
    document.getElementById("scoreboard").appendChild(button);
  };
};

document.body.appendChild(renderer.view);
buildResetButton();

background.position.x = 0;
background.position.y = 0;
background.scale.x = 1.25;
background.scale.y = 1.25;

stage.addChild(background);
stage.addChild(chopper);

//build planes
for(var i = 0; i < 4; i++){
  var newPlaneSprite = new PIXI.Sprite(airplaneTexture);
  var direction = 'right';
  if(Math.random() >= 0.5){
    direction = 'left';
  }
  var newController = new PlaneController(newPlaneSprite, direction);
  planeSprites.push(newPlaneSprite);
  planes.push(newController);
  stage.addChild(newPlaneSprite);
}


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

var onCompleteDodge = function(){
  score += 1;
};

var processPlaneMoves = function(controllers){
  controllers.forEach(function(plane){
    plane.onTick(function(){ onCompleteDodge(); });
  });
};

var checkCollisions = function(chopper, obstacles){
  obstacleSprites = obstacles.map(function(obst){ return obst.sprite; });
  if(collisionManager.areCollisions(chopper.sprite, obstacleSprites)){
    gameOver = true;
  }
};

var animate = function () {
  if(!gameOver){
    processChopperMoves();
    processPlaneMoves(planes);
    checkCollisions(chopMovement, planes);
    renderView();
    renderer.render(stage);
  }
  requestAnimFrame(animate);
};

requestAnimFrame(animate);
