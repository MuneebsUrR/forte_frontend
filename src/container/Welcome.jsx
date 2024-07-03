import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FastNuLogo from '../assets/FAST.png';
import FastLogo from '../assets/FAST2.png';

const TestInstructions = () => {
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: 'Login to the test', instructions: [
      'Enter your Login ID provided on your Admit Card',
      'Enter your Password, will be provided to you when you report at the test center.',
      'Click Login button'
    ]},
    { number: 2, title: 'Read the instructions', instructions: [
      'Carefully read the instructions',
      'Note the total sections and the time allocated, number of questions, weightage of each section'
    ]},
    { number: 3, title: 'Start the test', instructions: [
      'Check the read and agree instructions box.',
      'Click the Start Test button'
    ]},
    { number: 4, title: 'Answer the questions', instructions: [
      'Read the question carefully and choose the correct answer by clicking the button next to your choice of answer',
      'Go to the next or previous question by clicking Forward or Back button as desired',
      'Skip Forward and Skip Back buttons will appear when you have not selected any answer',
      'After selecting a choice if you want to leave the question unanswered, click the Reset Choice button'
    ]},
    { number: 5, title: 'Logout', instructions: [
      'When you have answered the questions, you must log out and confirm to submit the paper.'
    ]}
  ];

  const handleContinueClick = () => {
    navigate('/login');
  };

  return (
    <div className="font-sans max-w-4xl mx-auto p-4 bg-black text-white">
      <div className="flex justify-between items-center mb-4">
        <img src={FastNuLogo} alt="FAST-NU Logo" className="w-12 h-12" />
        <img src={FastLogo} alt="FAST Logo" className="w-12 h-12" />
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-6">Welcome to the FAST-NU Online Admission Test</h1>
      
      <div className="bg-blue-900 text-white py-2 px-4 mb-4">
        <h2 className="text-lg font-semibold">How to take the test?</h2>
      </div>
      
      {steps.map((step) => (
        <div key={step.number} className={`mb-4 p-2 text-black ${step.number % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
          <div className="flex items-start">
            <div className="font-bold w-24">STEP {step.number}</div>
            <div className="flex-1">
              <div className="font-bold mb-1">{step.title}</div>
              <ul className="list-disc pl-5">
                {step.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-4">
        <p className="font-bold mb-2">Note:</p>
        <ul className="list-disc pl-5">
          <li>Each section has a time limit.</li>
          <li>Next section will be automatically displayed on your screen when previous section's allocated time is up.</li>
          <li>You will not be able to come back to a section after you have completed a section.</li>
          <li>First and last question of each section are highlighted.</li>
        </ul>
      </div>
      
      <p className="text-center font-bold mt-4 mb-2">GOOD LUCK!</p>
      
      <div className="text-center">
        <button 
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition duration-300"
          onClick={handleContinueClick}
        >
          Continue <ChevronRight className="inline-block ml-1" size={16} />
        </button>
      </div>
      
      <p className="text-center text-sm mt-4">© National University of Computer and Emerging Sciences</p>
    </div>
  );
};

export default TestInstructions;
