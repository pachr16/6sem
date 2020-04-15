import React, { useState, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Login from './login/Login.js';
import CreateNewUser from './login/CreateNewUser.js';
import SingleSong from './homepage/SingleSong.js';


function App() {

  const [songs, setSongs] = useState([
    {
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    },
    {
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    },
    {
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    },
    {
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    }
  ]);

  return (
    <div className="App">
      <h1 className="thisIsFormattingForTheMainTitleOfTheGenericUnnamedStreamingServiceThatWeHaventMadeYet">
        Generic Unnamed Streaming Service
        </h1>

      <Router>
        <div>
          <Switch>
            <Route exact path="/createNewUser">
              <CreateNewUser />
            </Route>
            <Route exact path="/homepage">
              {songs.map(song => (
                <SingleSong art={song.art} artist={song.artist} song={song.song} album={song.album} duration={song.duration}/>
              ))}
            </Route>
            <Route exact path="/">    {/** checks from top to bottom; if we dont use exact path, this one will be shown in cases of 404 - and if it was first, we could never reach any other paths */}
              <Login />
            </Route>

            {/* add routes to new components here */}

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
