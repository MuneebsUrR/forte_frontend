import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from "./components/Header"; 
import Footer from "./components/Footer";
import Home from "./container/Home";
import Login from "./container/Login";
import Picture from "./container/Picture";
import Instructions from "./container/Instructions";
import Welcome from "./container/Welcome";
import Result from "./container/Result";
import { Snackbar, Alert } from '@mui/material';
import useFullscreen from './Hooks/useFullscreen'; 
import Test from './container/Test';

const App = () => {
  const [theme, setTheme] = useState("light");
  const [showWarning, setShowWarning] = useState(false);

  const isFullscreen = useFullscreen();

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // Store the results here per each subject
  const results = [
    { name: 'Math', correct: 8, incorrect: 2 },
    { name: 'Science', correct: 7, incorrect: 3 },
    { name: 'History', correct: 5, incorrect: 5 },
  ];

  const location = useLocation();

  useEffect(() => {
    const enterFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    };

    const exitFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    };

    if (location.pathname === '/home') {
      if (!isFullscreen) {
        enterFullscreen();
      }

      const handleKeyPress = (event) => {
        event.preventDefault();
        setShowWarning(true);
      };
      window.addEventListener('keydown', handleKeyPress);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    } else if (isFullscreen) {
      exitFullscreen();
    }
  }, [location.pathname, isFullscreen]);

  const handleWarningClose = () => {
    setShowWarning(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header theme={theme} changeTheme={changeTheme} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/picture" element={<Picture />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<Result results={results} />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer />
      <Snackbar open={showWarning} autoHideDuration={3000} onClose={handleWarningClose}>
        <Alert onClose={handleWarningClose} severity="warning" sx={{ width: '100%' }}>
          Using Keyboard is not allowed
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
