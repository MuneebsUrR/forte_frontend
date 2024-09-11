import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => (
  <header className="text-center my-8">
    <h1 className="text-3xl font-bold mb-4">Welcome to the FAST-NU Online Admission Test</h1>
    <h2 className="text-2xl">How to take the test?</h2>
  </header>
);

const Step = ({ stepNumber, title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold">STEP {stepNumber}</h3>
    <h4 className="text-lg font-medium">{title}</h4>
    <div className="mt-2">{children}</div>
  </div>
);

const Instructions_Detail = () => (
  <div className="p-4">
    <Step stepNumber={1} title="Login to the test">
      <ul className="list-disc ml-5">
        <li>Enter your login ID provided on your Admit Card</li>
        <li>Enter your password, will be provided to you when you report at the test center.</li>
        <li>Click login button</li>
      </ul>
    </Step>
    <Step stepNumber={2} title="Read the Instructions">
      <ul className="list-disc ml-5">
        <li>Carefully read the instructions</li>
        <li>Note the total sections and the time allocated, number of questions, weightage of each section</li>
      </ul>
    </Step>
    <Step stepNumber={3} title="Start the test">
      <ul className="list-disc ml-5">
        <li>Check the read and agree instructions box</li>
        <li>Click the Start Test button</li>
      </ul>
    </Step>
    <Step stepNumber={4} title="Answer the questions">
      <ul className="list-disc ml-5">
        <li>Read the question carefully and choose the correct answer by clicking the button next to your choice of answer</li>
        <li>Go to the next or previous question by clicking Forward or Back button as desired</li>
        <li>Skip Forward and Skip Back buttons will appear when you have not selected any answer</li>
        <li>After selecting a choice if you want to leave the question unanswered, click the Reset Choice button</li>
      </ul>
    </Step>
    <Step stepNumber={5} title="Logout">
      <ul className="list-disc ml-5">
        <li>When you have answered the questions, you must log out and confirm to submit the paper.</li>
      </ul>
    </Step>
  </div>
);

const Notes = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="mt-8 p-4">
      <h3 className="text-xl font-semibold">Note:</h3>
      <ul className="list-disc ml-5">
        <li>Each section has a time limit.</li>
        <li>Next section will be automatically displayed on your screen when previous section's allocated time is up.</li>
        <li>You will not be able to come back to a section after you have completed a section.</li>
        <li>First and last question of each section are highlighted.</li>
      </ul>
      <p className=" font-bold mt-4 mb-2">GOOD LUCK!</p>
      <button 
        className="text-center mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

const Welcome = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <Instructions_Detail />
      <Notes />
    </div>
  );
};

export default Welcome;
