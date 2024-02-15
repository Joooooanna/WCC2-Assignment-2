

// Create connection to Node.JS Server
const socket = io();

let canvas;
let roll = 0;
let pitch = 0;
let yaw = 0;
// The ball object.
let ball;
// The paddle object.
let pad;
// The array containing all the bricks.
let bricks = [];
// Determines the number of columns for the brick grid.
let COLUMNS = 8;
// Determines the number of rows for the birck grid.
let ROWS = 5;
let padSpeed=0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  // canvas = createCanvas(600, 700);

    // Initialize the ball.
    ball = new Ball(width / 2, 320, 20);

    // Initialize the paddle at bottom of screen.
    pad = new Paddle(width / 2, 900, 100, 10);
    
    // Create the grid of bricks.
    for (let i = 0; i < COLUMNS; i++) {
      for (let j = 0; j < ROWS; j++) {
  
        // Create a brick at each position in the right format.
        bricks.push(new Brick(75 + (i * 50), 50 + (j * 50), 30, 20));
      }
    }
  // createEasyCam();
 
}

function draw() {
  background(0);
    // Moves the paddle according to the mouse.
    // pad.move();


    // If ball has been thrown, move it.
    if (ball.isThrown)
      ball.move();
  
    // Verify collision with edges.
    ball.checkHitEdges();
    
    // Check collision with paddle.
    ball.checkHit(pad);
  
    //performs the following functions on all the bricks in the 2D array bricks
    for (let i = 0; i < bricks.length; i++) {
      // Check to see if the ball hits the brick.
      if (bricks[i].isAlive)
        ball.checkHit(bricks[i]);
      
      // Draw the brick on the screen
      bricks[i].display();
    }
  
    // Display the ball on the screen.
    ball.display();
    
    pad.move(padSpeed);

    // Display the paddle.
    pad.display();
    
/////!!!!!!!!
    // console.log(pad.display());

  // noStroke();
  // lights();
  // ambientMaterial(100, 0, 100);

  // rotateZ(pitch);
  // rotateX(roll);
  // rotateY(yaw);
  // box(100,200,100);



}

//process the incoming OSC message and use them for our sketch
function unpackOSC(message){

  /*-------------

  This sketch is set up to work with the gryosc app on the apple store.
  Use either the gyro OR the rrate to see the two different behaviors
  TASK: 
  Change the gyro address to whatever OSC app you are using to send data via OSC
  ---------------*/

  //maps phone rotation directly 
  // if(message.address == "/gyrosc/gyro"){
  //   roll = message.args[0]; 
  //   pitch = message.args[1];
  //   yaw = message.args[2];
  // }

  //uses the rotation rate to keep rotating in a certain direction
  if(message.address == "/ZIGSIM/q84uurrzNFriE5kI/quaternion"){ // 

    
    // const mySpeed = map(message.args[0],-3,3,-30,30);
    // console.log( 'message.x: ',message.args[0],' mySpeed: ',mySpeed  )
    // pad.move(mySpeed);
    // roll += map(message.args[0],-3,3,-0.1,0.1);
    // pitch += map(message.args[1],-3,3,-0.1,0.1);
    // yaw += map(message.args[2],-3,3,-0.1,0.1);

    if (message.args[1]>0.1){
      // pad.move(20)
      // padSpeed=5

      if (padSpeed<2){
        padSpeed+=0.1
      }
    }

    else if (message.args[1]<-0.1){
      // // pad.move(-20)
      // padSpeed=-5
      if (padSpeed>-2){
        padSpeed-=0.1
      }
    }

    else{
      // pad.move(-20)
      padSpeed=0

    }
  }
}

//Events we are listening for
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Connect to Node.JS Server
socket.on("connect", () => {
  console.log(socket.id);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
  console.log(socket.id);
});

// Callback function to recieve message from Node.JS
socket.on("message", (_message) => {

  

  unpackOSC(_message);

});

function keyTyped() {
  if (key == ' ') {
    ball.isThrown = true;
  }
}