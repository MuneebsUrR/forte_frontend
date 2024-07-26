import React, { useState, useEffect } from 'react';
import Info from '../components/Info';
import Questions from '../components/Questions';
import Review from '../components/Review';
import Cookies from 'universal-cookie';



const cookies = new Cookies();

const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
 
  const [dataQuestions, setDataQuestions] = useState(null);
  const [questionChoices, setQuestionChoices] = useState(null);

  const [filterChoices, setFilterChoices] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

 
    // Retrieve the token from cookies
    const token = cookies.get('token');


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

  const fetchQuestionsData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}/questions/getquestions`);
      const data = await response.json();
      setDataQuestions(data.questions);
      console.log("questions", dataQuestions)
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const fetchChoicesData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}/questions/getchoices`);
      const data = await response.json();
      setQuestionChoices(data.choices);
      console.log("choices", questionChoices)
    } catch (error) {

      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchQuestionsData();
    fetchChoicesData();
  }, []);

  useEffect(() => {
    if (questionChoices && dataQuestions) {
      const filteredChoices = questionChoices.filter((choice) => {
        return choice.QUESTION_ID === dataQuestions[questionIndex].QUESTION_ID;
      });
      setFilterChoices(filteredChoices);
      console.log("filteredChoices", filterChoices)
    }
  }, [questionIndex, dataQuestions, questionChoices]);

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

  const totalQuestions = 0;
 
  const completedQuestions = categorizeQuestions('completed');
  const skippedQuestions = categorizeQuestions('skipped');
  const reviewedQuestions = categorizeQuestions('reviewed');

  return (
    <main className='h-[80vh] flex flex-col'>
      <div className=''>
        <Info />
      </div>
      <div className='flex sm:flex-row flex-col h-[90%] mt-3 px-4'>
        <Questions
          dataQuestions={dataQuestions}
          questionChoices={questionChoices}
          questionIndex={questionIndex}
          filterChoices={filterChoices}
          selectedOptions={selectedOptions}
          handleOptionChange={handleOptionChange}
          handleReset={handleReset}
          handleBackClick={handleBackClick}
          handleNextClick={handleNextClick}
          handleReviewClick={handleReviewClick}
          className='overflow-auto'
        />
        <Review
          totalQuestions={totalQuestions}
          questionStatus={questionStatus}
          questionIndex={questionIndex}
          completedQuestions={completedQuestions}
          skippedQuestions={skippedQuestions}
          reviewedQuestions={reviewedQuestions}
          setQuestionIndex={setQuestionIndex}
          className='overflow-auto'
        />
      </div>
    </main>

  );
}

export default Home;
