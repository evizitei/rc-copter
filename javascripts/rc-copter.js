var PIXI = require("./vendor/pixi.dev.js")
var keydrown = require("./vendor/keydrown.js")
var stage = new PIXI.Stage(0x66FF99);
var renderer = new PIXI.CanvasRenderer(800, 600);
window.requestAnimFrame = window.requestAnimationFrame;

document.body.appendChild(renderer.view);

var chopperTexture = PIXI.Texture.fromImage("chopper.png");
var chopper = new PIXI.Sprite(chopperTexture);

chopper.anchor.x = 0.5;
chopper.anchor.y = 0.5;
chopper.position.x = 200;
chopper.position.y = 150;

stage.addChild(chopper);

function animate(){
  requestAnimFrame(animate);
  chopper.rotation += 0.01;
  renderer.render(stage);
};

requestAnimFrame(animate);
