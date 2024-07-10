import React from 'react';

const Info = () => {
  return (
    <div className='flex flex-col justify-center items-center px-4 w-full'>

      <div className='flex justify-between items-center w-full text-center'>
        <h1 className='flex-[0.2]'>Section Name</h1>
        <h1 className='flex-[0.2]'>Student Name</h1>
        <h1 className='flex-[0.2]'>Timer : 01:30:55</h1>
      </div>

      <div className='flex justify-between items-center w-full text-center'>
        <h1 className='flex-[0.2]'>Q no 1/100</h1>
        <h1 className='flex-[0.2]'>Roll No: 1234212</h1>
        <h1 className='flex-[0.2]'>Negative Marking: YES</h1>
      </div>

    </div>
  );
};

export default Info;
