import React from "react";

export default class Camara{
    static instance = null
    videoRef = React.createRef();
    cam = null;

    static getInstance(){
      if(this.instance == null){
          this.instance = new Camara();
      }
      return this.instance;
    }

    getCam(){
      return this.videoRef;
    }

    abrirCamara(){
      this.cam = navigator.mediaDevices.getUserMedia({
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
      return this.cam; 
    }
}
