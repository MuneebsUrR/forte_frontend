// utils/logUtils.js
export const logQuestionDetails = (candidateId, sqpId, qpId, startTime, currentSubjectIndex, currentQuestionIndex, selectedOptions, data) => {
    const currentSubject = data[currentSubjectIndex];
    const currentQuestion = currentSubject?.questions[currentQuestionIndex];
    const timeSpent = Date.now() - startTime;
  
    if (currentQuestion) {
      console.log('candidateId:', candidateId);
      console.log('sqpId:', sqpId);
      console.log('qpId:', qpId);
      console.log('IS_ATTEMPED:', selectedOptions[currentQuestionIndex] === '' ? 0 : 1);
      console.log('QUESTION_ID:', currentQuestion.QUESTION_ID);
      console.log('SELECTED_ANSWER:', selectedOptions[currentQuestionIndex] || '-1');
      console.log('LAST_VIEW_TIME:', new Date(startTime).toLocaleTimeString());
      console.log('ELAPSED_TIME:', timeSpent / 1000, 'seconds');
      console.log('===========================================');
    }
  };
  