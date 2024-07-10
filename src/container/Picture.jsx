import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Button from '@mui/material/Button';

const Picture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
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
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-4">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />
      </div>
      <div className="mb-4">
        <Button variant="contained" color="primary" onClick={capture}>
          Capture
        </Button>
      </div>
      {imgSrc && (
        <div className="mb-4">
          <img src={imgSrc} alt="Candidate" />
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
