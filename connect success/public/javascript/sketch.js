//Ping Pong to the millennium; 15/02/2024; Keyu Li, Yuchen Zheng
//Instructions: 
//1. Open ZIG SIM PRO APP on your iphone, select Quaternion, and modify IP Address, Port Number
//2. Open code in Vs code, open new terminal in VScode and select Git Bash, then “npm install”, “npm run dev”
//3. Press start in ZIG SIM PRO APP and start to play(rotate your iphone to see what is going on)
//Acknowledgements
//Picture materials: https://m.tb.cn/h.5HnoBwaFj50PAYX?tk=yMp4W9ueOmr(purchased online)
//Music: https://www.free-stock-music.com/fsm-team-escp-lazy-aftermoon.html 
//Referenced Codes: https://learn.gold.ac.uk/mod/page/view.php?id=1434707

const socket = io();

let canvas;
let roll = 0;
let pitch = 0;
let yaw = 0;
let imgs = []; 
let flicker = false; 
let ball;
let padSpeed=0;
let handPaddle; 
let gameStarted = false; 
let song;

function preload() {
  bgImg = loadImage('javascript/background.png'); 
  handImg = loadImage('javascript/hand.png');
  for (let i = 1; i <= 15; i++) {
    imgs[i-1] = { img: loadImage(`javascript/${i}.png`) }; 
  }
  song = loadSound('javascript/music.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  initGame(); 
  window.addEventListener('keydown', startSong);
}

function initGame() {
  imgs.forEach((brick, i) => {
    brick.x = ((i) % 5) * 290; 
    brick.y = Math.floor((i) / 5) * 110;
    brick.width = 100;
    brick.height = 100;
    brick.isAlive = true;
  });
  ball = new Ball(width / 2, height - 150, 20); 
  handPaddle = new Paddle(width / 2, height - 50, 50, 60); 
  gameStarted = false; 
}

function startSong() {
  song.play();
  window.removeEventListener('keydown', startSong);
}

function draw() {
  background(flicker ? 238 : 139, 130, 238); 

  if (bgImg) {
    blendMode(LIGHTEST);
    image(bgImg, 0, 0, width, height);
    blendMode(BLEND);
  }

  imgs.forEach(brick => {
    if (brick.isAlive) {
      let shakeX = random(-2, 2); 
      image(brick.img, brick.x + shakeX, brick.y, brick.width, brick.height);
    }
  });

  textSize(16);
  textAlign(LEFT, BOTTOM);
  stroke(0);
  strokeWeight(3);
  fill(255);
  text('Tap the keyboard to play music\nClick the mouse to start the game', 500,560);

  if (gameStarted) {
    ball.checkHitEdges();
    imgs.forEach((brick, index) => {
      if (brick.isAlive && ball.checkHit(brick)) {
        brick.isAlive = false; 
      }
    });

    ball.move();
    if (ball.checkHit(handPaddle) && ball.ySpeed > 0) {
      ball.ySpeed *= -1;
    }
    if (ball.y - ball.radius > height) {
      initGame(); 
    }
  }
    ball.display();
    handPaddle.display(); 
    handPaddle.move(padSpeed); 
}

function unpackOSC(message){
  if(message.address == "/ZIGSIM/-LEdcQMJ2XzvQwRe/quaternion"){ 
    if (message.args[1]>0.1){
      if (padSpeed<2){
        padSpeed+=0.8
      }
    }

    else if (message.args[1]<-0.1){
      if (padSpeed>-2){
        padSpeed-=0.8
      }
    }

    else{
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

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    ball.isThrown = true; 
  }
}
