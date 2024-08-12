import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePaperStore from '../Hooks/paperstore';
import useProgressStore from '../Hooks/ProgressStore';
import Info from '../components/Info';
import Question from '../components/Questions';
import Sidebar from '../components/Sidebar';
import { logQuestionDetails } from '../utils/logUtils';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const SectionDialog = ({ open, onClose, title, content, primaryAction, secondaryAction }) => (
  <Dialog open={open} onClose={() => onClose(false)}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <p>{content}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => onClose(true)} color="primary" aria-label={primaryAction}>{primaryAction}</Button>
      <Button onClick={() => onClose(false)} color="secondary" aria-label={secondaryAction}>{secondaryAction}</Button>
    </DialogActions>
  </Dialog>
);


const LastQuestionMessage = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center">
    This is the last question of this section. If you have time, you can review your answers or start the next section.
  </div>
);

const QuestionNavigation = ({
  currentQuestion,
  questionIndex,
  selectedOptions,
  handleOptionChange,
  handleReset,
  handleBack,
  handleNext,
  handleReviewClick,
  showLastQuestionMessage
}) => (
  <Question
    question={currentQuestion}
    questionIndex={questionIndex}
    selectedOptions={selectedOptions}
    handleOptionChange={handleOptionChange}
    handleReset={handleReset}
    handleBack={handleBack}
    handleNext={handleNext}
    handleReviewClick={handleReviewClick}
    showLastQuestionMessage={showLastQuestionMessage}
  />
);

