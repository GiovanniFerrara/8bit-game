var ctx = document.getElementById("game").getContext("2d"),
    backgroundCanvas = document.createElement("canvas"),
    player = document.getElementById('bgMusic'),
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
    headerText = document.getElementsByClassName('header')[0],
    x = 0
    carCoordinates = {x: 135, y: 30, y0: 30}

    backgroundCanvas.width = canvasWidth
    backgroundCanvas.height = canvasHeight
  
    background.onload = loadBackground
    document.onkeydown = checkKey

    function checkKey(e) {
      onJump()
    }

    document.addEventListener('click', function(e) {
      onJump()
    });

    function startGame(){
      player.play()
      isPlaying = true
    }
    
    function updateScore (){
      headerText.innerHTML = 'Score: ' + x  
    }

    function onJump(){
      if(isJumping) return
      !isPlaying && startGame()
      isJumping = true
      xStartJump = x
      jumpAudio.play()
      updateScore()
    }

    function init(){
      background.src = "bg.jpeg"
      car.src = "car.png"
      draw()
    }
    
    function loadBackground(){
      backgroundCtx.drawImage(background, 0,0, canvasWidth, canvasHeight)
      backgroundData = backgroundCtx.getImageData(0,0,canvasWidth,canvasHeight)
    }

    function setCarCoordinates(){
      const t = (x - xStartJump)
      carCoordinates.y = carCoordinates.y0 - verticalSpeedAtJump * t + 0.5*gravity*t*t
      if(carCoordinates.y > carCoordinates.y0){
        carCoordinates.y = carCoordinates.y0
        isJumping = false
      }
    } 

    function draw(){
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      if(scrollVal >= canvasWidth - deltaX){
        scrollVal = 0
      }
      
      scrollVal += deltaX
      x += deltaX
      
      backgroundData = backgroundCtx.getImageData(canvasWidth-scrollVal, 0, scrollVal, canvasHeight)
      
      isJumping && setCarCoordinates()
      ctx.putImageData(backgroundData, 0, 0 ,0 ,0 ,scrollVal, canvasWidth)
      backgroundData = backgroundCtx.getImageData(0,0,canvasWidth-scrollVal, canvasHeight)
      ctx.putImageData(backgroundData, scrollVal,0,0,0,canvasWidth-scrollVal, canvasWidth)
      window.requestAnimationFrame(draw);

      isPlaying && ctx.drawImage(car, carCoordinates.x, carCoordinates.y, 200, 200)
  }

  init()