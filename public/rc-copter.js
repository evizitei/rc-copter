var stage = new PIXI.Stage(0x66FF99);
var renderer = PIXI.autoDetectRenderer(400, 300);

document.onload = function(){
  document.body.appendChild(renderer.view);
};

var chopperTexture = PIXI.Texture.fromImage("chopper.jpg");
var chopper = new PIXI.Sprite(chopperTexture);

chopper.anchor.x = 0.5;
chopper.anchor.y = 0.5;
chopper.position.x = 200;
chopper.position.y = 150;

stage.addChild(chopper);

var animate = function(){
  requestAnimFrame(animate);
  chopper.rotation += 0.1;
  renderer.render(stage);
};

requestAnimFrame(animate);

