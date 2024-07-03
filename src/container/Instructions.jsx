import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/instruction.css';
import FastNuLogo from '../assets/FAST.png';
import FastLogo from '../assets/FAST2.png';

const Instruction = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleStartTest = () => {
    if (isChecked) {
      navigate('/home');
    }
  };

  return (
    <div className="font-sans max-w-4xl mx-auto p-4 bg-black text-white">
      <div className="flex justify-between items-center mb-4">
        <img src={FastNuLogo} alt="FAST-NU Logo" className="w-12 h-12" />
        <img src={FastLogo} alt="FAST Logo" className="w-12 h-12" />
      </div>
      
      <div className="admission-test">
        <h2><strong>Candidate Information:</strong></h2>
        <div className="card candidate-info">
          <h2>Candidate ID: </h2>
          <p>Test Center:   </p>
          <p>Test Session:  </p>
          <p>Programme:     </p>
        </div>
        
        <h1><strong>Welcome to FAST NUCES Admission Test:</strong> </h1>
        
        <div className="card instructions">
          <h2><strong>GENERAL INSTRUCTIONS.</strong></h2>
          <ul>
          <li>• Calculators, Pagers, Cellular Phones and CDs are not allowed in the test area.</li>
          <li>• Do not show your Verification Slip (with your user ID and password) to any other candidate, anyone found doing so will be disqualified from the test.</li>
          <li>• After you have entered your login name and password, and the system has logged you in the test, use only the MOUSE during the test.</li>
          <li>• If you try to use keyboard, a warning message will be displayed on your screen. If this message appears on your screen more than once you can be disqualified from the test.</li>
          <li>• Anyone found with a screen showing some thing other than the Admission Test will be disqualified from the test and removed from the list of candidates for admission.</li>
          <li>• Any evidence of cheating, use of unfair means or non-compliance with the instructions will disqualify the candidate from the test and his/her name will be removed from the list of candidates for admission.</li>
          <li>• Rough work should be done on the Rough Sheet attached with your Verification Slip.</li>
          <li>• When you are told, click on the box below to indicate that you have read and understood the instructions.</li>
          <li>• When you are told, only then click on the Start Test button below.</li>
          <li>• The time displayed on your screen is the Time Left for that particular section only.</li>
          <li>• The number showing Total Questions, displayed on your screen, is the number of questions in that particular section.</li>
        </ul>
        </div>
        
        <div className="card test-summary">
          <h2><strong>Test Summary:</strong></h2>
          <table>
            <thead>
              <tr>
                <th>Section</th>
                <th>Time Allocated (in Minutes)</th>
                <th>No. Of Questions</th>
                <th>Weightage %</th>
                <th>Negative Marking</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mathematics</td>
                <td>5</td>
                <td>5</td>
                <td>25</td>
                <td>No</td>
              </tr>
              <tr>
                <td>IQ and Analytical Skills</td>
                <td>5</td>
                <td>5</td>
                <td>25</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Science</td>
                <td>5</td>
                <td>5</td>
                <td>25</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>English</td>
                <td>5</td>
                <td>5</td>
                <td>25</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <label className="block">
            <input type="checkbox" onChange={handleCheckboxChange} />
            I have carefully read the instructions and I agree to follow them
          </label>
          <button 
            className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isChecked}
            onClick={handleStartTest}>
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instruction;