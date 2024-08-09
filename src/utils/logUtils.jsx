export const logQuestionDetails = (candidateId, sqpId, qpId, startTime, currentSubjectIndex, currentQuestionIndex, selectedOptions, isAttempted, data) => {
  const currentSubject = data[currentSubjectIndex];
  const currentQuestion = currentSubject?.questions[currentQuestionIndex];
  const timeSpent = Date.now() - startTime;

  if (currentQuestion) {
      const lastViewTime = new Date(startTime).toISOString();
      const elapsedTime = new Date(startTime + timeSpent).toISOString();

      console.log('candidateId:', candidateId);
      console.log('sqpId:', sqpId);
      console.log('qpId:', qpId);
      console.log('IS_ATTEMPTED:', isAttempted);
      console.log('QUESTION_ID:', currentQuestion.QUESTION_ID);
      console.log('SELECTED_ANSWER:', selectedOptions[currentQuestionIndex] || '-1');
      console.log('LAST_VIEW_TIME:', lastViewTime);
      console.log('ELAPSED_TIME:', elapsedTime);
      console.log('===========================================');
  }
};
