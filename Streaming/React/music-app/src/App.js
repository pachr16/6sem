import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './App.css';
import FancyNavbar from './navbar/FancyNavbar.js'

import Homepage from './homepage/Homepage.js';


function App() {


  return (
    <div className="App">
      <Router>
        {/* header here */}
        <FancyNavbar />

        {/* body below here */}
        <Homepage />

        {/* footer below here */}

      </Router>
    </div>
  );
}

export default App;
