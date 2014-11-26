var PIXI = require("./vendor/pixi.dev.js");
var keydrown = require("./vendor/keydrown.js");
var ChopperMovement = require('./chopper_movement.js');
var stage = new PIXI.Stage(0x66FF99);
var renderer = new PIXI.CanvasRenderer(800, 600);
var requestAnimFrame = window.requestAnimationFrame;


document.body.appendChild(renderer.view);

var chopperTexture = PIXI.Texture.fromImage("chopper.png");
var chopper = new PIXI.Sprite(chopperTexture);

chopper.anchor.x = 0.5;
chopper.anchor.y = 0.5;
chopper.position.x = 200;
chopper.position.y = 150;

stage.addChild(chopper);

chopMovement = new ChopperMovement(chopper);

keydrown.LEFT.down(function(){ chopMovement.increaseSpeed('left'); });
keydrown.RIGHT.down(function(){ chopMovement.increaseSpeed('right'); });
keydrown.UP.down(function(){ chopMovement.increaseSpeed('up'); });
keydrown.DOWN.down(function(){ chopMovement.increaseSpeed('down'); });

var animate = function () {
  requestAnimFrame(animate);
  //chopper.rotation += 0.01;
  chopMovement.move();
  renderer.render(stage);
  keydrown.tick();
  chopMovement.reduceSpeed({
    up: keydrown.UP.isDown(),
    down: keydrown.DOWN.isDown(),
    left: keydrown.LEFT.isDown(),
    right: keydrown.RIGHT.isDown(),
  });
};

requestAnimFrame(animate);
