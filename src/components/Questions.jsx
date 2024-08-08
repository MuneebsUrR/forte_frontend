import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify'; // Import DOMPurify
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { Button, Radio, Typography } from '@mui/material';

const Question = ({
  question,
  questionIndex,
  selectedOptions,
  handleOptionChange,
  handleReset,
  handleBack,
  handleNext,
  handleReviewClick,
  showLastQuestionMessage // Receive this prop
}) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered) return null;

  return (
    <MathJaxContext>
      <div className="flex-[3] w-full h-[100%] overflow-auto">
        <Typography variant="h5" className='ml-4'>
          Question No: {questionIndex + 1}
        </Typography>
        <MathJax>
          <Typography className='ml-4 mr-4 mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question?.QUESTION_TEXT) }} />
        </MathJax>
        {question.answer_choices.map((choice, index) => {
          // Use index directly as choiceId
          const choiceId = index.toString(); // Ensure choiceId is a string
          return (
            <label key={index} htmlFor={choiceId} className="flex items-center cursor-pointer mb-2">
              <Radio
                name="options"
                id={choiceId}
                checked={selectedOptions[questionIndex] === choiceId}
                onChange={(e) => handleOptionChange(e, choiceId)} // Make sure handleOptionChange works with string values
                value={choiceId}
              />
              <Typography className='ml-2' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(choice.ANS_CHOICE_TEXT) }} />
            </label>
          );
        })}
        <div className='flex flex-col justify-start items-start gap-4 m-4'>
          <div className='flex justify-around items-start w-full'>
            <Button
              variant="contained"
              onClick={handleReset}
              disabled={!selectedOptions[questionIndex]}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleBack}
              disabled={questionIndex <= 0}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
            <Button
              variant="contained"
              onClick={handleReviewClick}
              disabled={showLastQuestionMessage} // Disable if it's the last question
            >
              Review
            </Button>
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleReviewClick: PropTypes.func.isRequired,
  showLastQuestionMessage: PropTypes.bool.isRequired 
};

export default Question;
