import React, { useState, useEffect } from 'react';
import usePaperStore from '../Hooks/paperstore'; 
import Info from '../components/Info'; 
import Question from '../components/Questions'; 

const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showLastQuestionMessage, setShowLastQuestionMessage] = useState(false);

  // Access Zustand store
  const { getData, getLoading } = usePaperStore(state => ({
    getData: state.getData,
    getLoading: state.getLoading,
  }));

  const data = getData();
  const loading = getLoading();

  useEffect(() => {
    if (data && data.length > 0) {
      const currentSubject = data[currentSubjectIndex];
      if (currentSubject) {
        const isLastQuestion = currentQuestionIndex === currentSubject.questions.length - 1;
        setShowLastQuestionMessage(isLastQuestion);
      }
    }
  }, [currentQuestionIndex, currentSubjectIndex, data]);

  const handleNext = () => {
    const currentSubject = data[currentSubjectIndex];
    if (currentSubject) {
      if (currentQuestionIndex < currentSubject.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentSubjectIndex < data.length - 1) {
        setCurrentSubjectIndex(currentSubjectIndex + 1);
        setCurrentQuestionIndex(0);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSubjectIndex > 0) {
      const previousSubjectIndex = currentSubjectIndex - 1;
      const previousSubject = data[previousSubjectIndex];
      if (previousSubject) {
        setCurrentSubjectIndex(previousSubjectIndex);
        setCurrentQuestionIndex(previousSubject.questions.length - 1);
      }
    }
  };

  const handleOptionChange = (e) => {
    const newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[currentQuestionIndex] = e.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleReset = () => {
    const newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[currentQuestionIndex] = '';
    setSelectedOptions(newSelectedOptions);
  };

  const handleReviewClick = () => {
    console.log('Review clicked');
  };

  const currentSubject = data ? data[currentSubjectIndex] : null;
  const currentQuestion = currentSubject ? currentSubject.questions[currentQuestionIndex] : null;

  return (
    <div>
      {loading && <p>Loading...</p>}
      {currentSubject && (
        <>
          <Info 
            subject_name={currentSubject.subject_name}
            noq={currentSubject.noq}
            wtg={currentSubject.wtg}
            time_allocated={currentSubject.time_allocated}
            isNegativeMarking={!!currentSubject.isNegativeMarking}
          />
          {currentQuestion && (
            <>
              <Question
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                selectedOptions={selectedOptions}
                handleOptionChange={handleOptionChange}
                handleReset={handleReset}
                handleBack={handleBack}
                handleNext={handleNext}
                handleReviewClick={handleReviewClick}
              />
              {showLastQuestionMessage && (
                <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center">
                  This is the last question of this section. If you have time, you can review your answers or start the next section.
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
