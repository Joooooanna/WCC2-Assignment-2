

// Create connection to Node.JS Server
const socket = io();

let canvas;
let roll = 0;
let pitch = 0;
let yaw = 0;
let imgs = []; // Holds the images for the bricks
let flicker = false; 
// The ball object.
let ball;
let padSpeed=0;
let handPaddle; // The paddle, represented by a hand image
let gameStarted = false; // Flag to control the start of the game

// function setup() {
//   canvas = createCanvas(windowWidth, windowHeight);
//   // canvas = createCanvas(600, 700);

//     // Initialize the ball.
//     ball = new Ball(width / 2, 320, 20);

//     // Initialize the paddle at bottom of screen.
//     pad = new Paddle(width / 2, 900, 100, 10);
    
//     // Create the grid of bricks.
//     for (let i = 0; i < COLUMNS; i++) {
//       for (let j = 0; j < ROWS; j++) {
  
//         // Create a brick at each position in the right format.
//         bricks.push(new Brick(75 + (i * 50), 50 + (j * 50), 30, 20));
//       }
//     }
 
// }

function preload() {
  bgImg = loadImage('javascript/background.png'); 
  handImg = loadImage('javascript/hand.png');
  for (let i = 1; i <= 15; i++) {
    imgs[i-1] = { img: loadImage(`javascript/${i}.png`) }; // Preloading images
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Increased the canvas height from 400 to 500
  initGame(); // Initialize the game setup
}

function initGame() {
  // Initialize or reset game elements to their starting state
  imgs.forEach((brick, i) => {
    brick.x = ((i) % 5) * 290; // Positions for pictures remain unchanged
    brick.y = Math.floor((i) / 5) * 110; // Optionally adjust Y position to add space at the top
    brick.width = 100;
    brick.height = 100;
    brick.isAlive = true;
  });
  ball = new Ball(width / 2, height - 150, 20); // Adjust the ball's initial Y position
  handPaddle = new Paddle(width / 2, height - 50, 50, 60); // Adjust the paddle's initial Y position
  gameStarted = false; // Wait for the user to start the game
}


function draw() {
  background(flicker ? 238 : 139, 130, 238); // Flicker effect
  flicker = !flicker;

  if (bgImg) {
    blendMode(LIGHTEST);
    image(bgImg, 0, 0, width, height);
    blendMode(BLEND);
  }

    // Display bricks with shake effect
  imgs.forEach(brick => {
    if (brick.isAlive) {
      let shakeX = random(-2, 2); // Small horizontal shake
      image(brick.img, brick.x + shakeX, brick.y, brick.width, brick.height);
    }
  });

  if (gameStarted) {
    ball.checkHitEdges();
    imgs.forEach((brick, index) => {
      if (brick.isAlive && ball.checkHit(brick)) {
        brick.isAlive = false; // Mark the brick as hit
      }
    });

    ball.move();
    // Check collision with paddle
    if (ball.checkHit(handPaddle) && ball.ySpeed > 0) {
      // Adjust ball direction based on paddle collision
      ball.ySpeed *= -1;
    }

    // Reset the game if the ball misses the paddle
    if (ball.y - ball.radius > height) {
      initGame(); // Resets the entire game
    }
  }
  
    // Display the ball on the screen.
    ball.display();
    handPaddle.display(); // Display the paddle
    handPaddle.move(padSpeed); // Move the paddle based on user input

    // pad.move(padSpeed);

    // // Display the paddle.
    // pad.display();
    
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
  if(message.address == "/ZIGSIM/-LEdcQMJ2XzvQwRe/accel"){ // 

    
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

// function keyTyped() {
//   if (key == ' ') {
//     ball.isThrown = true;
//   }
// }

function mousePressed() {
  // Start the game on mouse click if it hasn't started yet
  if (!gameStarted) {
    gameStarted = true;
    ball.isThrown = true; // Start the ball's movement
  }
}
