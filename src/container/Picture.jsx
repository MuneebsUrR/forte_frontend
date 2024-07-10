import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import Button from '@mui/material/Button';
import * as faceapi from 'face-api.js';
import { useTheme } from '@mui/material/styles';

const Picture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [numFaces, setNumFaces] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        console.log("Models loaded successfully.");
        setInterval(detectFace, 100);
      } catch (error) {
        console.error("Error loading models: ", error);
      }
    };

    loadModels();
  }, []);

  const detectFace = async () => {
    try {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        console.log("Video element:", video);
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({
          inputSize: 224,
          scoreThreshold: 0.5
        }));
        setIsFaceDetected(detections.length > 0);
        setNumFaces(detections.length);
        console.log("Face detected:", detections.length);
      }
    } catch (error) {
      console.error("Error detecting faces:", error);
    }
  };

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: 'user',
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const handleSubmit = () => {
    if (!imgSrc) {
      alert('Please capture an image first');
      return;
    }

    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = 'candidate_picture.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    navigate('/instructions');
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full ${theme.palette.mode === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="mb-4 text-center">
        <p className="text-lg font-semibold">Number of Faces Detected: {numFaces}</p>
      </div>
      <div className={`flex items-center justify-center mb-4 ${isFaceDetected ? 'border-blue-500 ring-4 ring-blue-500' : 'border-gray-300'}`}>
        <div className="rounded-full overflow-hidden border-2">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <Button variant="contained" color="primary" onClick={capture}>
          Capture
        </Button>
      </div>
      {imgSrc && (
        <div className="mb-4">
          <div className="rounded-full overflow-hidden border-2 border-gray-300">
            <img src={imgSrc} alt="Candidate" className="rounded-full" />
          </div>
        </div>
      )}
      <div>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Picture;
