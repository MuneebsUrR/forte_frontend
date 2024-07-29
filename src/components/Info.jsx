import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLoginStore from "../Hooks/loginStore";

const Info = ({ subject_name, noq, wtg, time_allocated, isNegativeMarking }) => {
  const loginResult = useLoginStore((state) => state.loginResult);
  const [timeRemaining, setTimeRemaining] = useState(time_allocated * 60);

  useEffect(() => {
    // Reset the timer when the `time_allocated` changes
    setTimeRemaining(time_allocated * 60);
  }, [time_allocated]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className='flex flex-col items-center px-4 w-full'>
      <div className='flex justify-center items-center w-full text-center mb-4'>
        <h1 className='mx-4'><strong>Name:</strong> {loginResult?.user?.FIRST_NAME || 'N/A'}</h1>
        <h1 className='mx-4'><strong>Roll No:</strong> {loginResult?.user?.CANDIDATE_ID || 'N/A'}</h1>
      </div>

      <div className='flex justify-between items-center w-full text-center'>
        <h2 className='flex-1'>{subject_name}</h2>
        <p className='flex-1'>Total Questions: {noq}</p>
        <p className='flex-1'>Weightage: {wtg}</p>
        <p className='flex-1'>{minutes} min:{seconds.toString().padStart(2, '0')} sec</p>
        <p className='flex-1'>Negative Marking: {isNegativeMarking ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

Info.propTypes = {
  subject_name: PropTypes.string.isRequired,
  noq: PropTypes.number.isRequired,
  wtg: PropTypes.string.isRequired,
  time_allocated: PropTypes.number.isRequired,
  isNegativeMarking: PropTypes.bool.isRequired,
};

export default Info;
