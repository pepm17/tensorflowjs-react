import React from "react";
const videoRef = React.createRef();
export async function camera() {
    const cam = navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      }).then(stream => {
          // Pasar el actual frame a window.stream
          window.stream = stream;
          // Pasar el stream a videoRef
          videoRef.current.srcObject = stream;
          return new Promise(resolve => {
            videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
      }, (error) => {
          console.log("No se pudo iniciar la camara")
          console.error(error)
      }); 
    return cam;
}

export function video(){
    return videoRef;
}

export default {
    camera,
    video
};