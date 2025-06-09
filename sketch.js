let x, y, angulo, raio;
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
let raioImg;

function preload() {
  robo = loadImage("robo.png");
  coin = loadImage("coin.png");
  raioImg = loadImage("raio.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Jogo
  eHeight = windowHeight - 175;
  eWidth = windowWidth + eRadius;
  cWidth = windowWidth + eRadius;
  pHeight = windowHeight - 325;
  pLocation = 100;
  spawnCoin();
  
  // Céu e órbita do Sol e da Lua
  angulo = 0;
  raio = width / 4.5 * 2;
}

function draw() {
  timer();

  // Atualiza posição do Sol e cor de fundo
  angulo += 0.005;
  let sunY = raio * sin(angulo);
  let r = map(sunY, -raio, raio, 135, 0);
  let g = map(sunY, -raio, raio, 206, 0);
  let b = map(sunY, -raio, raio, 250, 30);
  background(r, g, b);

  // HUD
  fill(0);
  textSize(18);
  stroke(255);
  strokeWeight(5);
  text("Enemy speed: " + eSpeed, 80, 80);
  text("Coins: " + coins, 80, 108);
  
  noStroke();

  // Sol e Lua
  push();
  translate(windowWidth / 2, windowHeight);
  drawSol(angulo);
  drawLua(angulo);
  pop();
  
  // Céu e chão
  fill(0, 128, 0);
  rect(0, windowHeight - 200, windowWidth, 325);

  drawEnemy();
  drawCoin();
  drawPlayer();

  // Física do pulo
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

  // Colisão com moeda
  if (coinActive && cWidth <= pLocation + 145 && cWidth >= pLocation - 100 && IsJumping) {
    coins++;
    coinActive = false; 
  }

  // Colisão com inimigo
  if (eWidth <= pLocation + 105 && eWidth >= pLocation - 50 && pHeight >= windowHeight - 325 && pHeight <= windowHeight - 305) {
    fill(255, 0, 0);
    textSize(32);
    text('Game Over', windowWidth / 2 - 80, windowHeight / 2);
    noLoop();
  }
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

function spawnCoin() {
  if (random(1) > 0.5) { 
    coinActive = true;
    cWidth = windowWidth + eRadius + random(100);
  } else {
    coinActive = false;
  }
}

function drawEnemy() {
  fill(255, 255, 0);
  circle(eWidth, eHeight, 2 * eRadius);
  image(raioImg, eWidth -35, eHeight -35, 65, 65 );
  eWidth -= eSpeed;
  if (eWidth < -20 - eRadius) {
    eWidth = windowWidth + eRadius + random(38);
  }
}

function drawCoin() {
  if (coinActive) {
    fill(255, 0, 0);
    circle(cWidth, eHeight - 200, 2 * eRadius);
    image(coin, cWidth - 35, eHeight - 235, 65, 65 );
    cWidth -= eSpeed;
  }
  if (eWidth <= 0) {
    spawnCoin(); 
  }
}

function drawPlayer() {
  stroke(0, 0, 255, 0);
  fill(0, 0, 255, 0);
  rect(pLocation, pHeight, 100, 200);
  image(robo, pLocation, pHeight, 100, 200 );
}

function drawSol(angulo) {
  let x = raio * cos(angulo);
  let y = raio * sin(angulo);
  fill(255, 190, 0);
  noStroke();
  circle(x, y, 100);
  fill(255, 230, 0);
  circle(x, y, 80);
}

function drawLua(angulo) {
  let x = raio * cos(angulo + PI);
  let y = raio * sin(angulo + PI);
  fill(200);
  noStroke();
  circle(x, y, 100);
  fill(170);
  circle(x - 5, y - 5, 90);
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