import React from 'react';
import "./styles.css";

export default class ImageOps extends React.Component {
  
    constructor(props) {
        super(props);  
        this.state = {
            image_object: null,
            video_object_details: {},
            active_type: null
        }
        videoRef = React.createRef();
        canvasRef = React.createRef();
    }

    componentDidMount(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            const webCamPromise = navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: "user"
                }
            }).then(stream => {
                window.stream = stream;
                this.videoRef.current.srcObject = stream;
                return new Promise((resolve, reject) => {
                    this.videoRef.current.onloadedmetadata = () => {
                        resolve();
                    };
                });
            });
            const modelPromise = cocoSsd.load();
            Promise.all([modelPromise, webCamPromise]).then(values => {
                this.detectFrame(this.videoRef.current, values[0]);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    detectFrame = (video, model) => {
        model.detect(video).then(predictions => {
            this.renderPredictions(predictions);
            requestAnimationFrame(() => {
                this.detectFrame(video, model);
            });
        });
    };
}