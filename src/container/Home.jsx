import React, { useState, useEffect } from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import styles from "../style";
import { useTheme } from '../Context/Theme';


const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [questionData, setQuestionData] = useState(null);
  const [questionChoices, setQuestionChoices] = useState(null);
  const [filterChoices, setFilterChoices] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const { mode, toggleTheme } = useTheme();
  


  const handleOptionChange = (e) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: e.target.id,
    });
  };

  const handleReset = () => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: null,
    });
  };

  // Mathjax configuration
  const config = {
    loader: { load: ['[tex]/html'] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      packages: { '[+]': ['html'] }
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:7000/getquestions');
      const data = await response.json();
      setQuestionData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    try {
      const response = await fetch('http://localhost:7000/getchoices');
      const data = await response.json();
      setQuestionChoices(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (questionChoices && questionData) {
      const filteredChoices = questionChoices.filter((choice) => {
        return choice.QUESTION_ID === questionData[questionIndex].QUESTION_ID;
      });
      setFilterChoices(filteredChoices);
    }
  }, [questionIndex, questionData, questionChoices]);

  const handleBackClick = () => {
    setQuestionIndex(questionIndex - 1);
  };

  const handleNextClick = () => {
    if (questionStatus[questionIndex] !== 'reviewed') {
      const status = selectedOptions[questionIndex] ? 'completed' : 'skipped';
      setQuestionStatus({
        ...questionStatus,
        [questionIndex]: status,
      });
    }
    setQuestionIndex(questionIndex + 1);
  };

  const handleReviewClick = () => {
    if (selectedOptions[questionIndex]) {
      setQuestionStatus({
        ...questionStatus,
        [questionIndex]: 'reviewed',
      });
    }
  };

  const categorizeQuestions = (status) => {
    return Object.keys(questionStatus).filter(key => questionStatus[key] === status);
  };

  const totalQuestions = questionData ? questionData.length : 0;
  const completedQuestions = categorizeQuestions('completed');
  const skippedQuestions = categorizeQuestions('skipped');
  const reviewedQuestions = categorizeQuestions('reviewed');

  return (
    <MathJaxContext config={config}>
     <section className={`flex flex-col ${styles.paddingX} justify-center items-center h-[80vh] ${mode === 'light' ? 'bg-gray-100' : ''}`}>
      {/* <Brightness4Icon onClick={toggleTheme} className="cursor-pointer" /> */}
        <div className='mt-5 flex flex-row w-full justify-around items-center p-1'>
          <div className={`flex flex-col justify-around items-center`}>
          <h1 className={`font-bold ${mode === 'dark' ? 'text-white' :  'text-black'}`}>
          Section Name
          </h1>
          <h1 className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>Q No: {questionIndex + 1}/{totalQuestions}</h1>
          </div>
          <div className='flex flex-col justify-around items-center'>
            <h1  className={`font-bold ${mode === 'dark' ? 'text-white' : 'text-black'}`} >Student Name</h1>
            <h1 className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>Test Roll No: 241234</h1>
          </div>
          <div className='flex flex-col justify-around items-center'>
            <h1  className={`font-bold ${mode === 'dark' ? 'text-white' : 'text-black'}`} >Timer: 01:30:55</h1>
            <h1  className={`font-bold ${mode === 'dark' ? 'text-white' : 'text-black'}`} >Negative Marking: YES</h1>
          </div>
        </div>

        <div id='features' className='mt-[-1.0rem] scrollable-element flex gap-1 md:flex-row flex-col items-center justify-between h-[100%] p-[2rem] w-[100vw]'>
          <MathJaxContext>
            <div className={`flex-[3] border-solid border-2 ${mode === 'dark' ? 'border-white bg-black' : 'border-black bg-white'} w-full h-[100%] overflow-auto`}>
              <h1 className='text-[24px] font-bold text-gradient ml-4'>Question No: {questionIndex + 1}</h1>
              <MathJax>
                <p className='ml-4 mr-4 mb-4'>
                  {questionData && questionData[questionIndex].QUESTION_TEXT}
                </p>
              </MathJax>
              {filterChoices && filterChoices.map((choice, index) => {
                const choiceId = `choice-${index}`;
                return (
                  <div key={index}>
                    <input
                      type="radio"
                      name="options"
                      id={choiceId}
                      className="ml-2 mt-[0.4rem] mr-3"
                      checked={selectedOptions[questionIndex] === choiceId}
                      onChange={handleOptionChange}
                    />
                    {choice.ANS_CHOICE_TEXT}
                  </div>
                );
              })}
              <div className='flex flex-col justify-start items-start gap-4 m-4'>
                <div className='flex justify-around items-start w-full text-black'>
                <button className={`px-4 rounded-lg ${mode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} ${!selectedOptions[questionIndex] ? 'disabled' : ''}`}
                    onClick={handleReset}
                    disabled={!selectedOptions[questionIndex]}>
                    Reset
                  </button>
                  <button className={`px-4 rounded-lg ${mode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} `}onClick={handleBackClick}disabled={questionIndex <= 0}>Back</button>
                  <button className={`px-4 rounded-lg ${mode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} `} onClick={handleNextClick} disabled={questionData && questionIndex >= questionData.length - 1}>Next</button>
                  <button className={`px-4 rounded-lg ${mode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} `} onClick={handleReviewClick}>Review</button>
                </div>
              </div>
            </div>
          </MathJaxContext>
          {/* Review Questions */}
          <div className={`flex-[1] border-solid border-2 ${mode === 'dark' ? 'border-white bg-black' : 'border-black bg-white'} w-full h-[100%]`}>
            <h1 className='text-[24px] font-bold text-gradient ml-4'>Review Questions</h1>
            <div className='flex flex-col p-4'>
              <h2 className={`font-bold ${mode === 'dark' ? 'text-white' : 'text-black'}`} >Total</h2>
              <div className='flex flex-wrap gap-2 mb-4'>
                {Array.from({ length: totalQuestions }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 border border-black flex justify-center items-center cursor-pointer ${
                      questionIndex === index ? 'bg-blue-500 text-white' : 
                      questionStatus[index] === 'completed' ? 'bg-green-500 text-white' :
                      questionStatus[index] === 'skipped' ? 'bg-red-500 text-white' :
                      questionStatus[index] === 'reviewed' ? 'bg-yellow-500 text-white' : 'bg-white text-black'
                    }`}
                    onClick={() => setQuestionIndex(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <h2 className={`font-bold ${mode === 'dark' ? 'text-white' : 'text-black'}`} >Completed</h2>
              <div className='flex flex-wrap gap-2 mb-4'>
                {completedQuestions.length ? completedQuestions.map(index => (
                  <div
                    key={index}
                    className='w-8 h-8 bg-green-500 text-white border border-black flex justify-center items-center cursor-pointer'
                    onClick={() => setQuestionIndex(Number(index))}
                  >
                    {Number(index) + 1}
                  </div>
                )) : null}
              </div>
              <h2 className={`font-bold ${mode === 'dark' ? 'text-white' : 'text-black'}`} >Skipped</h2>
              <div className='flex flex-wrap gap-2 mb-4'>
                {skippedQuestions.length ? skippedQuestions.map(index => (
                  <div
                    key={index}
                    className='w-8 h-8 bg-red-500 text-white border border-black flex justify-center items-center cursor-pointer'
                    onClick={() => setQuestionIndex(Number(index))}
                  >
                    {Number(index) + 1}
                  </div>
                )) : null}
              </div>
              <h2 className={`font-bold ${mode === 'dark' ? 'text-white' : 'text-black'}`} >Reviewed</h2>
              <div className='flex flex-wrap gap-2 mb-4'>
                {reviewedQuestions.length ? reviewedQuestions.map(index => (
                  <div
                    key={index}
                    className='w-8 h-8 bg-yellow-500 text-white border border-black flex justify-center items-center cursor-pointer'
                    onClick={() => setQuestionIndex(Number(index))}
                  >
                    {Number(index) + 1}
                  </div>
                )) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MathJaxContext>
  );
}

export default Home;
