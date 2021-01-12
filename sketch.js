var Monkey , Monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var jungle,jungleImage,invisibleGround;
var score;
var PLAY=1;
var END=0;
var gameState =1;
function preload(){
  
  Monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage= loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600,600);
  
  jungle=createSprite(300,280,600,10);
  jungle.scale=0.9; 
 jungle.addImage( jungleImage);
  jungle.velocityX=-3;
  
  Monkey=createSprite(50,450,10,10);
  Monkey.addAnimation("running",Monkey_running);
  Monkey.scale=0.1;
  Monkey.setCollider("rectangle",0,0,300,600);
  
  score=0
  
 
  invisibleGround=createSprite(300,450,600,10)
  invisibleGround.visible=false;
 
  obstacleGroup=new Group();
  FoodGroup=new Group();
  
}
function draw() {
background(255) 
  
  spawnBanana()
  spawnObstacles() 
  Monkey.collide(invisibleGround);
  obstacleGroup.collide(invisibleGround);
  
 Monkey.velocityY = Monkey.velocityY + 0.8;
  if(jungle.x<200) {
    jungle.x = jungle.width /2;
  }
  
if(keyDown("space")&& Monkey.y >= 380) {
        Monkey.velocityY = -12;
   } 
  
  if (FoodGroup.isTouching(Monkey)) {
      FoodGroup.destroyEach()
    score=score+2;
      }
  
  switch(score) {
    case 10: Monkey.scale=0.12;  
      break;
    case 20: Monkey.scale=0.14;  
      break; 
    case 30: Monkey.scale=0.16;  
      break;  
    case 40: Monkey.scale=0.18;  
      break;  
      default:break;
  }
  
  if ( obstacleGroup.isTouching(Monkey)) {
       obstacleGroup.destroyEach()
    Monkey.scale=0.1;
   score=score-2;
  }
  
 
  
  
  
  drawSprites();
  
  textSize(14)
  stroke("white")
  text ("Score:"+score,500,150)
}
 function spawnBanana()            {  
   if (frameCount % 180 === 20) {
    var Banana= createSprite(580,120,40,10);
    Banana.y = Math.round(random(300,340));
    Banana.addImage(bananaImage);
    Banana.scale = 0.1;
    Banana.velocityX = -4;
    Banana.lifetime=200; 
     FoodGroup.add(Banana)
   }
 }
   function spawnObstacles()            {  
   if (frameCount % 300 === 0) {
    var obstacle= createSprite(580,450,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
     obstacle.lifetime=200;
     obstacleGroup.add(obstacle)
     //to set collider
     obstacle.setCollider("circle",0,0,200);
   }
 }
  