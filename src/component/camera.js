export async function camera() {
    videoRef = React.createRef();
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
    }
  return webcamPromise;          
}

export default camera;