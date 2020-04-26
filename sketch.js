var rand;
var userPaddle, computerPaddle, computerScore, playerScore, gameState, ball,scoreSound, wall_hitSound, hitSound;
var touches=0;


function setup() {
  
createCanvas(
  window.innerWidth,
    window.innerHeight
);

//create a user paddle sprite
userPaddle = createSprite(window.innerWidth-20,200,10,70);

//create a computer paddle sprite
computerPaddle = createSprite(10,200,10,70);

//create the pong ball
ball = createSprite(window.innerWidth/2,window.innerHeight/2,12,12);

computerScore = 0;
playerScore = 0;
gameState = "serve";
}

function draw() {  
  //fill the computer screen with white color
  background("white");
  edges = createEdgeSprites();
  //display Scores
  text(computerScore,window.innerWidth/2+80,20);
  text(playerScore, window.innerWidth/2-80,20);

  //rand=round(random(10,20));
  //console.log(rand);
  //draw dotted lines
  for (var i = 0; i < 6400; i+=20) {
     line(window.innerWidth/2,i,window.innerWidth/2,i+10);
  }

  if (gameState === "serve") {
    text("Press Space to Serve",window.innerWidth/2,180);
    text("Just hit the ball 16 times and you will win",window.innerWidth/2,220);
  }

  if (gameState === "over") {
    text("Game Over!",window.innerWidth/2,160);
    text("Press 'R' to Restart",window.innerWidth/2,180);
  }

  if (keyDown("r") && gameState==="over") {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }


  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 5;
    ball.velocityY = 5;
    gameState = "play";
  }

  //make the userPaddle move with the mouse
  userPaddle.y = World.mouseY;



  //make the ball bounce off the user paddle
  if(ball.isTouching(userPaddle)){
    //hitSound.play();
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }

  //make the ball bounce off the computer paddle
  if(ball.isTouching(computerPaddle)){
    //hitSound.play();
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
    touches++;
  }

  //place the ball back in the centre if it crosses the screen
  if(ball.x > window.innerWidth || ball.x < 0){
    //scoreSound.play();

  if (ball.x < 0) {
      playerScore++;
  touches=0;  
  }
    else {
      computerScore++;
    touches=0;
    }

    ball.x = window.innerWidth/2;
    ball.y = window.innerHeight/2;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";

    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }

  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    //wall_hitSound.play();
  }

  
  console.log(touches);
  //add AI to the computer paddle so that it always hits the ball
  if(touches<15){
  computerPaddle.y = ball.y;
  }
  else{
   computerPaddle.y=ball.y+50; 
  }
    drawSprites();
}
