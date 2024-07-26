import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const DataDisplayComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data && data.map((subject, subjectIndex) => (
        <div key={subjectIndex}>
          <h2>Subject Name: {subject.subject_name}</h2>
          <p>Number of Questions: {subject.noq}</p>
          <p>Weightage: {subject.wtg}</p>
          <p>Time Allocated: {subject.time_allocated}</p>
          <p>Negative Marking: {subject.isNegativeMarking}</p>
          
          {subject.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <h3>Question ID: {questionIndex + 1} - {question.QUESTION_TEXT}</h3>
              <ul>
                {question.answer_choices.map((choice, choiceIndex) => (
                  <li key={choiceIndex}>
                    Choice ID: {choice.ANS_CHOICE_ID} - {choice.ANS_CHOICE_TEXT}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DataDisplayComponent;
