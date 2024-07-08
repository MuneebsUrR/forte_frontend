import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './container/Login';
import Navbar from './container/Navbar';
import Footer from './container/Footer';
import Home from './container/Home';
import Instructions from './container/Instructions'
import Welcome from './container/Welcome'
import ToggleColorMode from './container/ToggleColorMode';
import { ThemeProviderCustom } from './Context/Theme';

const App = () => {
  const location = useLocation();
  const shouldRenderNavAndFooter = !['/', '/instructions', '/login'].includes(location.pathname);

  return (
    <ThemeProviderCustom>
      {shouldRenderNavAndFooter && <Navbar />}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/instructions" element={<Instructions />} />
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/dark" element={<ToggleColorMode />} />
      </Routes>
      {shouldRenderNavAndFooter && <Footer />}
    </ThemeProviderCustom>
  );
};

export default App;