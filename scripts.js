var ctx = document.getElementById("game").getContext("2d"),
    canvasTemp = document.createElement("canvas"),
    background = new Image(),
    cat = new Image(),
    tempContext = canvasTemp.getContext("2d"),
    canvasWidth = 300,
    canvasHeight = 240,
    scrollVal = 0,
    deltaX = 1

    canvasTemp.width = canvasWidth
    canvasTemp.height = canvasHeight    

    background.src = "bg.jpeg"
    cat.src = "cat.png"
    background.onload = loadBackground

    function loadBackground(){
        tempContext.drawImage(background, 0,0, canvasWidth, canvasHeight)
        imageData = tempContext.getImageData(0,0,canvasWidth,canvasHeight)
        render()                
    }

    function render(){
        ctx.clearRect(0,0,canvasWidth,canvasHeight)

        if(scrollVal >= canvasWidth-deltaX){
            scrollVal = 0
        }

        scrollVal+=deltaX

        imageData = tempContext.getImageData(canvasWidth-scrollVal, 0, scrollVal, canvasHeight)
        ctx.putImageData(imageData, 0,0,0,0,scrollVal, canvasWidth)
        imageData = tempContext.getImageData(0,0,canvasWidth-scrollVal, canvasHeight)
        ctx.putImageData(imageData, scrollVal,0,0,0,canvasWidth-scrollVal, canvasWidth)
  
        requestAnimationFrame(render)
    }
