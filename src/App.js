import React from 'react';
import "./App.css";
import DetectTensorFlow from './component/DetectTensorFlow';
import NavbarHeader from './component/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>{
  return (
    <div>
      <NavbarHeader />
      <DetectTensorFlow />
    </div>
  )
}

export default App;