const Home = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionStatuses, setQuestionStatuses] = useState([]);
  const [reviewedQuestions, setReviewedQuestions] = useState([]);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showLastQuestionMessage, setShowLastQuestionMessage] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [finalDialog, setFinalDialog] = useState(false);

  const [startTime, setStartTime] = useState(Date.now());


  const candidateId = useProgressStore((state) => state.candidateId);
  const sqpId = useProgressStore((state) => state.sqpId);
  const qpId = useProgressStore((state) => state.qpId);

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
    const isLastQuestion = currentQuestionIndex === data[currentSubjectIndex].questions.length - 1;
    const isLastSection = currentSubjectIndex === data.length - 1;

    if (isLastQuestion && isLastSection) {
      setFinalDialog(true);
    } else if (showLastQuestionMessage) {
      setOpenDialog(true);
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    const currentSubject = data[currentSubjectIndex];
    if (currentSubject) {
      const newQuestionStatuses = [...questionStatuses];
      let isAttempted = -1; // Default to skipped
      let selectedAnswer = '-1'; // Default selected answer for skipped questions

      if (selectedOptions[currentQuestionIndex] !== undefined) {
        if (newQuestionStatuses[currentQuestionIndex] === 'reviewed') {
          isAttempted = 2; // Mark as reviewed
          selectedAnswer = selectedOptions[currentQuestionIndex]; // Keep the selected answer
        } else {
          isAttempted = 1; // Mark as completed
          selectedAnswer = selectedOptions[currentQuestionIndex]; // Set the selected answer
        }
        newQuestionStatuses[currentQuestionIndex] = 'completed';
      } else {
        newQuestionStatuses[currentQuestionIndex] = 'skipped';
      }

      setQuestionStatuses(newQuestionStatuses);

      // Log details and update time tracking
      logQuestionDetails(candidateId, sqpId, qpId, startTime, currentSubjectIndex, currentQuestionIndex, selectedOptions, isAttempted, data);

      if (currentQuestionIndex < currentSubject.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentSubjectIndex < data.length - 1) {
        setCurrentSubjectIndex(currentSubjectIndex + 1);
        setCurrentQuestionIndex(0);
        setQuestionStatuses([]);
        setReviewedQuestions([]);
      }

      // Set the start time for the new question
      setStartTime(Date.now());
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
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = e.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleReset = () => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = '';
    setSelectedOptions(newSelectedOptions);
  };

  const handleReview = () => {
    if (selectedOptions[currentQuestionIndex] === undefined || selectedOptions[currentQuestionIndex] === '') {
      return;
    }

    const newReviewedQuestions = [...reviewedQuestions];
    newReviewedQuestions[currentQuestionIndex] = true;
    setReviewedQuestions(newReviewedQuestions);

    const newQuestionStatuses = [...questionStatuses];
    if (!newQuestionStatuses[currentQuestionIndex] || newQuestionStatuses[currentQuestionIndex] === 'skipped' || newQuestionStatuses[currentQuestionIndex] === 'completed') {
      newQuestionStatuses[currentQuestionIndex] = 'reviewed';
    }
    setQuestionStatuses(newQuestionStatuses);

    const isAttempted = 2; // Mark as reviewed
    const selectedAnswer = selectedOptions[currentQuestionIndex];

    // Log details and update time tracking
    logQuestionDetails(candidateId, sqpId, qpId, startTime, currentSubjectIndex, currentQuestionIndex, selectedOptions, isAttempted, data);

    if (currentQuestionIndex < data[currentSubjectIndex].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSubjectIndex < data.length - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
      setCurrentQuestionIndex(0);
      setQuestionStatuses([]);
      setReviewedQuestions([]);
    }

    // Set the start time for the new question
    setStartTime(Date.now());
  };




  const handleJumpToQuestion = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const handleDialogClose = (moveToNextSection) => {
    if (moveToNextSection) {
      const currentSubject = data[currentSubjectIndex];
      const newQuestionStatuses = [...questionStatuses];
      const lastQuestionIndex = currentSubject.questions.length - 1;

      if (selectedOptions[lastQuestionIndex] !== undefined) {
        newQuestionStatuses[lastQuestionIndex] = selectedOptions[lastQuestionIndex] === '' ? 'skipped' : 'completed';
      } else {
        newQuestionStatuses[lastQuestionIndex] = 'skipped';
      }

      setQuestionStatuses(newQuestionStatuses);
      moveToNextQuestion();
    }
    setOpenDialog(false);
  };

  const handleFinalDialogClose = (submitTest) => {
    if (submitTest) {
      navigate('/result');
    } else {
      setFinalDialog(false);
    }
  };

  const currentSubject = data[currentSubjectIndex];
  const currentQuestion = currentSubject?.questions[currentQuestionIndex];

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      const message = "Are you sure you want to leave? Your progress will be lost.";
      event.returnValue = message; // Standard way for most browsers
      return message; // Some browsers require this to display the message
    };

    const handlePopState = (event) => {
      event.preventDefault();
      const message = "Are you sure you want to leave? Your progress will be lost.";
      if (window.confirm(message)) {
        navigate(-1); // Only navigate back if the user confirms
      } else {
        window.history.pushState(null, document.title, window.location.href); // Prevent navigation
      }
    };

    // Prevent refresh and customize the prompt message
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Prevent backward navigation
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);



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
              isNegativeMarking={!!currentSubject.IS_NEGATIVE_MARKING}
            />
            {currentQuestion && (
              <>
                <QuestionNavigation
                  currentQuestion={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  selectedOptions={selectedOptions}
                  handleOptionChange={handleOptionChange}
                  handleReset={handleReset}
                  handleBack={handleBack}
                  handleNext={handleNext}
                  handleReviewClick={handleReview}
                  showLastQuestionMessage={showLastQuestionMessage}
                />
                {showLastQuestionMessage && <LastQuestionMessage />}
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

      <SectionDialog
        open={openDialog}
        onClose={handleDialogClose}
        title="End of Section"
        content="You have reached the end of this section. Would you like to move to the next section or continue reviewing the current section?"
        primaryAction="Move to Next Section"
        secondaryAction="Continue Reviewing"
      />

      <SectionDialog
        open={finalDialog}
        onClose={handleFinalDialogClose}
        title="Submit Test"
        content="You have reached the last question of the last section. Would you like to submit the test or continue reviewing?"
        primaryAction="Submit Test"
        secondaryAction="Continue Reviewing"
      />
    </div>
  );
};

export default Home;