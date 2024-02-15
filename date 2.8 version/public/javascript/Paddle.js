// This class represents a paddle.
class Paddle {
  // Initializes the paddle with x,y position and w x h dimensions.
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
  
  // Should be called when the paddle is hit.
  hit() {
    // nothing happens to the paddle when it is hit...
  }
  
  // Moves the paddle according to the user control.
  // move() {
  //   this.x = constrain(roll, this.width/2, width-this.width/2);
  // }

  move(speed) {
    this.x = constrain(this.x + speed, this.width/2, width-this.width/2);
    this.x += speed;
    console.log ('this.x: ', this.x , ' speed: ', speed)
  }
  
  // Displays the paddle.
  display() {
    noStroke();
    fill(0, 0, 255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
}