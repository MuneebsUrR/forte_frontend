import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { grey, blue, yellow } from '@mui/material/colors';

const Sidebar = ({ questionStatuses, totalQuestions, currentQuestionIndex, onJumpToQuestion }) => {
  const theme = useTheme();

  return (
    <Box 
      className="p-4 flex flex-col text-sm space-y-4" 
      sx={{ 
        bgcolor: theme.palette.background.default, 
        color: theme.palette.text.primary, 
        border: `1px solid ${theme.palette.divider}`, 
      }}
    >
      <Box 
        className="mb-4"
        sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`, 
          pb: 2, 
          display: 'flex', 
          alignItems: 'center', 
          overflowX: 'auto' 
        }}
      >
        
        <Box className="flex items-center space-x-2">
          <Box className="flex items-center">
            <Box 
              className="w-3 h-3 mr-1"
              sx={{ bgcolor: theme.palette.success.main }}
            />
            <Typography variant="body2">Completed</Typography>
          </Box>
          <Box className="flex items-center">
            <Box 
              className="w-3 h-3 mr-1"
              sx={{ bgcolor: theme.palette.error.main }}
            />
            <Typography variant="body2">Skipped</Typography>
          </Box>
          <Box className="flex items-center">
            <Box 
              className="w-3 h-3 mr-1"
              sx={{ bgcolor: yellow[700] }} // Off-yellow color for reviewed questions
            />
            <Typography variant="body2">Reviewed</Typography>
          </Box>
          <Box className="flex items-center">
            <Box 
              className="w-3 h-3 mr-1"
              sx={{ bgcolor: blue[500] }}
            />
            <Typography variant="body2">Current Question</Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
        Questions Detail:
      </Typography>
      <Box 
        className="grid grid-cols-5 gap-2 p-2 overflow-y-auto" 
        sx={{ 
          maxHeight: '70vh',
        }}
      >
        {Array.from({ length: totalQuestions }).map((_, index) => {
          let bgColor = grey[300]; // Default color

          if (index === currentQuestionIndex) {
            bgColor = blue[500]; // Blue color for the current question
          } else {
            switch (questionStatuses[index]) {
              case 'completed':
                bgColor = theme.palette.success.main;
                break;
              case 'skipped':
                bgColor = theme.palette.error.main;
                break;
              case 'reviewed':
                bgColor = yellow[700]; // Off-yellow color for reviewed questions
                break;
              default:
                bgColor = grey[300];
                break;
            }
          }

          return (
            <Button
              key={index}
              variant="contained"
              sx={{ bgcolor: bgColor, color: theme.palette.getContrastText(bgColor) }}
              onClick={() => onJumpToQuestion(index)}
              size="small"
            >
              {index + 1}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
