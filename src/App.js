import React from "react";
import "@tensorflow/tfjs";
import "./App.css";
import { voice } from './component/voice';
import { coco } from './component/model';
import { camera, video } from './component/camera';

export default class App extends React.Component {
  videoRef = video();
  canvasRef = React.createRef();
  

  componentDidMount() {
    if (navigator.mediaDevices.getUserMedia) {      
      const cam = camera();
      const model = coco();
      // Todas las promesas
      Promise.all([model, cam]).then(values => {
          this.detectFromVideoFrame(values[0], this.videoRef.current);
        }).catch(error => {
          console.error(error);
        });
    }
  }

  detectFromVideoFrame = (model, video) => {
    model.detect(video).then(predictions => {
      this.showDetections(predictions);
      requestAnimationFrame(() => {
        this.detectFromVideoFrame(model, video);
      });
    }, (error) => {
      console.log("No se inicio la camara");
      console.error(error);
    });
  };

  showDetections = predictions => {
    const speech = voice();
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "24px helvetica";
    ctx.font = font;
    ctx.textBaseline = "top";
    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#2fff00";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#2fff00";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      // draw top left rectangle
      ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
      // draw bottom left rectangle
      ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
      ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
      if(!speech.speaking()){
        speech.speak({
          text: "El objeto es " + prediction.class,
        }).then(() => {
            console.log("Success !");
        }).catch(e => {
            console.error("An error occurred :", e);
        })
      }
    });
  };

  render() {
    return (      
      <div> 
        <video className = "styles" autoPlay muted ref={this.videoRef} />
        <canvas className = "styles" ref={this.canvasRef} height="650" width= "720"/>
        
      </div>
    );
  }
}

