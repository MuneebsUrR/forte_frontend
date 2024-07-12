import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"; 
import Footer from "./components/Footer";
import Home from "./container/Home";
import Login from "./container/Login";
import Picture from "./container/Picture";
import Instructions from "./container/Instructions";
import Welcome from "./container/Welcome";


const App = () => {
  const [theme, setTheme] = useState("light");

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
        </Routes>
        <Footer/>
      
    </ThemeProvider>
  );
};

export default App;
