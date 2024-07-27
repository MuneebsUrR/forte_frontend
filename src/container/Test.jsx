import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import usePaperStore from '../Hooks/paperstore';

const DataDisplayComponent = () => {
  const { setData, setLoading, setError, getData, getLoading, getError } = usePaperStore();
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  if (getLoading()) return <p>Loading...</p>;
  if (getError()) return <p>Error: {getError()}</p>;

  const handleNext = () => {
    const data = getData();
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
      const data = getData();
      setCurrentSubjectIndex(currentSubjectIndex - 1);
      setCurrentQuestionIndex(data[currentSubjectIndex - 1].questions.length - 1);
    }
  };

  const data = getData();
  const currentSubject = data ? data[currentSubjectIndex] : null;
  const currentQuestion = currentSubject ? currentSubject.questions[currentQuestionIndex] : null;

  return (
    <div>
      {currentSubject && (
        <>
          <h2>Subject Name: {currentSubject.subject_name}</h2>
          <p>Number of Questions: {currentSubject.noq}</p>
          <p>Weightage: {currentSubject.wtg}</p>
          <p>Time Allocated: {currentSubject.time_allocated}</p>
          <p>Negative Marking: {currentSubject.isNegativeMarking ? 'Yes' : 'No'}</p>

          {currentQuestion && (
            <div>
              <h3>Question {currentQuestionIndex + 1}: {currentQuestion.QUESTION_TEXT}</h3>
              <ul>
                {currentQuestion.answer_choices.map((choice, index) => (
                  <li key={index}>{choice.ANS_CHOICE_TEXT}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <button onClick={handleBack} disabled={currentSubjectIndex === 0 && currentQuestionIndex === 0}>Back</button>
            <button onClick={handleNext} disabled={currentSubjectIndex === data.length - 1 && currentQuestionIndex === currentSubject.questions.length - 1}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DataDisplayComponent;
