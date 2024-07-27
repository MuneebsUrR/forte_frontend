import React, { useState, useEffect } from 'react';
import Info from '../components/Info';
import Questions from '../components/Questions';
import Review from '../components/Review';
import usePaperStore from '../Hooks/paperstore'; // Adjust the path as needed

const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  // Access Zustand store
  const { getData, getLoading, getError } = usePaperStore(state => ({
    getData: state.getData,
    getLoading: state.getLoading,
    getError: state.getError,
  }));

  const data = getData();

  // Extract the current subject and related questions
  const currentSubject = data?.[0] || {};
  const dataQuestions = currentSubject?.questions || []; // Assuming questions is an array
  const questionChoices = dataQuestions[questionIndex]?.answer_choices || []; // Assuming each question has answer_choices

  useEffect(() => {
    console.log('Data from Zustand:', data);
  
    if (getLoading()) {
      console.log('Loading...');
    }

    if (getError()) {
      console.error('Error:', getError());
    }
  }, [data, getLoading, getError]);

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

  const totalQuestions = 0; // Update as needed
  const completedQuestions = categorizeQuestions('completed');
  const skippedQuestions = categorizeQuestions('skipped');
  const reviewedQuestions = categorizeQuestions('reviewed');

  return (
    <main className='h-[80vh] flex flex-col'>
      <div className=''>
        <Info 
          subject_name={currentSubject.subject_name}
          noq={currentSubject.noq}
          wtg={currentSubject.wtg}
          time_allocated={currentSubject.time_allocated}
          isNegativeMarking={currentSubject.isNegativeMarking === 1} // Convert to boolean if needed
        />
      </div>
      <div className='flex sm:flex-row flex-col h-[90%] mt-3 px-4'>
        <Questions
          dataQuestions={dataQuestions}
          questionChoices={questionChoices}
          questionIndex={questionIndex}
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
};

export default Home;
