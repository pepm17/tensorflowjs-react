import React from "react";
import "@tensorflow/tfjs";
import { voice } from './voice';
import { coco } from './model';
import { camera, video } from './camera';
import Traductor from './traductor';
import {
  Navbar,
  Form,
  FormControl,
  Nav
} from 'react-bootstrap'

class DetectTensorFlow extends React.Component {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      object: '',
      prediction: ''
    }

  }
  videoRef = video();
  canvasRef = React.createRef();  
  _input = HTMLInputElement;

  componentDidMount() {
    this.focusInput();
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

  focusInput = () =>{
    this.inputRef.current.focus();
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
      this.setState({prediction: prediction.class})
      var lowerCase = this.state.object.toLowerCase();
      var objectSpanish = Traductor(this.state.prediction);
      // Draw the bounding box.
      ctx.strokeStyle = "#2fff00";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#2fff00";
      const textWidth = ctx.measureText(objectSpanish).width;
      const textHeight = parseInt(font, 10);
      // draw top left rectangle
      ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
      // draw bottom left rectangle
      ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(objectSpanish, x, y);
      ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
      if(objectSpanish.includes(lowerCase)){
        if(!speech.speaking()){
          speech.speak({
            text: "El objeto es " + objectSpanish,
          }).then(() => {
              console.log("Success !");
          }).catch(e => {
              console.error("An error occurred :", e);
          })
        }
      }
      else if(!this.state.object){
        if(!speech.speaking()){
          speech.speak({
            text: "El objeto es " + objectSpanish,
          }).then(() => {
              console.log("Success !");
          }).catch(e => {
              console.error("An error occurred :", e);
          })
        }
      }
    });
  };

  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value});
}

  render() {
    return (      
      <div>
        <Navbar variant="dark" className="navBar">
            <Nav className="mr-auto">
                <Navbar.Brand href="#home">Guiding Tech Dog</Navbar.Brand>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Buscar Objeto" className="mr-sm-2 right"
                onBlur={this.focusInput} autoFocus={true} ref={this.inputRef}
                value={this.state.object} onChange={this.handleChange} name="object" />
            </Form>
        </Navbar>  
        <video className = "styles" autoPlay muted ref={this.videoRef} />
        <canvas className = "styles" ref={this.canvasRef} height="650" width= "720"/>        
      </div>
    );
  }
}

export default DetectTensorFlow;