// // This class represents a ball bouncing around the screen.
// class Ball {
//   // Constructor to initialize the ball.
//   constructor(x, y, size) {
//     // Initialize size.
//     this.size = size;
//     this.radius = size / 2; // save radius for later use
//     // Starting point of the ball (to be able to reset() it).
//     this.xOrigin = x;
//     this.yOrigin = y;
//     // Initializes everything.
//     this.reset();
//   }

//   // Displays the ball.
//   display() {
//     noStroke();
//     fill(255, 255, 0);
//     ellipse(this.x, this.y, this.size);
//   }
  
//   // Moves the ball.
//   move() {
//     this.x += this.xSpeed;
//     this.y += this.ySpeed;
//   }

//   // Verifies if the ball has his the edges. If it "hits" the
//   // bottom then it "dies".
//   checkHitEdges() {
//     // Check if hit sides.
//     if (this.x - this.radius <= 0 || this.x + this.radius >= width)
//       this.xSpeed *= -1;
//     // Check collision with top.
//     if (this.y - this.radius <= 0)
//       this.ySpeed *= -1;
//     // If moved to bottom: ball dies.
//     if (this.y + this.radius >= height)
//       this.dies();
//   }

//   // Verifies if the ball has hit a rectangle object
//   // (either a Brick or a Paddle object).
//   checkHit(rectangle) {

//     // check every point along the top and bottom edge of the brick 
//     for (let i = 0; i <= rectangle.width; i++) {

//       // determine the distance between the ball and the top of the rectangle
//       let distanceTop = dist(this.x, this.y, rectangle.x - rectangle.width / 2 + i, rectangle.y - rectangle.height / 2);

//       // determine the distance between the ball and the bottom of the rectangle
//       let distanceBottom = dist(this.x, this.y, rectangle.x - rectangle.width / 2 + i, rectangle.y + rectangle.height / 2);

//       // if the distance between the ball and the top or bottom of the rectangle is less than the ball size...
//       if (distanceTop <= this.radius || distanceBottom <= this.radius) {

//         // change the y direction of the ball and move it
//         this.ySpeed *= -1;
//         this.y += this.ySpeed;

//         // tell the object it was hit
//         rectangle.hit();
//       }
//     }

//     // check every point along the left and right edge of the brick
//     for (let i = 0; i <= rectangle.height; i++) {

//       // determine the distance between the ball and the left edge of the rectangle
//       let distanceLeft = dist(this.x, this.y, rectangle.x - rectangle.width / 2, rectangle.y - rectangle.height / 2 + i);

//       // determine the distance between the ball and the right edge of the rectangle
//       let distanceRight = dist(this.x, this.y, rectangle.x + rectangle.width / 2, rectangle.y - rectangle.height / 2 + i);

//       // if the distance between the ball and the left or right edge of the brick is less than the brick size...
//       if (distanceLeft <= this.radius || distanceRight <= this.radius) {

//         // change the x direction of the ball and move it
//         this.xSpeed *= -1;
//         this.x += this.xSpeed;

//         // tell the object it was hit
//         rectangle.hit();
//       }
//     }
//   }
  
//   // Tells the ball it "died".
//   dies() {
//     // For now this only resets the ball.
//     this.reset();
//   }
  
//   // Re-initializes the ball to starting position with new speeds.
//   reset() {
//     // set the x and y position of the ball to the original position
//     this.x = this.xOrigin;
//     this.y = this.yOrigin;

//     // randomize the x and y speed
//     // this.xSpeed = random(-5, 5);
//     this.xSpeed = random(-1, 1);
//     this.ySpeed = random(1, 2);

//     // set the ball to not move when it is reset
//     this.isThrown = false;
//   }

// }

class Ball {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.radius = size / 2;
    this.reset();
  }

  display() {
    fill(214, 244, 249);
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