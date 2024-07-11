import { useRef, useEffect, useState } from 'react';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import '../Style/Picture.css';

function Picture() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [faceDetected, setFaceDetected] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
  };

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    faceMyDetect();
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (detections.length > 0) {
          // Face detected
          ctx.fillStyle = 'green';
          ctx.font = '24px Arial';
          ctx.fillText('Face Detected', 50, 50);
          setFaceDetected(true);
        } else {
          // No face detected
          ctx.fillStyle = 'red';
          ctx.font = '24px Arial';
          ctx.fillText('No Face Detected', 50, 50);
          setFaceDetected(false);
        }
      }
    }, 1000);
  };

  const handleCapture = () => {
    if (faceDetected) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      setCapturedImage(dataURL);
    } else {
      setOpen(true);
    }
  };

  const handleSaveAndNext = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'captured.png';
      link.click();
      navigate('/instructions');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className="myapp" maxWidth="xl">
      <div className="appvideo">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
        ) : (
          <>
            <video crossOrigin="anonymous" ref={videoRef} autoPlay />
            <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />
          </>
        )}
      </div>

      <div className="button-container flex justify-around items-center w-full mt-4 px-[6rem]" >
        <Button variant="contained" color="primary" onClick={handleCapture}>
          Capture
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveAndNext}>
          Save and Next
        </Button>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          No face detected. Try again.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Picture;
