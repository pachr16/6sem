import React from 'react';
import './App.css';
import FancyNavbar from './navbar/FancyNavbar.js'

import Homepage from './homepage/Homepage.js';


function App() {


  return (
    <div className="App">
      {/* header here */}
<FancyNavbar />
      {/* body below here */}
      <Homepage />

      {/* footer below here */}


    </div>
  );
}

export default App;
