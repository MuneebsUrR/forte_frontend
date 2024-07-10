import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/fast.png';

const Logo = () => (
  <Box className="flex justify-center mb-4">
    <img src={logo} alt="Logo" className="h-20 w-20" />
  </Box>
);

const Header = () => (
  <Typography variant="h5" gutterBottom align="center" color="textPrimary">
    Welcome to Fast Nuces
  </Typography>
);

const LoginForm = ({ candidateId, setCandidateId, password, setPassword, handleLogin }) => {
  const theme = useTheme();

  return (
    <>
      <TextField
        label="Candidate Id"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{ style: { color: theme.palette.text.primary } }}
        InputProps={{
          style: { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary },
        }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{ style: { color: theme.palette.text.primary } }}
        InputProps={{
          style: { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        className="w-full mt-2"
      >
        Login
      </Button>
    </>
  );
};

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [candidateId, setCandidateId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add login logic here
    navigate('/picture');
  };

  return (
    <Box 
      className="flex items-center justify-center h-screen" 
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Container 
        className="p-4 rounded-lg shadow-md" 
        style={{ backgroundColor: theme.palette.background.paper, maxWidth: '400px', padding: '2rem' }}
      >
        <Logo />
        <Header />
        <LoginForm 
          candidateId={candidateId} 
          setCandidateId={setCandidateId} 
          password={password} 
          setPassword={setPassword} 
          handleLogin={handleLogin} 
        />
      </Container>
    </Box>
  );
};

export default Login;
