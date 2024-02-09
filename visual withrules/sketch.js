// let bgImg; 
// let handImg; 
// let flicker = false; 
// let imgs = []; // Array to hold PNGs as bricks
// let ball;
// let handPaddle; // Hand image as the paddle

// function preload() {
//   bgImg = loadImage('background.png'); 
//   handImg = loadImage('hand.png');
//   for (let i = 1; i <= 15; i++) {
//     imgs[i-1] = {
//       img: loadImage(`${i}.png`),
//       x: ((i-1) % 5) * 110, // Assuming a 5-column layout
//       y: Math.floor((i-1) / 5) * 110, // Rows based on index
//       width: 110,
//       height: 110,
//       isAlive: true
//     };
//   }
// }

// function setup() {
//   createCanvas(550, 400);
//   ball = new Ball(width / 2, height - 100, 20);
//   handPaddle = new Paddle(width / 2, height - 30, 50, 60);
// }

// function draw() {
//   background(flicker ? 238 : 139, 130, 238);
//   flicker = !flicker;

//   if (bgImg) {
//     blendMode(LIGHTEST);
//     image(bgImg, 0, 0, width, height);
//     blendMode(BLEND);
//   }

//   imgs = imgs.filter(brick => brick.isAlive); // Only keep alive PNGs
//   imgs.forEach(brick => {
//     image(brick.img, brick.x, brick.y, brick.width, brick.height);
//   });

//   ball.checkHitEdges();
//   ball.checkHit(handPaddle); // Check collision with paddle
//   imgs.forEach((brick, index) => {
//     if (ball.checkHit(brick)) {
//       brick.isAlive = false; // Mark brick as hit
//     }
//   });

//   ball.move();
//   ball.display(); // Display ball after PNGs to ensure it's on top

//   handPaddle.display();
//   handPaddle.move();

//   // Restart the game if the ball misses the paddle
//   if (ball.y - ball.radius > height) {
//     ball.reset(); // Reset ball to initial position
//   }
// }

// // Ball class with improved collision detection
// class Ball {
//   constructor(x, y, size) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.radius = size / 2;
//     this.reset();
//   }

//   display() {
//     fill(255, 255, 0);
//     noStroke();
//     ellipse(this.x, this.y, this.size);
//   }

//   move() {
//     this.x += this.xSpeed;
//     this.y += this.ySpeed;
//   }

//   checkHitEdges() {
//     if (this.x - this.radius <= 0 || this.x + this.radius >= width) this.xSpeed *= -1;
//     if (this.y - this.radius <= 0) this.ySpeed *= -1;
//   }

//   checkHit(obj) {
//     let hit = false;

//     // Simplified collision detection
//     if (
//       this.x > obj.x && this.x < obj.x + obj.width &&
//       this.y > obj.y && this.y < obj.y + obj.height
//     ) {
//       this.ySpeed *= -1; // Reverse Y direction
//       hit = true;
//     }

//     return hit;
//   }

//   reset() {
//     this.x = width / 2;
//     this.y = height - 100;
//     this.xSpeed = random(-5, 5);
//     this.ySpeed = -random(3, 4);
//   }
// }

// // Paddle class for controlling with hand image
// class Paddle {
//   constructor(x, y, w, h) {
//     this.x = x;
//     this.y = y;
//     this.width = w;
//     this.height = h;
//   }

//   display() {
//     image(handImg, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
//   }

//   move() {
//     this.x = mouseX;
//     this.x = constrain(this.x, this.width / 2, width - this.width / 2);
//   }
// }
let bgImg; 
let handImg; 
let flicker = false; 
let imgs = []; // Holds the images for the bricks
let ball;
let handPaddle; // The paddle, represented by a hand image
let gameStarted = false; // Flag to control the start of the game

function preload() {
  bgImg = loadImage('background.png'); 
  handImg = loadImage('hand.png');
  for (let i = 1; i <= 15; i++) {
    imgs[i-1] = { img: loadImage(`${i}.png`) }; // Preloading images
  }
}

function setup() {
  createCanvas(550, 600); // Increased the canvas height from 400 to 500
  initGame(); // Initialize the game setup
}

function initGame() {
  // Initialize or reset game elements to their starting state
  imgs.forEach((brick, i) => {
    brick.x = ((i) % 5) * 110; // Positions for pictures remain unchanged
    brick.y = Math.floor((i) / 5) * 110 + 50; // Optionally adjust Y position to add space at the top
    brick.width = 70;
    brick.height = 70;
    brick.isAlive = true;
  });
  ball = new Ball(width / 2, height - 150, 20); // Adjust the ball's initial Y position
  handPaddle = new Paddle(width / 2, height - 50, 50, 60); // Adjust the paddle's initial Y position
  gameStarted = false; // Wait for the user to start the game
}

function draw() {
  background(flicker ? 238 : 139, 130, 238);
  flicker = !flicker;

  if (bgImg) {
    blendMode(LIGHTEST);
    image(bgImg, 0, 0, width, height);
    blendMode(BLEND);
  }

  // Display bricks
  imgs.forEach(brick => {
    if (brick.isAlive) {
      image(brick.img, brick.x, brick.y, brick.width, brick.height);
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

  ball.display(); // Display the ball
  handPaddle.display(); // Display the paddle
  handPaddle.move(); // Move the paddle based on user input
}

function mousePressed() {
  // Start the game on mouse click if it hasn't started yet
  if (!gameStarted) {
    gameStarted = true;
    ball.isThrown = true; // Start the ball's movement
  }
}

class Ball {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.radius = size / 2;
    this.reset();
  }

  display() {
    fill(255, 255, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  move() {
    if (!this.isThrown) return; // Do not move the ball until it's thrown
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkHitEdges() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= width) this.xSpeed *= -1;
    if (this.y - this.radius <= 0) this.ySpeed *= -1;
  }

  checkHit(obj) {
    if (
      this.x > obj.x && this.x < obj.x + obj.width &&
      this.y + this.radius > obj.y && this.y - this.radius < obj.y + obj.height
    ) {
      return true; // Collision detected
    }
    return false; // No collision
  }

  reset() {
    this.x = width / 2;
    this.y = height - 100;
    this.xSpeed = random(-5, 5);
    this.ySpeed = -random(3, 4);
    this.isThrown = false; // Keep the ball stationary until thrown
  }
}

class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  display() {
    image(handImg, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  move() {
    this.x = mouseX;
    this.x = constrain(this.x, this.width / 2, width - this.width / 2);
  }
}
