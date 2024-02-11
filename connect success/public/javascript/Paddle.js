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

  move(speed) {
    this.x = constrain(this.x + speed, this.width/2, width-this.width/2);
    this.x += speed;
    console.log ('this.x: ', this.x , ' speed: ', speed)
  }
  
}