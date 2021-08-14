import React from "react";
import {CanvasProvider} from "./CanvasContext";
import '../../styleSheets/Canvas.css'

export class Canvas extends React.Component {
  constructor(props){
    super(props)
    this.state = { canvasCtx: null, canvasRef: null, isDrawing: false  }
  }
  
  componentDidMount(){
    window.onresize = CanvasProvider.resizeCanvas
    let canvasObj = CanvasProvider.prepareCanvas()
    this.setState({ canvasCtx: canvasObj.canvasCtx, canvasRef: canvasObj.canvasRef })
  }


  render (){
    return (
      <div id="canvasWrapper">
        <canvas id="canvas2d"
          onMouseDown={(e) => {
            CanvasProvider.startDrawing(this.state.canvasCtx, e);
            this.setState({isDrawing: true});
          }}
          onMouseUp={() => {
            CanvasProvider.finishDrawing(this.state.canvasCtx)
            this.setState({isDrawing: false})
          }}
          onMouseMove={(e) => {CanvasProvider.draw(this.state.canvasCtx, this.state.isDrawing, e)}}
          ref={this.state.canvasRef}
        />
      </div>
    )
  }
}