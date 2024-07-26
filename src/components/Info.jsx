import React from 'react';
import useLoginStore from "../Hooks/loginStore";

const Info = () => {
  const loginResult = useLoginStore((state) => state.loginResult);

  return (
    <div className='flex flex-col justify-center items-center px-4 w-full'>
      <div className='flex justify-between items-center w-full text-center'>
        <h1 className='flex-[0.2]'>Section Name</h1>
        <h1 className='flex-[0.2]'><strong>Student Name:</strong> {loginResult?.user?.FIRST_NAME || 'N/A'}</h1>
        <h1 className='flex-[0.2]'>Timer : 01:30:55</h1>
      </div>

      <div className='flex justify-between items-center w-full text-center'>
        <h1 className='flex-[0.2]'>Q no 1/100</h1>
        <h1 className='flex-[0.2]'>Roll No: <strong>{loginResult?.user?.CANDIDATE_ID || 'N/A'}</strong></h1>
        <h1 className='flex-[0.2]'>Negative Marking: YES</h1>
      </div>
    </div>
  );
};

export default Info;
