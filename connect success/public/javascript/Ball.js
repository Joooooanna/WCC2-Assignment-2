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