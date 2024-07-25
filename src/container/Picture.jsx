import { useRef, useEffect, useState } from 'react';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import '../Style/Picture.css';
import useLoginStore from "../Hooks/loginStore";

function Picture() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [faceDetected, setFaceDetected] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const loginResult = useLoginStore((state) => state.loginResult);



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
          setFaceDetected(true);
        } else {
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

  const handleRetake = () => {
    setCapturedImage(null); // Clear captured image
    startVideo(); // Restart video feed
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
    <div className='h-[80vh] flex items-center justify-center '>
      <Container className="myapp" maxWidth="xl">
        <div className={`appvideo ${faceDetected ? 'face-detected' : 'no-face-detected'}`}>
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
          ) : (
            <>
              <video crossOrigin="anonymous" ref={videoRef} autoPlay />
              <canvas ref={canvasRef} className="appcanvas " />
            </>
          )}
          <div className="login-details">
          <p><strong>CANDIDATE_ID:</strong> {loginResult.user.CANDIDATE_ID}</p>
          <p><strong>FIRST_NAME:</strong> {loginResult.user.FIRST_NAME}</p>
          <p><strong>FATHER_NAME:</strong> {loginResult.user.FATHER_NAME}</p>
        </div>
      </div>


        <div className="button-container flex justify-around items-center w-full mt-1 px-[6rem]">
          {!capturedImage && (
            <Button variant="contained" color="primary" onClick={handleCapture}>
              Capture
            </Button>
          )}
          {capturedImage && (
            <Button variant="contained" color="primary" onClick={handleRetake}>
              Retake
            </Button>
          )}
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
    </div>
  );
}
export default Picture;
