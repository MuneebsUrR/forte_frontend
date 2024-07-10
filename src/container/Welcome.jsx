import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Basic instruction here.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
        Continue
      </Button>
    </Container>
  );
};

export default Welcome;
