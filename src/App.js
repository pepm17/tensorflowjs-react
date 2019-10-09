import React from "react";

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "./App.css";



export default class App extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();
  styles = {
    position:'fixed',
    align:'center',
  }

  componentDidMount() {
    if (navigator.mediaDevices.getUserMedia) {
      //Define una promesa que será usada para cargar la camara y leer los frame
      const webcamPromise = navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        }).then(stream => {
            // Pasar el actual frame a window.stream
            window.stream = stream;
            // Pasar el stream a videoRef
            this.videoRef.current.srcObject = stream;
            return new Promise(resolve => {
              this.videoRef.current.onloadedmetadata = () => {
                resolve();
              };
            });
        }, (error) => {
            console.log("No se pudo iniciar la camara")
            console.error(error)
        });

      // Define una promesa que pueda cargar el modelo
      const loadlModelPromise = cocoSsd.load({base: "mobilenet_v2"});      
      // Todas las promesas
      Promise.all([loadlModelPromise, webcamPromise]).then(values => {
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
    });
  };

  render() {
    return (
      <div> 
        <video id = "styles" autoPlay muted ref={this.videoRef} width ="720" height = "600"/>
        <canvas id = "styles" ref={this.canvasRef} width ="720" height = "650"/>
      </div>
    );
  }
}

