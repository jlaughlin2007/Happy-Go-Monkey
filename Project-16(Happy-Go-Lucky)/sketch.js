
var monkey, monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1
var END = 0
var gameState = 1
var gameOverSound;

function preload(){
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOverSound = loadSound("Oof.mp3");
  
  
 monkeyRunning = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
 
 
}



function setup() {
  createCanvas(600,200);
  
  ground = createSprite(400,175,1200,10);
  monkey = createSprite(100,160,20,50);
  monkey.addAnimation("monkey running",monkeyRunning);
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
}


function draw() {
  
  background("black")
  
  
  monkey.scale = 0.1;
  
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score,499,20)
  
  if(gameState === PLAY){
    monkey.velocityY = monkey.velocityY + 0.75

    if(keyWentDown("space") && monkey.y >= 139.3){
      monkey.velocityY = -11.2;  
    }

    ground.velocityX = -(4 + 3* score/10);
    if(ground.x < 0){
    ground.x = ground.width/2
    }

    stroke("white");
    textSize(20); 
    fill("white");
    survivalTime=Math.ceil(Math.round(frameCount/frameRate()));
    text("Survival time: " + survivalTime, 10,20);


    banana();
    obstacle();

    if(monkey.isTouching(foodGroup)){
      score = score + 1 
      foodGroup.setLifetimeEach(0);
    }
    
    if(monkey.collide(obstacleGroup)){
    gameOverSound.play();
    gameState = END;  
    }
  }
  
  if(gameState === END){
    survivalTime = survivalTime;
    stroke("white");
    textSize(20); 
    fill("white");
    text("Survival time: " + survivalTime, 10,20);
    stroke("white");
    textSize(30); 
    fill("white");
    text("GAMEOVER",200,75)
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);  
    foodGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
  }
  drawSprites();
}

function banana(){
  if(frameCount % 80 === 0){
    var rand = Math.round(random(80,90));
    bananaSprite = createSprite(400,rand,10,10);
    bananaSprite.velocityX = -(8 + 3* score/10)
    bananaSprite.addImage("banana image", bananaImage)
    bananaSprite.scale = 0.1
    bananaSprite.lifetime = 50.5
    foodGroup.add(bananaSprite); 
  }
}

function obstacle(){
  if (frameCount % 300 === 0){
    var obstacleSprite = createSprite(400,155,10,40);
    obstacleSprite.velocityX = -(8 + 3* score/10)
    obstacleSprite.addImage("obstscle image", obstacleImage);
    obstacleSprite.scale = 0.1 
    obstacleSprite.lifetime = 50.5
    obstacleGroup.add(obstacleSprite)
    

  }
}


