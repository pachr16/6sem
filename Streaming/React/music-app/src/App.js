import React from 'react';
import { AuthorizationProvider } from './homepage/login/AuthorizationContext';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import FancyNavbar from './navbar/FancyNavbar.js';
import Homepage from './homepage/Homepage.js';
import { StreamingInfoProvider } from './player/StreamingContext';


function App() {
  return (
    <AuthorizationProvider>
      <StreamingInfoProvider>
        <div className="App">
          <Router>
            {/* header here */}
            <h1 className="thisIsFormattingForTheMainTitleOfTheGenericUnnamedStreamingServiceThatWeHaventMadeYet">
             
            </h1>
            <FancyNavbar />

            {/* body below here */}
            <Homepage />

            {/* footer below here */}

          </Router>
        </div>
      </StreamingInfoProvider>
    </AuthorizationProvider>
  );
}

export default App;
