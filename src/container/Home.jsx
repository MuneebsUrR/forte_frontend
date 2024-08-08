import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePaperStore from '../Hooks/paperstore';
import useProgressStore from '../Hooks/ProgressStore';
import Info from '../components/Info';
import Question from '../components/Questions';
import Sidebar from '../components/Sidebar';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const SectionDialog = ({ open, onClose, title, content, primaryAction, secondaryAction }) => (
  <Dialog open={open} onClose={() => onClose(false)}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <p>{content}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => onClose(true)} color="primary">{primaryAction}</Button>
      <Button onClick={() => onClose(false)} color="secondary">{secondaryAction}</Button>
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

  const handleReviewClick = () => {
    if (!showLastQuestionMessage) {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    const currentSubject = data[currentSubjectIndex];
    if (currentSubject) {
      const newQuestionStatuses = [...questionStatuses];
      const currentQuestionStatus = newQuestionStatuses[currentQuestionIndex];

      if (selectedOptions[currentQuestionIndex] !== undefined) {
        if (selectedOptions[currentQuestionIndex] === '') {
          newQuestionStatuses[currentQuestionIndex] = 'skipped';
          console.log('IS_ATTEMPED:', 0);
        } else if (reviewedQuestions[currentQuestionIndex]) {
          newQuestionStatuses[currentQuestionIndex] = 'completed';
          console.log('IS_ATTEMPED:', 1);
        } else {
          newQuestionStatuses[currentQuestionIndex] = 'completed';
          console.log('IS_ATTEMPED:', 1);
        }

        console.log('QUESTION_ID:', currentQuestion.QUESTION_ID);
        console.log('SELECTED_ANSWER:', selectedOptions[currentQuestionIndex]);
      } else {
        newQuestionStatuses[currentQuestionIndex] = 'skipped';
        console.log('IS_ATTEMPED:', 0);
      }

      setQuestionStatuses(newQuestionStatuses);

      if (currentQuestionIndex < currentSubject.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentSubjectIndex < data.length - 1) {
        setCurrentSubjectIndex(currentSubjectIndex + 1);
        setCurrentQuestionIndex(0);
        setQuestionStatuses([]);
        setReviewedQuestions([]);
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
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = e.target.value;
    setSelectedOptions(newSelectedOptions);
    console.log('SELECTED_ANSWER:', e.target.value);
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

    if (newQuestionStatuses[currentQuestionIndex] === 'skipped' || newQuestionStatuses[currentQuestionIndex] === 'completed') {
      newQuestionStatuses[currentQuestionIndex] = 'reviewed';
    } else if (!newQuestionStatuses[currentQuestionIndex]) {
      newQuestionStatuses[currentQuestionIndex] = 'reviewed';
    }
    setQuestionStatuses(newQuestionStatuses);

    console.log('QUESTION_ID:', currentQuestion.QUESTION_ID);
    console.log('SELECTED_ANSWER:', selectedOptions[currentQuestionIndex]);
    console.log('IS_ATTEMPED:', 2); 

    if (currentQuestionIndex < data[currentSubjectIndex].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSubjectIndex < data.length - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
      setCurrentQuestionIndex(0);
      setQuestionStatuses([]);
      setReviewedQuestions([]);
    }
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
        if (selectedOptions[lastQuestionIndex] === '') {
          newQuestionStatuses[lastQuestionIndex] = 'skipped';
          console.log('IS_ATTEMPED:', 0);
        } else {
          newQuestionStatuses[lastQuestionIndex] = 'completed';
          console.log('IS_ATTEMPED:', 1);
        }

        console.log('QUESTION_ID:', currentSubject.questions[lastQuestionIndex].QUESTION_ID);
        console.log('SELECTED_ANSWER:', selectedOptions[lastQuestionIndex]);
      } else {
        newQuestionStatuses[lastQuestionIndex] = 'skipped';
        console.log('IS_ATTEMPED:', 0);
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