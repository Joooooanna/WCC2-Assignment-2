/* Breakout Mod
 * Author: Sofian Audry
 * Adapted from code by Julian Glass-Pilon
 * A mod of the breakout game where the point of the game is to break all
 * of the bricks on screen with the ball by bouncing it on the 
 * user-controlled paddle.
 *
 * Press SPACEBAR to throw the ball and use the mouse to control the paddle.
 *
 * This code is modeled after the Game Mod workshop: an intensive workshop that used 
 * the Breakout game mod to get non-coders to code. 
 *
 * Visit <http://www.trsp.net/teaching/gamemod/index.html> for more information.
 */

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

function setup() {
  createCanvas(500, 500);

  // Initialize the ball.
  ball = new Ball(width / 2, 320, 20);

  // Initialize the paddle at bottom of screen.
  pad = new Paddle(width / 2, 450, 100, 10);

  // Create the grid of bricks.
  for (let i = 0; i < COLUMNS; i++) {
    for (let j = 0; j < ROWS; j++) {

      // Create a brick at each position in the right format.
      bricks.push(new Brick(75 + (i * 50), 50 + (j * 50), 30, 20));
    }
  }
}

function draw() {
  // Refresh background.
  background(0);

  // Moves the paddle according to the mouse.
  pad.move();

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

  // Display the paddle.
  pad.display();
}

// Spacebar throws the ball.
function keyTyped() {
  if (key == ' ') {
    ball.isThrown = true;
  }
}