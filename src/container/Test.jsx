import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import useLoginStore from "../Hooks/loginStore";
import usePaperStore from '../Hooks/paperstore';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { Button, Radio, Typography } from '@mui/material';

const Info = ({ subject_name, noq, wtg, time_allocated, isNegativeMarking }) => {
  const loginResult = useLoginStore((state) => state.loginResult);
  const [timeRemaining, setTimeRemaining] = useState(time_allocated * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time_allocated]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className='flex flex-col items-center px-4 w-full'>
      <div className='flex justify-center items-center w-full text-center mb-4'>
        <h1 className='mx-4'><strong>Name:</strong> {loginResult?.user?.FIRST_NAME || 'N/A'}</h1>
        <h1 className='mx-4'><strong>Roll No:</strong> {loginResult?.user?.CANDIDATE_ID || 'N/A'}</h1>
      </div>

      <div className='flex justify-between items-center w-full text-center'>
        <h2 className='flex-1'>{subject_name}</h2>
        <p className='flex-1'>Total Questions: {noq}</p>
        <p className='flex-1'>Weightage: {wtg}</p>
        <p className='flex-1'>{minutes} min:{seconds.toString().padStart(2, '0')} sec</p>
        <p className='flex-1'>Negative Marking: {isNegativeMarking ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

Info.propTypes = {
  subject_name: PropTypes.string.isRequired,
  noq: PropTypes.number.isRequired,
  wtg: PropTypes.string.isRequired,
  time_allocated: PropTypes.number.isRequired,
  isNegativeMarking: PropTypes.bool.isRequired,
};

const Question = ({
  question,
  questionIndex,
  selectedOptions,
  handleOptionChange,
  handleReset,
  handleBack,
  handleNext,
  handleReviewClick
}) => {
  return (
    <MathJaxContext>
      <div className="flex-[3] w-full h-[100%] overflow-auto">
        <Typography variant="h5" className='ml-4'>
          Question No: {questionIndex + 1}
        </Typography>
        <MathJax>
          <Typography className='ml-4 mr-4 mb-4'>
            {question?.QUESTION_TEXT}
          </Typography>
        </MathJax>
        {question.answer_choices.map((choice, index) => {
          const choiceId = `choice-${index}`;
          return (
            <label key={index} htmlFor={choiceId} className="flex items-center cursor-pointer mb-2">
              <Radio
                name="options"
                id={choiceId}
                checked={selectedOptions[questionIndex] === choiceId}
                onChange={handleOptionChange}
                value={choiceId}
              />
              <Typography className='ml-2'>
                {choice.ANS_CHOICE_TEXT}
              </Typography>
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
  selectedOptions: PropTypes.array.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleReviewClick: PropTypes.func.isRequired,
};

const DataDisplayComponent = () => {
  const { setData, setLoading, setError, data, loading, error } = usePaperStore();
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}`;

        const response = await fetch(`${apiUrl}/paper/getPaper`, {
          method: 'GET',
          headers: {
            'apikey': token
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          throw new Error('API response indicates failure.');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData, setLoading, setError]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleNext = () => {
    const currentSubject = data[currentSubjectIndex];
    if (currentQuestionIndex < currentSubject.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSubjectIndex < data.length - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSubjectIndex > 0) {
      setCurrentSubjectIndex(currentSubjectIndex - 1);
      setCurrentQuestionIndex(data[currentSubjectIndex - 1].questions.length - 1);
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

  const handleReviewClick = () => {
    console.log('Review clicked');
  };

  const currentSubject = data ? data[currentSubjectIndex] : null;
  const currentQuestion = currentSubject ? currentSubject.questions[currentQuestionIndex] : null;

  return (
    <MathJaxContext>
      {currentSubject && (
        <>
          <Info 
            subject_name={currentSubject.subject_name}
            noq={currentSubject.noq}
            wtg={currentSubject.wtg}
            time_allocated={currentSubject.time_allocated}
            isNegativeMarking={currentSubject.isNegativeMarking}
          />

          {currentQuestion && (
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
          )}
        </>
      )}
    </MathJaxContext>
  );
};

export default DataDisplayComponent;
