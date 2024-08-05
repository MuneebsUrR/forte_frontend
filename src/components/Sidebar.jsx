import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { grey, blue } from '@mui/material/colors';

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
        }} // Add horizontal scrolling if needed
      >
        <Typography variant="h6" sx={{ marginRight: 2 }}>
         
        </Typography>
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
              sx={{ bgcolor: theme.palette.warning.main }}
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
          maxHeight: '70vh', // Adjust this value to control the height of the scrollable area
        }}
      >
        {Array.from({ length: totalQuestions }).map((_, index) => {
          let bgColor = grey[300]; // Default color

          if (index === currentQuestionIndex) {
            bgColor = blue[500]; // Blue color for the current question
          } else {
            switch (questionStatuses[index]) {
              case 'completed':
                bgColor = theme.palette.success.main; // Use theme's success color
                break;
              case 'skipped':
                bgColor = theme.palette.error.main; // Use theme's error color
                break;
              case 'reviewed':
                bgColor = theme.palette.warning.main; // Use theme's warning color
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
              sx={{ bgcolor: bgColor, color: theme.palette.getContrastText(bgColor) }} // Use theme's text color contrast
              onClick={() => onJumpToQuestion(index)}
              size="small" // Adjust button size for better spacing
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
