import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';
import usePaperStore from '../Hooks/paperstore';
import Cookies from 'universal-cookie';

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

const TestSummary = () => {
  const { data } = usePaperStore();

  if (!data || data.length === 0) {
    return <Typography>No data available</Typography>;
  }

  return (
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
          {data.map((item) => (
            <TableRow key={item.sa_id}>
              <TableCell>{item.subject_name}</TableCell>
              <TableCell>{item.time_allocated}</TableCell>
              <TableCell>{item.noq}</TableCell>
              <TableCell>{item.wtg}</TableCell>
              <TableCell>{item.isNegativeMarking ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Instructions = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { setData, setLoading, setError } = usePaperStore();
 

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
          console.log('Paper Data:', result.data);
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

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleStartTest = () => {
    navigate('/home');
  };

  return (
    <Container className='px-4'
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
