import { useRef, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material'; 
import * as faceapi from 'face-api.js';
import '../Style/Picture.css';

function Picture() {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    faceMyDetect();
  }

  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current,
        new faceapi.TinyFaceDetectorOptions());

      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (detections.length > 0) {
        // Face detected
        ctx.fillStyle = 'green';
        ctx.font = '24px Arial';
        ctx.fillText('Face Detected', 50, 50);
      } else {
        // No face detected
        ctx.fillStyle = 'red';
        ctx.font = '24px Arial';
        ctx.fillText('No Face Detected', 50, 50);
      }

    }, 1000);
  }

  const handleCapture = () => {
    // Logic to capture the current image or frame
    // You can implement this based on your requirements
  }

  const handleSaveAndNext = () => {
    // Logic to save the captured image or proceed to the next step
    // You can implement this based on your requirements
  }

  return (
    <Container className="myapp" maxWidth="xl">
      <div className="appvideo">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay />
      </div>
      <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />

      {/* Material-UI Buttons */}
      <Button variant="contained" color="primary" onClick={handleCapture}>
        Capture
      </Button>
      <Button variant="contained" color="primary" onClick={handleSaveAndNext}>
        Save and Next
      </Button>
    </Container>
  );
}

export default Picture;
