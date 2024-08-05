import React, { useState, useEffect } from 'react';
import usePaperStore from '../Hooks/paperstore'; 
import Info from '../components/Info'; 
import Question from '../components/Questions'; 
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questionStatuses, setQuestionStatuses] = useState({});
  const [reviewedQuestions, setReviewedQuestions] = useState({}); // State for reviewed questions
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
      const newQuestionStatuses = { ...questionStatuses };
      if (selectedOptions[currentQuestionIndex] !== undefined) {
        if (reviewedQuestions[currentQuestionIndex]) {
          newQuestionStatuses[currentQuestionIndex] = 'reviewed';
        } else {
          newQuestionStatuses[currentQuestionIndex] = 'completed';
        }
      } else {
        newQuestionStatuses[currentQuestionIndex] = 'skipped';
      }
      setQuestionStatuses(newQuestionStatuses);

      if (currentQuestionIndex < currentSubject.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentSubjectIndex < data.length - 1) {
        setCurrentSubjectIndex(currentSubjectIndex + 1);
        setCurrentQuestionIndex(0);
        
        // Reset question statuses and reviewed questions for new section
        setQuestionStatuses({});
        setReviewedQuestions({});
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
    const newReviewedQuestions = { ...reviewedQuestions };
    newReviewedQuestions[currentQuestionIndex] = true;
    setReviewedQuestions(newReviewedQuestions);

    // Update status to reviewed if not already set to completed
    const newQuestionStatuses = { ...questionStatuses };
    if (!newQuestionStatuses[currentQuestionIndex]) {
      newQuestionStatuses[currentQuestionIndex] = 'reviewed';
    }
    setQuestionStatuses(newQuestionStatuses);
  };

  const handleJumpToQuestion = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const currentSubject = data ? data[currentSubjectIndex] : null;
  const currentQuestion = currentSubject ? currentSubject.questions[currentQuestionIndex] : null;

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        {currentSubject && (
          <>
            <Info 
              subject_name={currentSubject.NODE_NAME}  
              noq={currentSubject.NOQ}                 
              wtg={currentSubject.WTG}                
              time_allocated={currentSubject.TIME_ALLOCATED}  
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
      <Sidebar 
        questionStatuses={questionStatuses}
        totalQuestions={currentSubject ? currentSubject.questions.length : 0}
        currentQuestionIndex={currentQuestionIndex} // Pass currentQuestionIndex to Sidebar
        onJumpToQuestion={handleJumpToQuestion}
      />
    </div>
  );
};

export default Home;
