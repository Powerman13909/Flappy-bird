var flappy_bird,flappy_flying,flappy_dead;
var bg,bg_img;
var invisible_ground;
var base,base_img;
var obstacle1,obstacle2,ob11,ob22,obstacleGroup;
var edges;
var coin,coin_img,coinGroup,coin_stop;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOver_img;
var score = 0;

function preload(){
  bg_img = 
    loadImage("bg.png");
  flappy_flying =
    loadAnimation("bird1.png","bird2.png","bird3.png");
  base_img = loadImage("base.png");
      ob11 = loadImage("pipe.png");
      ob22 = loadImage("pipeR.png");
  coin_img =                   loadAnimation("c1.png","c2.png","c3.png","c4.png","c5.png","c6.png")
  flappy_dead = loadAnimation("bird1.png");
  gameOver_img = loadImage("gameover.png");
  coin_stop = loadAnimation("c1.png");
}

function setup(){
  createCanvas(250,450);
  bg = createSprite(110,200)
  bg.addAnimation("bg",bg_img);
  edges = createEdgeSprites();
  flappy_bird = createSprite(100,140,20,50);
  flappy_bird.addAnimation("Flappy",flappy_flying);
  flappy_bird.addAnimation("change",flappy_dead);

  gameOver = createSprite(120,150);
  gameOver.addImage("gameOver",gameOver_img)
  invisible_ground = createSprite(160,350,250,5);
 base = createSprite(160,400,20,50)
  base.addAnimation("base",base_img);
  obstacleGroup = createGroup();
  coinGroup = createGroup();
  flappy_bird.scale = 0.7;
  
  
  
}

function draw(){
  background(220)
  invisible_ground.visible = false;
  
  if(gameState ==PLAY){
    gameOver.visible = false;
    spawnObstaclesAbove();
  
  spawnCoin();
    
   
  
    bg.velocityX = -2
  if(bg.x<0){
    bg.x = bg.width/8;
  }
  base.velocityX = -2;
  if(base.x<0){
    base.x =base.width/2;
  }
    if(keyDown("up")){
    flappy_bird.y = flappy_bird.y+-9  ;                  
  }
  flappy_bird.velocityY+=0.01
  if(keyDown("down")){
    flappy_bird.y = flappy_bird.y+4  ;                  
  } 
  if(obstacleGroup.isTouching(flappy_bird)){
    gameOver.visible = true;
    gameState = END;
  }
  
   if(coinGroup.isTouching(flappy_bird)){
      score+=1;
    }
    
  }
  
 
else if(gameState == END){
 bg.velocityX=0;
  base.velocityX = 0;
  
    flappy_bird.velocityY = 0; 
    flappy_bird.changeAnimation("change", flappy_dead)
  
    obstacleGroup.setVelocityXEach(0);
  coinGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
  if(mousePressedOver(gameOver)){
      reset();      
    }
  
      }
   //base.depth  =  obstacleGroup.depth;
  base.depth+=1
  text(mouseX+","+mouseY,mouseX,mouseY);
  flappy_bird.collide(invisible_ground);
 
  
  drawSprites();
  textSize(20);
  fill("yellow");
  text("SCORE:"+score,150,40);
  
  
  
  
}

function spawnObstaclesAbove(){
  if(frameCount%90 == 0){
    obstacle1 = createSprite(400,0);
    obstacle1.velocityX = -2;
    obstacle1.y= Math.round(random(0,80));
    obstacle1.addImage(ob22);
    obstacle1.scale = 0.5
    obstacle1.lifetime = 400;
    obstacleGroup.add(obstacle1);
    
     obstacle2 = createSprite(400,0);
    obstacle2.velocityX = -2;
    obstacle2.y= Math.round(random(260,340));
    obstacle2.addImage(ob11);
     obstacle2.scale = 0.5
   obstacle2.lifetime = 400;
    obstacleGroup.add(obstacle2);
  }
}


function spawnCoin(){
  if(frameCount%180 == 0){
    coin = createSprite(200);
    coin.y = Math.round(random(150,190))
    
  coin.addAnimation("coin",coin_img);
    coin.velocityX = -2;
    coin.lifetime = 400;
    coin.scale = 0.1;
    coinGroup.add(coin);
    
    
  }
}

function reset(){
  
  gameState = PLAY;
  gameOver.visible = false;
  
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  flappy_bird.changeAnimation("Flappy", flappy_flying);
  score = 0;
}


