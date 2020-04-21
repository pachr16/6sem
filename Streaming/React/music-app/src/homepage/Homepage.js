import React, { useState, useContext } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthorizationContext } from './login/AuthorizationContext';
import Login from './login/Login.js';
import CreateNewUser from './login/CreateNewUser.js';
import SingleSong from './browser/SingleSong.js';
import Help from './misc/Help.js';
import About from './misc/About.js';




function Homepage() {

  const [loggedID, setLoggedID] = useContext(AuthorizationContext);

  const [songs, setSongs] = useState([
    {
      song_id: 1,
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    },
    {
      song_id: 2,
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    }
  ]);

  const songsid = () => {
    fetch('http://localhost:2000/getMetaData').then(
      (response) => {
        if (response.ok) {
          setSongs(response.json());
          console.log(songs);
        } else {
          console.log(response.status);
        }
      }
    );
  }

  const songcards = songs.map(song => <SingleSong key={song.song_id} data={song} />)

  function requireAuth(destination) {
    if (loggedID == -1) {
      return <Login />
    }
    return destination;
  }


  return (
    <div>
      <Switch>
        <Route exact path="/createNewUser">
          <CreateNewUser />
        </Route>

        <Route exact path="/browse" >
          {requireAuth(songcards)}
        </Route>

        <Route exact path="/login">    {/** checks from top to bottom; if we dont use exact path, this one will be shown in cases of 404 - and if it was first, we could never reach any other paths */}
          <Login />
        </Route>

        <Route exact path="/help">
          {requireAuth(<Help />)}
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/">
          <Login />
        </Route>

        {/* add routes to new components here */}

      </Switch>
    </div>
  );
}
export default Homepage;