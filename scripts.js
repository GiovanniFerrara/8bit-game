var ctx = document.getElementById("game").getContext("2d"),
  backgroundCanvas = document.createElement("canvas"),
  player = document.getElementById("bgMusic"),
  background = new Image(),
  car = new Image(),
  jumpAudio = new Audio("jump.mpg"),
  backgroundCtx = backgroundCanvas.getContext("2d"),
  canvasWidth = 300,
  canvasHeight = 240,
  scrollVal = 0,
  deltaX = 2,
  backgroundData = {},
  carData = {},
  gravity = 0.2,
  isJumping = false,
  isPlaying = false,
  verticalSpeedAtJump = 8,
  xStartJump = 0,
  headerText = document.getElementsByClassName("header")[0],
  x = 0;

carCoordinates = { x: 135, y: 30, y0: 30 };
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
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  updateX();
  animateBackgrouds();
  isJumping && updateCarCoordinatesOnJump();
  renderCar();
  window.requestAnimationFrame(draw);
}


function updateCarCoordinatesOnJump() {
  const t = x - xStartJump;
  carCoordinates.y =
    carCoordinates.y0 - verticalSpeedAtJump * t + 0.5 * gravity * t * t;
  if (carCoordinates.y > carCoordinates.y0) {
    carCoordinates.y = carCoordinates.y0;
    isJumping = false;
  }
}

function updateX() {
  if (scrollVal >= canvasWidth - deltaX) {
    scrollVal = 0;
  }
  scrollVal += deltaX;
  x += deltaX;
}

function animateBackgrouds() {
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
  isPlaying && ctx.drawImage(car, carCoordinates.x, carCoordinates.y, 200, 200);
}

function startGame() {
  player.play();
  isPlaying = true;
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

function updateScore() {
  headerText.innerHTML = "Score: " + x;
}

function loadBackground() {
  backgroundCtx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
  backgroundData = backgroundCtx.getImageData(0, 0, canvasWidth, canvasHeight);
}

init();
