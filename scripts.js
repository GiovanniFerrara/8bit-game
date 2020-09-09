var ctx = document.getElementById("game").getContext("2d"),
    backgroundCanvas = document.createElement("canvas"),
    background = new Image(),
    cat = new Image(),
    backgroundCtx = backgroundCanvas.getContext("2d"),
    canvasWidth = 300,
    canvasHeight = 240,
    scrollVal = 0,
    deltaX = 2,
    backgroundData = {},
    catData = {},
    gravity = 0.2,
    isJumping = false,
    verticalSpeedAtJump = 6,
    xStartJump = 0
    x = 0
    catCoordinates = {x: 80, y: 30, y0: 30}

    backgroundCanvas.width = canvasWidth
    backgroundCanvas.height = canvasHeight
  
    background.onload = loadBackground

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
          isJumping = true
          xStartJump = x
        }
    }

    document.addEventListener('click', function(e) {
      isJumping = true
      xStartJump = x
    });

    function init(){
      background.src = "bg.jpeg"
      cat.src = "cat.png"
      window.requestAnimationFrame(draw);
    }
    
    function loadBackground(){
      backgroundCtx.drawImage(background, 0,0, canvasWidth, canvasHeight)
      backgroundData = backgroundCtx.getImageData(0,0,canvasWidth,canvasHeight)
    }

    function setCatCoordinates(){
      const t = (x - xStartJump)
      catCoordinates.y = catCoordinates.y0 - verticalSpeedAtJump * t + 0.5*gravity*t*t
      if(catCoordinates.y > catCoordinates.y0){
        catCoordinates.y = catCoordinates.y0
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
      
      isJumping && setCatCoordinates()
      ctx.putImageData(backgroundData, 0, 0 ,0 ,0 ,scrollVal, canvasWidth)
      backgroundData = backgroundCtx.getImageData(0,0,canvasWidth-scrollVal, canvasHeight)
      ctx.putImageData(backgroundData, scrollVal,0,0,0,canvasWidth-scrollVal, canvasWidth)
      window.requestAnimationFrame(draw);

      ctx.drawImage(cat, catCoordinates.x, catCoordinates.y, 200, 200)
  }

  init()