let gravidade = 6;
let i = 0;
let IsJumping = false;
let pLocation;
let pHeight;

let eSpeed = 10;

let eHeight;
let eWidth;
let eRadius = 25;

let cWidth;
let coinActive = false;
let coins = 0;

let robo;
let coin;
let raio;


function preload() {
 robo = loadImage("robo.png");
 coin = loadImage("coin.png");
 raio = loadImage("raio.png");
}

function timer() {
  i++;
  if (i >= 300) {
    i = 0;

    if (eSpeed < 16)
      eSpeed += 0.5;
    else
      eSpeed += 1;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  eHeight = windowHeight - 175;
  eWidth = windowWidth + eRadius;
  cWidth = windowWidth + eRadius;
  pHeight = windowHeight - 325;
  pLocation = 100;

  spawnCoin();
}

function spawnCoin() {
  if (random(1) > 0.5 ) { 
    coinActive = true;
    cWidth = windowWidth + eRadius + random(100);
  } else {
    coinActive = false;
  }
}

function drawEnemy() {
  fill(255, 255, 0);
  circle(eWidth, eHeight, 2 * eRadius);
  image(raio, eWidth -35, eHeight -35, 65, 65 );
  eWidth -= eSpeed;
  if (eWidth < -20 - eRadius) {
    eWidth = windowWidth + eRadius + random(38);
  }
}

function drawCoin() {
  if (coinActive) {
    fill(255, 0, 0);
    circle(cWidth, eHeight - 200, 2 * eRadius);
    image(coin, cWidth - 35, eHeight - 235, 65,65 );
    cWidth -= eSpeed;
  }
  if (eWidth <= 0) {
    spawnCoin(); 
  }
}

function drawPlayer() {
  stroke(0,0,255, 0);
  fill(0, 0, 255, 0);
  rect(pLocation, pHeight, 100, 200);
  image(robo, pLocation, pHeight, 100, 200 );
}







function draw() {



  timer();
  background(135, 206, 235);
  fill(0, 128, 0);
  rect(0, windowHeight - 200, windowWidth, 325);

  fill(0);
  textSize(18);
  text("Enemy speed: " + eSpeed, 80, 80);
  text("Coins: " + coins, 80, 108);

  drawEnemy();
  drawCoin();
  drawPlayer();

  if (IsJumping) {
    pHeight -= gravidade;
    if (pHeight <= windowHeight - 325 - 100) {
      IsJumping = false;
    } 
  } else {
    if (pHeight < windowHeight - 325) {
      pHeight += gravidade;
    }
  }


  if (coinActive && cWidth <= pLocation + 145 && cWidth >= pLocation - 100 && IsJumping) {
    coins++;
    coinActive = false; 
  }


  if (eWidth <= pLocation + 105 && eWidth >= pLocation - 50 && pHeight >= windowHeight - 325 && pHeight <= windowHeight - 305) {
    fill(255, 0, 0);
    textSize(32);
    text('Game Over', windowWidth / 2 - 80, windowHeight / 2);
    noLoop();
  }
}

function keyPressed() {
  if (key === ' ' && !IsJumping && pHeight == windowHeight - 325) {
    IsJumping = true;
  }
}

function touchStarted() {
  if (!IsJumping && pHeight == windowHeight - 325) {
    IsJumping = true;
  }
}
