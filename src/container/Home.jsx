import React, { useState, useEffect } from 'react';
import usePaperStore from '../Hooks/paperstore';
import Info from '../components/Info';
import Question from '../components/Questions';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questionStatuses, setQuestionStatuses] = useState({});
  const [reviewedQuestions, setReviewedQuestions] = useState({});
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showLastQuestionMessage, setShowLastQuestionMessage] = useState(false);

  // Access Zustand store
  const { getData } = usePaperStore(state => ({
    getData: state.getData,
    getLoading: state.getLoading,
  }));

  const data = getData();


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
      const currentQuestionStatus = newQuestionStatuses[currentQuestionIndex];

      // Determine if the question should be marked as completed, skipped, or reviewed
      if (selectedOptions[currentQuestionIndex] !== undefined) {
        // If option was reset (i.e., empty string), consider it as skipped
        if (selectedOptions[currentQuestionIndex] === '') {
          newQuestionStatuses[currentQuestionIndex] = 'skipped';
        } else if (reviewedQuestions[currentQuestionIndex]) {
          // Preserve 'reviewed' status if already reviewed and option selected
          newQuestionStatuses[currentQuestionIndex] = 'completed';
        } else {
          newQuestionStatuses[currentQuestionIndex] = 'completed';
        }
      } else {
        // If no option was selected, mark as skipped
        newQuestionStatuses[currentQuestionIndex] = 'skipped';
      }

      // Update the state with new statuses
      setQuestionStatuses(newQuestionStatuses);

      // Move to the next question or subject
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
    // Check if an option is selected for the current question
    if (selectedOptions[currentQuestionIndex] === undefined || selectedOptions[currentQuestionIndex] === '') {
      // Do nothing if no option is selected
      return;
    }
  
    // Mark the question as reviewed if an option is selected
    const newReviewedQuestions = { ...reviewedQuestions };
    newReviewedQuestions[currentQuestionIndex] = true;
    setReviewedQuestions(newReviewedQuestions);
  
    const newQuestionStatuses = { ...questionStatuses };
  
    // Update the status to reviewed if the question was previously skipped or solved
    if (newQuestionStatuses[currentQuestionIndex] === 'skipped' || newQuestionStatuses[currentQuestionIndex] === 'completed') {
      newQuestionStatuses[currentQuestionIndex] = 'reviewed';
    } else if (!newQuestionStatuses[currentQuestionIndex]) {
      // If the question is neither reviewed nor completed, set it as reviewed
      newQuestionStatuses[currentQuestionIndex] = 'reviewed';
    }
    setQuestionStatuses(newQuestionStatuses);
  
    // Move to the next question
    if (currentQuestionIndex < data[currentSubjectIndex].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSubjectIndex < data.length - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
      setCurrentQuestionIndex(0);
  
      // Reset question statuses and reviewed questions for new section
      setQuestionStatuses({});
      setReviewedQuestions({});
    }
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
