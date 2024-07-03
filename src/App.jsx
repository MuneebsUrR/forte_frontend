import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './container/Login';
import Navbar from './container/Navbar';
import Footer from './container/Footer';
import Home from './container/Home';
import Instructions from './container/Instructions'
import Welcome from './container/Welcome'
const App = () => {
  // Use the useLocation hook to get the current location
  const location = useLocation();

  // Conditionally render Navbar and Footer based on the path
  const shouldRenderNavAndFooter = !['/', '/instructions','/login'].includes(location.pathname);

  return (
    <>
      {shouldRenderNavAndFooter && <Navbar />}
      
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/instructions" element={<Instructions />} />
        <Route exact path="/" element={<Welcome />} />
      </Routes>
      
      {shouldRenderNavAndFooter && <Footer />}
    </>
  );
};

export default App;