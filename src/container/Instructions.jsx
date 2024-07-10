import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';

const Header = () => (
  <Box textAlign="center" my={8}>
    <Typography variant="h4" component="h1">Welcome to FAST NUCES Admission Test</Typography>
  </Box>
);

const CandidateInfo = () => (
  <Box my={4}>
    <Typography variant="h6">Candidate Information:</Typography>
    <Typography>Candidate ID:</Typography>
    <Typography>Test Center:</Typography>
    <Typography>Test Session:</Typography>
    <Typography>Programme:</Typography>
  </Box>
);

const GeneralInstructions = () => (
  <Box my={4}>
    <Typography variant="h6">GENERAL INSTRUCTIONS:</Typography>
    <Box component="ul" pl={5} className="list-disc">
      <Typography component="li">Calculators, Papers, Cellular Phones and CDs are not allowed in the test area.</Typography>
      <Typography component="li">Do not share your Verification Slip (with your test ID and password) to any other candidate, anyone found doing so will be disqualified from the test.</Typography>
      <Typography component="li">After logging in once your login name and password, and the system has logged you in the test, you are only allowed to attempt the test once.</Typography>
      <Typography component="li">If you try to log in later, a warning message will be displayed on your screen. If this message appears on your screen more than once you can be disqualified from the admission test.</Typography>
      <Typography component="li">Anyone found with more than one login session for the Admission Test will be disqualified from the test and removed from the list of candidates for admission.</Typography>
      <Typography component="li">During the admission test, use of unfair means or communication with any other candidate in any form will lead to disqualification and removal from the list of candidates for admission.</Typography>
      <Typography component="li">Write your rough work done on the Rough Sheet attached with your Verification Slip.</Typography>
      <Typography component="li">If you need any help, click on the help button to indicate that you have read and understood the instructions above.</Typography>
      <Typography component="li">Whenever you are ready, click on the Start Test button below.</Typography>
      <Typography component="li">The remaining time left on your screen is the Time Left for that particular section only.</Typography>
      <Typography component="li">Along with showing Total Questions, displayed on your screen, is the number of questions in that particular section.</Typography>
    </Box>
  </Box>
);

const TestSummary = () => (
  <TableContainer component={Paper} my={4}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Section</TableCell>
          <TableCell>Time Allocated (in Minutes)</TableCell>
          <TableCell>No. Of Questions</TableCell>
          <TableCell>Weightage %</TableCell>
          <TableCell>Negative Marking</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Mathematics</TableCell>
          <TableCell>5</TableCell>
          <TableCell>5</TableCell>
          <TableCell>25</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>IQ and Analytical</TableCell>
          <TableCell>5</TableCell>
          <TableCell>5</TableCell>
          <TableCell>25</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Science</TableCell>
          <TableCell>5</TableCell>
          <TableCell>5</TableCell>
          <TableCell>25</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>English</TableCell>
          <TableCell>5</TableCell>
          <TableCell>5</TableCell>
          <TableCell>25</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

const Instructions = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleStartTest = () => {
    navigate('/home');
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{
        p: 8,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: isDarkMode ? 'background.default' : 'background.paper',
        color: isDarkMode ? 'text.primary' : 'text.secondary',
      }}
    >
      <CandidateInfo />
      <Header />
      <GeneralInstructions />
      <TestSummary />
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleCheckboxChange} name="checkedA" />}
        label="I have carefully read the instructions and I agree to follow them"
        sx={{ color: isDarkMode ? 'text.primary' : 'text.secondary' }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleStartTest} 
        disabled={!checked}
      >
        Start Test
      </Button>
    </Container>
  );
};

export default Instructions;
