import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import FancyNavbar from './navbar/FancyNavbar.js';
import Homepage from './homepage/Homepage.js';
import { StreamingInfoProvider } from './player/StreamingContext';


function App() {

  const [isPlaying, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('beyonce');

  return (
    <StreamingInfoProvider>
      <div className="App">
        <Router>
          {/* header here */}
          <h1 className="thisIsFormattingForTheMainTitleOfTheGenericUnnamedStreamingServiceThatWeHaventMadeYet">
            Generic Unnamed Streaming Service
        </h1>
          <FancyNavbar currentSong={currentSong} isPlaying={isPlaying} setPlaying={setPlaying} />

          {/* body below here */}
          <Homepage />

          {/* footer below here */}

        </Router>
      </div>
    </StreamingInfoProvider>
  );
}

export default App;
