import React from "react";

export default class Camera extends React.Component {
    videoRef = React.createRef();

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
}