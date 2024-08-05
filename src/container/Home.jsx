import React, { useState, useEffect } from 'react';
import usePaperStore from '../Hooks/paperstore';
import Info from '../components/Info';
import Question from '../components/Questions';
import Sidebar from '../components/Sidebar';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questionStatuses, setQuestionStatuses] = useState({});
  const [reviewedQuestions, setReviewedQuestions] = useState({});
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showLastQuestionMessage, setShowLastQuestionMessage] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
    if (showLastQuestionMessage) {
      setOpenDialog(true);
    } else {
      moveToNextQuestion();
    }
  };

  const handleReviewClick = () => {
    if (showLastQuestionMessage) {
      return; // Optionally, you can show an alert or message here
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    const currentSubject = data[currentSubjectIndex];
    if (currentSubject) {
      const newQuestionStatuses = { ...questionStatuses };
      const currentQuestionStatus = newQuestionStatuses[currentQuestionIndex];

      if (selectedOptions[currentQuestionIndex] !== undefined) {
        if (selectedOptions[currentQuestionIndex] === '') {
          newQuestionStatuses[currentQuestionIndex] = 'skipped';
        } else if (reviewedQuestions[currentQuestionIndex]) {
          newQuestionStatuses[currentQuestionIndex] = 'completed';
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

  const handleReview = () => {
    if (selectedOptions[currentQuestionIndex] === undefined || selectedOptions[currentQuestionIndex] === '') {
      return;
    }

    const newReviewedQuestions = { ...reviewedQuestions };
    newReviewedQuestions[currentQuestionIndex] = true;
    setReviewedQuestions(newReviewedQuestions);

    const newQuestionStatuses = { ...questionStatuses };

    if (newQuestionStatuses[currentQuestionIndex] === 'skipped' || newQuestionStatuses[currentQuestionIndex] === 'completed') {
      newQuestionStatuses[currentQuestionIndex] = 'reviewed';
    } else if (!newQuestionStatuses[currentQuestionIndex]) {
      newQuestionStatuses[currentQuestionIndex] = 'reviewed';
    }
    setQuestionStatuses(newQuestionStatuses);

    if (currentQuestionIndex < data[currentSubjectIndex].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSubjectIndex < data.length - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
      setCurrentQuestionIndex(0);
      setQuestionStatuses({});
      setReviewedQuestions({});
    }
  };

  const handleJumpToQuestion = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const handleDialogClose = (moveToNextSection) => {
    if (moveToNextSection) {
      // Save last question status before moving to next section
      const currentSubject = data[currentSubjectIndex];
      const newQuestionStatuses = { ...questionStatuses };
      const lastQuestionIndex = currentSubject.questions.length - 1;

      if (selectedOptions[lastQuestionIndex] !== undefined) {
        if (selectedOptions[lastQuestionIndex] === '') {
          newQuestionStatuses[lastQuestionIndex] = 'skipped';
        } else {
          newQuestionStatuses[lastQuestionIndex] = 'completed';
        }
      } else {
        newQuestionStatuses[lastQuestionIndex] = 'skipped';
      }

      setQuestionStatuses(newQuestionStatuses);
      moveToNextQuestion();
    }
    setOpenDialog(false);
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
                  handleReviewClick={handleReview}
                  showLastQuestionMessage={showLastQuestionMessage} // Pass this prop
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
        currentQuestionIndex={currentQuestionIndex}
        onJumpToQuestion={handleJumpToQuestion}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>End of Section</DialogTitle>
        <DialogContent>
          <p>You have reached the end of this section. Would you like to move to the next section or continue reviewing the current section?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(true)} color="primary">Move to Next Section</Button>
          <Button onClick={() => handleDialogClose(false)} color="secondary">Continue Reviewing</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
