import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { MathJaxContext } from "better-react-mathjax";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <MathJaxContext>
      <App />
      </MathJaxContext>
    </Router>
  
  </React.StrictMode>
);
