export const CanvasProvider = {
  prepareCanvas,
  startDrawing,
  finishDrawing,
  draw,
  clearCanvas
}

function startDrawing(contextRef, event) {
  const { offsetX, offsetY } = event.nativeEvent;
  contextRef.beginPath();
  contextRef.moveTo(offsetX, offsetY);
  // this.setState({ IsDrawing: true});
};

function finishDrawing(contextRef) {
  contextRef.closePath();
  // setIsDrawing(false);
};

function draw(contextRef, isDrawing, event) {
  if (!isDrawing) {
    return;
  }
  const { offsetX, offsetY } = event.nativeEvent;
  contextRef.lineTo(offsetX, offsetY);
  contextRef.stroke();
};

function clearCanvas(canvasRef, canvasCtx) {
  canvasCtx.fillStyle = "white"
  canvasCtx.fillRect(0, 0, canvasRef.width, canvasCtx.height)
}

function prepareCanvas() {
  const canvas = document.getElementById('canvas2d')

  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  const context = canvas.getContext("2d")
  context.scale(2, 2);
  context.lineCap = "round";
  context.strokeStyle = "black";
  context.lineWidth = 5;
  
  return {
    canvasCtx: context,
    canvasRef: canvas
  }
};

