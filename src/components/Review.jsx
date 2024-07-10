import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const Review = ({
  totalQuestions,
  questionStatus,
  questionIndex,
  completedQuestions,
  skippedQuestions,
  reviewedQuestions,
  setQuestionIndex
}) => {
  return (
    <Box className='flex-[1] w-full h-[100%] overflow-auto'>
      <Typography variant="h5" className='ml-4'>Review Questions</Typography>
      <Box className='flex flex-col p-4'>
        <Typography variant="h6">Total</Typography>
        <Box className='flex flex-wrap gap-2 mb-4'>
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <Button
              key={index}
              variant="contained"
              color={questionIndex === index ? 'primary' :
                      questionStatus[index] === 'completed' ? 'success' :
                      questionStatus[index] === 'skipped' ? 'error' :
                      questionStatus[index] === 'reviewed' ? 'warning' : 'default'}
              onClick={() => setQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </Box>
        <Typography variant="h6">Completed</Typography>
        <Box className='flex flex-wrap gap-2 mb-4'>
          {completedQuestions.length ? completedQuestions.map(index => (
            <Button
              key={index}
              variant="contained"
              color="success"
              onClick={() => setQuestionIndex(Number(index))}
            >
              {Number(index) + 1}
            </Button>
          )) : null}
        </Box>
        <Typography variant="h6">Skipped</Typography>
        <Box className='flex flex-wrap gap-2 mb-4'>
          {skippedQuestions.length ? skippedQuestions.map(index => (
            <Button
              key={index}
              variant="contained"
              color="error"
              onClick={() => setQuestionIndex(Number(index))}
            >
              {Number(index) + 1}
            </Button>
          )) : null}
        </Box>
        <Typography variant="h6">Reviewed</Typography>
        <Box className='flex flex-wrap gap-2 mb-4'>
          {reviewedQuestions.length ? reviewedQuestions.map(index => (
            <Button
              key={index}
              variant="contained"
              color="warning"
              onClick={() => setQuestionIndex(Number(index))}
            >
              {Number(index) + 1}
            </Button>
          )) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
