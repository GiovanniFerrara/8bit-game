var ctx = document.getElementById("game").getContext("2d"),
  backgroundCanvas = document.createElement("canvas"),
  player = document.getElementById("bgMusic"),
  background = new Image(),
  car = new Image(),
  obstacle = new Image(),
  jumpAudio = new Audio("jump.mpg"),
  backgroundCtx = backgroundCanvas.getContext("2d"),
  canvasWidth = 300,
  canvasHeight = 240,
  obstacleSize = 60,
  obstacleDeltaX = 4,
  scrollVal = 0,
  //speed
  deltaX = 2,
  backgroundData = {},
  carData = {},
  gravity = 0.25,
  isJumping = false,
  isPlaying = false,
  verticalSpeedAtJump = 10,
  obstacleCoordinates = {x: 0, y: 150 },
  xStartJump = 0,
  carSize = 140,
  headerText = document.getElementsByClassName("header")[0],
  x = 0;

carCoordinates = { x: 150, y: 110, y0: 110 };
backgroundCanvas.width = canvasWidth;
backgroundCanvas.height = canvasHeight;

background.onload = loadBackground;
document.onkeydown = onKeyDown;

document.addEventListener("click", function (e) {
  onJump();
});

function init() {
  background.src = "bg.jpeg";
  car.src = "car.png";
  obstacle.src = 'obstacle.png'
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  updateX();
  renderBackgrouds();
  renderCar();
  renderObstacles()
  window.requestAnimationFrame(draw);
}


function onJump() {
  if (isJumping) return;
  !isPlaying && startGame();
  isJumping = true;
  xStartJump = x;
  jumpAudio.play();
  updateScore();
}

function onKeyDown() {
  onJump();
}

function updateX() {
  if (scrollVal >= canvasWidth - deltaX) {
    scrollVal = 0;
  }

  scrollVal += deltaX;
  x += deltaX;
}

function renderBackgrouds() {
  backgroundData = backgroundCtx.getImageData(
    canvasWidth - scrollVal,
    0,
    scrollVal,
    canvasHeight
  );
  ctx.putImageData(backgroundData, 0, 0, 0, 0, scrollVal, canvasWidth);
  backgroundData = backgroundCtx.getImageData(
    0,
    0,
    canvasWidth - scrollVal,
    canvasHeight
  );
  ctx.putImageData(
    backgroundData,
    scrollVal,
    0,
    0,
    0,
    canvasWidth - scrollVal,
    canvasWidth
  );
}

function renderCar() {
  isPlaying && ctx.drawImage(car, carCoordinates.x, carCoordinates.y, carSize, carSize);
  isJumping && updateCarCoordinatesOnJump();
}

function renderObstacles() {
  if(obstacleCoordinates.x < canvasWidth*2){
    obstacleCoordinates.x += obstacleDeltaX
  } else {
    obstacleCoordinates.x = - obstacleSize
  }

  isPlaying && ctx.drawImage(obstacle, obstacleCoordinates.x, obstacleCoordinates.y, obstacleSize, obstacleSize);
}


function updateCarCoordinatesOnJump() {
  const t = x - xStartJump;
  carCoordinates.y = carCoordinates.y0 - verticalSpeedAtJump * t + 0.5 * gravity * t * t;
  if (carCoordinates.y > carCoordinates.y0) {
    carCoordinates.y = carCoordinates.y0;
    isJumping = false;
  }
}

function startGame() {
  player.play();
  isPlaying = true;
}

function updateScore() {
  headerText.innerHTML = "Score: " + x;
}

function loadBackground() {
  backgroundCtx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
  backgroundData = backgroundCtx.getImageData(0, 0, canvasWidth, canvasHeight);
}

init();
