
var monkey , monkey_running,monkey_stopped;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score,gameState;
var survivalTime;
var bck;
var groundImage;
function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkey_stopped=loadAnimation("monkey_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  bck=loadImage("landscape-5434778.png");
  
  groundImage=loadImage("bridge.png");
}



function setup() {
  createCanvas(600, 600);
  

background1=createSprite(300,300,600,600);
background1.addImage(bck);
background1.velocityX=-4;
background1.scale=0.5
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
  monkey.addAnimation("stopped",monkey_stopped);
   monkey.scale=0.1
  
  
  ground = createSprite(400,550,2000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
 
  

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  
  gameState="PLAY";
  
  survivalTime=0;
 
 
  
  
}


function draw() {
  
  background('white');
  
  
  
  
  
  
  if(gameState==="PLAY"){
    
    if(background1.x<150) {
       background1.x=300;
    }
    
   
    if(ground.x<0) {
       ground.x=ground.width/2;
    }
   
    
    
    if(keyDown("space") ) {
      
      monkey.velocityY = -12;
    
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
    
   
    
    FoodGroup.collide(monkey,dothis);
 
  
   if(obstaclesGroup.isTouching(monkey)){
        
        gameState="END"
    
    
    }
  
    if(frameCount%30===0){
      survivalTime=survivalTime+1;
    }
}
  
  if(gameState==="END"){
        background1.velocityX=0;
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.changeAnimation("stopped",monkey_stopped);
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        
  }
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime, 200,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 10,50);  
}
//ban is the current banana sprite and mon is monkey sprite
function dothis(ban,mon){
  
  ban.remove();
  score=score+10;
  
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(300,450);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    banana.depth=monkey.depth;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
     
   
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,520,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
