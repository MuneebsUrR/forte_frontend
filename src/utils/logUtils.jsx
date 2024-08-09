let userLogs = [];
let logTimeout;

export const logQuestionDetails = (candidateId, sqpId, qpId, startTime, currentSubjectIndex, currentQuestionIndex, selectedOptions, isAttempted, data) => {
  const currentSubject = data[currentSubjectIndex];
  const currentQuestion = currentSubject?.questions[currentQuestionIndex];
  const timeSpent = Date.now() - startTime;

  if (currentQuestion) {
    const lastViewTime = new Date(startTime).toISOString();
    const elapsedTime = new Date(startTime + timeSpent).toISOString();

    const logEntry = {
      candidateId,
      sqpId,
      qpId,
      isAttempted,
      questionId: currentQuestion.QUESTION_ID,
      selectedAnswer: selectedOptions[currentQuestionIndex] || '-1',
      lastViewTime,
      elapsedTime
    };

    userLogs.push(logEntry);

    if (!logTimeout) {
      logTimeout = setTimeout(() => {
        if (userLogs.length > 0) {
          userLogs.forEach(log => {
            console.log('===========================================');
            console.log('candidateId:', log.candidateId);
            console.log('sqpId:', log.sqpId);
            console.log('qpId:', log.qpId);
            console.log('IS_ATTEMPTED:', log.isAttempted);
            console.log('QUESTION_ID:', log.questionId);
            console.log('SELECTED_ANSWER:', log.selectedAnswer);
            console.log('LAST_VIEW_TIME:', log.lastViewTime);
            console.log('ELAPSED_TIME:', log.elapsedTime);
          });
          console.log('===========================================');
          // Reset the logs after displaying
          userLogs = [];
        }
        logTimeout = null;
      }, 60000); // 1 minute
    }
  }
};

