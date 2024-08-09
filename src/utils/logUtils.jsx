import Cookies from 'universal-cookie';

let userLogs = [];
let logTimeout;

export const logQuestionDetails = async (candidateId, sqpId, qpId, startTime, currentSubjectIndex, currentQuestionIndex, selectedOptions, isAttempted, data) => {
  const currentSubject = data[currentSubjectIndex];
  const currentQuestion = currentSubject?.questions[currentQuestionIndex];
  const timeSpent = Date.now() - startTime;

  if (currentQuestion) {
    const lastViewTime = new Date(startTime).toISOString(); // Ensure ISO 8601 format
    const elapsedTime = new Date(startTime + timeSpent).toISOString(); // Ensure ISO 8601 format

    // Ensure SELECTED_ANSWER is an integer
    const selectedAnswer = parseInt(selectedOptions[currentQuestionIndex], 10);
    
    const logEntry = {
      CANDIDATE_ID: candidateId, // Number
      SQP_ID: sqpId, // Number
      QP_ID: qpId, // Number
      QUESTION_ID: currentQuestion.QUESTION_ID, // Number
      SELECTED_ANSWER: isNaN(selectedAnswer) ? -1 : selectedAnswer, // Ensure integer or fallback to -1
      LAST_VIEW_TIME: lastViewTime, // ISO 8601 String
      ELAPSED_TIME: elapsedTime, // ISO 8601 String
      IS_ATTEMPED: isAttempted // Number (0 for skip, 1 for complete, 2 for review)
    };

    userLogs.push(logEntry);

    // Clear any existing timeout to reset the timer
    if (logTimeout) {
      clearTimeout(logTimeout);
    }

    // Set a new timeout to check for inactivity
    logTimeout = setTimeout(async () => {
      if (userLogs.length > 0) {
        // Create the list object
        const listObject = {
          list: userLogs
        };

        try {
          // Get the API URL and token
          const apiUrl = `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}/paper/saveprogress`;
          const cookies = new Cookies();
          const token = cookies.get('token');

          // Send the POST request
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': token
            },
            body: JSON.stringify(listObject)
          });

          // Handle the response
          const result = await response.json();
          console.log('Backend response:', result);

          if (result.message === 'Progress saved successfully') {
            console.log('Progress saved successfully');
          } else {
            console.error('Error saving progress:', result.message);
          }
        } catch (error) {
          console.error('Failed to save progress:', error);
        } finally {
          // Reset the logs after sending
          userLogs = [];
        }
      } else {
        // Log no activity recorded message
        console.log('No activity recorded');
      }
      // Clear the timeout reference
      logTimeout = null;
    }, 6000); // 1 minute
  }
};
