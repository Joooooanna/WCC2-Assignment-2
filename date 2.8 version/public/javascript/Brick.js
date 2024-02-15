// This class represents a brick that can be breaked-out.
class Brick {
  // Initializes the brick with x,y position and w x h dimensions.
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.isAlive = true; // will become false when broken
  }
  
  // Should be called when the brick is hit.
  hit() {
    this.isAlive = false; // destroys the brick
  }
  
  // Displays the brick (only if "alive").
  display() {
    if (this.isAlive) {
      noStroke();
      fill(255, 0, 0);
      rectMode(CENTER);
      rect(this.x, this.y, this.width, this.height);
    }
  }
}